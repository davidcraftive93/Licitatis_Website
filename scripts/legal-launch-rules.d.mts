/** Tipos para el módulo de reglas del release gate legal (usado por Vitest/TS). */
export interface LegalPattern {
  name: string;
  re: RegExp;
}

export const CANONICAL_DOMAIN: string;
export const REQUIRED_LEGAL_ROUTES: string[];
export const NOINDEX_ROUTES: string[];
export const PLACEHOLDER_PATTERNS: LegalPattern[];
export const PROHIBITED_CLAIM_PATTERNS: LegalPattern[];
export const CERTIFICATION_PATTERNS: LegalPattern[];
export const BRAND_MISUSE_PATTERNS: LegalPattern[];
export const DELIBERATE_COPY: LegalPattern[];
export function scanText(text: string, patterns: LegalPattern[]): string[];
/** Quita el copy deliberado (hoy, solo el marcador de hueco del producto). */
export function stripDeliberateCopy(text: string): string;
export function isCanonicalUrlOk(url: unknown): boolean;
