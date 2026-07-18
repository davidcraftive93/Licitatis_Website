import { NextResponse, type NextRequest } from "next/server";
import { leadSchema } from "@/lib/validation";
import { rateLimit, pruneRateLimitStore } from "@/lib/rate-limit";
import { submitLeadToHubspot } from "@/lib/hubspot";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getClientIp(request: NextRequest): string {
  // Se prioriza x-real-ip (la fija la edge de Vercel y no es manipulable por el cliente)
  // frente al valor izquierdo de x-forwarded-for, que sí puede falsificarse (CWE-348).
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return "unknown";
}

export async function POST(request: NextRequest) {
  pruneRateLimitStore();

  // 1) Rate limiting best-effort por IP.
  const ip = getClientIp(request);
  const limit = rateLimit(`lead:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  // 2) Cuerpo JSON.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // 3) Honeypot: si el campo trampa llega relleno, tratamos como spam sin procesar.
  if (
    body &&
    typeof body === "object" &&
    typeof (body as Record<string, unknown>).company_url === "string" &&
    ((body as Record<string, unknown>).company_url as string).length > 0
  ) {
    return NextResponse.json({ ok: true, delivered: false, reason: "spam" }, { status: 200 });
  }

  // 4) Validación con la fuente de verdad (zod).
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation_error" }, { status: 400 });
  }

  // 5) Envío a HubSpot (o degradación controlada si no está configurado).
  const result = await submitLeadToHubspot(parsed.data, {
    ipAddress: ip !== "unknown" ? ip : undefined,
    hutk: parsed.data.hutk,
    pageUri: parsed.data.pageUri,
    pageName: "Landing LICITATIS — Solicitud de demostración",
  });

  if (result.delivered) {
    return NextResponse.json({ ok: true, delivered: true }, { status: 200 });
  }

  if (result.reason === "not_configured") {
    // Pre-lanzamiento: HubSpot aún no configurado. La landing sigue siendo usable.
    console.warn("[lead] HubSpot no configurado; el lead no se ha entregado a ningún CRM.");
    return NextResponse.json(
      { ok: true, delivered: false, reason: "not_configured" },
      { status: 200 },
    );
  }

  // Configurado pero con error: informamos para que el usuario pueda reintentar.
  console.error(`[lead] Entrega fallida: ${result.reason}`);
  return NextResponse.json(
    { ok: false, delivered: false, error: "delivery_failed" },
    { status: 502 },
  );
}

export function GET() {
  return NextResponse.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
}
