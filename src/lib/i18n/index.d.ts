/**
 * Type declarations for the i18n module, so TypeScript/svelte-check can resolve
 * `$lib/i18n` (the runtime implementation lives in `index.svelte.ts`, which uses
 * Svelte 5 runes and is not picked up as a directory index by plain tsc).
 * Vite resolves the runtime to `index.svelte.ts` (via resolve.extensions); this
 * file only supplies the export signatures to the type checker.
 */
export type LanguageCode = "lt" | "en";

export interface Language {
  code: LanguageCode;
}

export const language: Language;

export const languageOptions: readonly {
  readonly code: LanguageCode;
  readonly name: string;
}[];

export function setLanguage(next: LanguageCode): void;

export function t(
  key: string,
  values?: Record<string, string | number>,
): string;
