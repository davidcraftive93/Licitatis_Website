/**
 * Rate limiting best-effort en memoria (ventana deslizante por clave/IP).
 *
 * Limitación conocida: en un entorno serverless (Vercel) el estado no se comparte
 * entre instancias, por lo que esto frena ráfagas triviales pero no es un límite
 * global fuerte. Para un límite robusto y distribuido, usar un almacén tipo KV
 * (p. ej. Upstash Redis). Ver docs/SECURITY.md.
 */

type Bucket = { count: number; resetAt: number };

const store = new Map<string, Bucket>();

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
): RateLimitResult {
  const now = Date.now();
  const bucket = store.get(key);

  if (!bucket || bucket.resetAt <= now) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
  }

  bucket.count += 1;
  const ok = bucket.count <= limit;
  return { ok, remaining: Math.max(0, limit - bucket.count), resetAt: bucket.resetAt };
}

/** Limpieza oportunista para evitar crecimiento indefinido del Map. */
export function pruneRateLimitStore(): void {
  const now = Date.now();
  for (const [key, bucket] of store.entries()) {
    if (bucket.resetAt <= now) store.delete(key);
  }
}
