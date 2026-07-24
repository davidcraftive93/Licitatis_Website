/** Preferencia de tema del usuario. "system" sigue al sistema operativo. */
export type ThemePreference = "system" | "light" | "dark";

export const THEME_STORAGE_KEY = "licitatis_theme";

/** Colores de la barra del navegador por tema (deben coincidir con --surface). */
export const THEME_COLORS = { light: "#FBFAF9", dark: "#0B1220" } as const;

/**
 * Script que se ejecuta ANTES del primer paint para aplicar la clase .dark y evitar
 * el parpadeo blanco al cargar en modo oscuro. Se inyecta en <head> desde el layout.
 * Se mantiene minificado a mano (va inline en el HTML de todas las páginas).
 */
export const THEME_INIT_SCRIPT = `(function(){try{var k='${THEME_STORAGE_KEY}';var p=localStorage.getItem(k);var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=p==='dark'||((!p||p==='system')&&m);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';var t=document.querySelector('meta[name="theme-color"]');if(t)t.setAttribute('content',d?'${THEME_COLORS.dark}':'${THEME_COLORS.light}');}catch(e){}})();`;

/** Aplica el tema al documento y actualiza la meta theme-color. */
export function applyTheme(preference: ThemePreference): void {
  if (typeof document === "undefined") return;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = preference === "dark" || (preference === "system" && systemDark);

  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? THEME_COLORS.dark : THEME_COLORS.light);
}

/** Lee la preferencia guardada (por defecto, la del sistema). */
export function readThemePreference(): ThemePreference {
  if (typeof localStorage === "undefined") return "system";
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
}

export function writeThemePreference(preference: ThemePreference): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    /* almacenamiento no disponible: el tema aplica igual en esta sesión */
  }
}
