/** Tipos para el módulo de reglas del release gate legal (usado por Vitest/TS). */
export interface LegalPattern {
  name: string;
  re: RegExp;
}

export const CANONICAL_DOMAIN: string;
export const REQUIRED_LEGAL_ROUTES: string[];
export const NOINDEX_WHILE_PLACEHOLDER: string[];
export const PLACEHOLDER_PATTERNS: LegalPattern[];
export const PROHIBITED_CLAIM_PATTERNS: LegalPattern[];
export function scanText(text: string, patterns: LegalPattern[]): string[];
export function isCanonicalUrlOk(url: unknown): boolean;
