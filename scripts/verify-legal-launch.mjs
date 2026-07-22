#!/usr/bin/env node
/**
 * Release gate legal de LICITATIS.
 *
 *   node scripts/verify-legal-launch.mjs [--mode dev|production]
 *
 * Modo "dev" (por defecto): pensado para CI en cualquier rama. Informa de placeholders y
 * de HubSpot sin configurar como AVISO (no bloquea), pero SÍ falla ante defectos técnicos
 * (dominio canónico incorrecto, claims prohibidos, páginas legales ausentes, páginas con
 * placeholders en el sitemap).
 *
 * Modo "production": pensado para el workflow de despliegue. Bloquea (exit != 0) si el
 * artefacto que se serviría contiene placeholders legales, si HubSpot no está configurado
 * (se perderían leads), o si el dominio canónico no es el definitivo.
 *
 * Resultado impreso: PASS | FAIL | BLOCKED_LEGAL_REVIEW | BLOCKED_PRODUCT_CONFIRMATION |
 * BLOCKED_PROVIDER_CONFIRMATION. Sale con código != 0 cuando el lanzamiento no es seguro.
 */

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CANONICAL_DOMAIN,
  REQUIRED_LEGAL_ROUTES,
  NOINDEX_WHILE_PLACEHOLDER,
  PLACEHOLDER_PATTERNS,
  PROHIBITED_CLAIM_PATTERNS,
  scanText,
  isCanonicalUrlOk,
} from "./legal-launch-rules.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const mode = process.argv.includes("--mode")
  ? process.argv[process.argv.indexOf("--mode") + 1]
  : "dev";
const PROD = mode === "production";
// --deploy: despliegue controlado (posible beta con páginas legales noindex). Los
// placeholders legales y HubSpot sin configurar pasan a AVISO (no bloquean el deploy),
// porque las páginas legales llevan noindex y el formulario degrada a correo sin perder
// leads. Los demás bloqueantes (dominio, claims, páginas ausentes, sitemap) se mantienen.
const DEPLOY = process.argv.includes("--deploy");

/** Recolecta rutas de ficheros con una extensión dada bajo `dir` (recursivo). */
function walk(dir, exts, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".git") continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, exts, acc);
    else if (exts.some((e) => entry.endsWith(e))) acc.push(full);
  }
  return acc;
}

const problems = []; // {level: 'block'|'warn', code, msg}
const block = (code, msg) => problems.push({ level: "block", code, msg });
const warn = (code, msg) => problems.push({ level: "warn", code, msg });
const rel = (f) => f.replace(ROOT + "\\", "").replace(ROOT + "/", "").replace(/\\/g, "/");

const OUT = join(ROOT, "out");
const hasBuild = existsSync(OUT);

// ---------------------------------------------------------------- 1) Placeholders
// Se escanea el HTML SERVIDO (out/), que es lo que ve el público (sin comentarios de código).
if (hasBuild) {
  for (const file of walk(OUT, [".html"])) {
    const hits = scanText(readFileSync(file, "utf8"), PLACEHOLDER_PATTERNS);
    if (hits.length) {
      const msg = `${rel(file)} contiene placeholders legales: ${[...new Set(hits)].join(", ")}`;
      if (PROD) block("PLACEHOLDER_EN_HTML", msg);
      else warn("PLACEHOLDER_EN_HTML", msg);
    }
  }
} else if (PROD) {
  block("SIN_BUILD", "No existe out/. Ejecuta `npm run build` antes del gate de producción.");
} else {
  warn("SIN_BUILD", "No existe out/: no se puede verificar el HTML servido (ejecuta build).");
}

// ---------------------------------------------------------------- 2) Claims prohibidos
// Se escanea el contenido fuente (copy) y, si existe, el HTML servido.
const contentFiles = [
  ...walk(join(ROOT, "src", "lib"), [".ts"]),
  ...walk(join(ROOT, "src", "components", "sections"), [".tsx"]),
  ...walk(join(ROOT, "src", "app"), [".tsx"]),
].filter((f) => !/\.(test|spec)\.[tj]sx?$/.test(f)); // los tests contienen ejemplos a propósito
for (const file of contentFiles) {
  const hits = scanText(readFileSync(file, "utf8"), PROHIBITED_CLAIM_PATTERNS);
  if (hits.length) block("CLAIM_PROHIBIDO", `${rel(file)}: ${[...new Set(hits)].join(", ")}`);
}

// ---------------------------------------------------------------- 3) Dominio canónico
const siteTs = readFileSync(join(ROOT, "src", "lib", "site.ts"), "utf8");
const defaultUrlMatch = siteTs.match(/NEXT_PUBLIC_SITE_URL\s*\|\|\s*"([^"]+)"/);
if (!defaultUrlMatch || !isCanonicalUrlOk(defaultUrlMatch[1])) {
  block(
    "DOMINIO_CANONICO",
    `El valor por defecto de NEXT_PUBLIC_SITE_URL en src/lib/site.ts debe ser ${CANONICAL_DOMAIN} (encontrado: ${defaultUrlMatch ? defaultUrlMatch[1] : "no encontrado"}).`,
  );
}
if (PROD) {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!envUrl) block("DOMINIO_CANONICO", "NEXT_PUBLIC_SITE_URL no está definido en el entorno de producción.");
  else if (!isCanonicalUrlOk(envUrl)) block("DOMINIO_CANONICO", `NEXT_PUBLIC_SITE_URL="${envUrl}" no es el dominio canónico ${CANONICAL_DOMAIN}.`);
}

// ---------------------------------------------------------------- 4) HubSpot (pérdida de leads)
const portal = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
const formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;
if (!portal || !formId) {
  const msg = "HubSpot no está configurado (NEXT_PUBLIC_HUBSPOT_PORTAL_ID / _FORM_ID). El formulario mostrará un canal de correo alternativo, no un falso éxito.";
  if (PROD) block("HUBSPOT_NO_CONFIGURADO", msg);
  else warn("HUBSPOT_NO_CONFIGURADO", msg);
}

// ---------------------------------------------------------------- 5) Páginas legales presentes
for (const route of REQUIRED_LEGAL_ROUTES) {
  const srcPage = join(ROOT, "src", "app", route, "page.tsx");
  const builtPage = join(OUT, route, "index.html");
  const present = existsSync(srcPage) || existsSync(builtPage);
  if (!present) block("PAGINA_LEGAL_AUSENTE", `Falta la página legal obligatoria: /${route}`);
}

// ---------------------------------------------------------------- 6) Sitemap sin páginas noindex
// Fuente autoritativa: src/app/sitemap.ts (lo que se generará). El sitemap.xml de out/ solo
// se comprueba en producción, donde el build es fresco (en dev podría estar obsoleto).
const sitemapSource = join(ROOT, "src", "app", "sitemap.ts");
if (existsSync(sitemapSource)) {
  const text = readFileSync(sitemapSource, "utf8");
  for (const route of NOINDEX_WHILE_PLACEHOLDER) {
    if (new RegExp(`\\\`\\$\\{base\\}/${route}\``).test(text)) {
      block("SITEMAP_NOINDEX", `src/app/sitemap.ts incluye /${route}, que es noindex mientras tenga placeholders.`);
    }
  }
}
if (PROD && existsSync(join(OUT, "sitemap.xml"))) {
  const text = readFileSync(join(OUT, "sitemap.xml"), "utf8");
  for (const route of NOINDEX_WHILE_PLACEHOLDER) {
    if (new RegExp(`/${route}([/"<])`).test(text)) {
      block("SITEMAP_NOINDEX", `out/sitemap.xml incluye /${route}, que es noindex mientras tenga placeholders.`);
    }
  }
}

// ---------------------------------------------------------------- Veredicto
// En despliegue controlado (--deploy), placeholders y HubSpot no bloquean (ver arriba).
if (DEPLOY) {
  for (const p of problems) {
    if (p.level === "block" && (p.code === "PLACEHOLDER_EN_HTML" || p.code === "HUBSPOT_NO_CONFIGURADO")) {
      p.level = "warn";
    }
  }
}
const blockers = problems.filter((p) => p.level === "block");
const warnings = problems.filter((p) => p.level === "warn");

console.log(`\nLICITATIS — release gate legal (modo: ${mode})\n${"=".repeat(48)}`);
for (const p of blockers) console.log(`  ✖ [${p.code}] ${p.msg}`);
for (const p of warnings) console.log(`  ⚠ [${p.code}] ${p.msg}`);
if (!problems.length) console.log("  ✓ Sin incidencias.");

// Estado global.
let result = "PASS";
if (blockers.some((b) => b.code === "PLACEHOLDER_EN_HTML")) result = "BLOCKED_LEGAL_REVIEW";
else if (blockers.some((b) => b.code === "HUBSPOT_NO_CONFIGURADO")) result = "BLOCKED_PROVIDER_CONFIRMATION";
else if (blockers.length) result = "FAIL";

console.log(`${"=".repeat(48)}\nResultado: ${result}  (${blockers.length} bloqueantes, ${warnings.length} avisos)\n`);
process.exit(blockers.length ? 1 : 0);
