/**
 * Browser UI internationalisation.
 *
 * All user-facing strings for the web UI live in this folder. Add a key to
 * `en.ts` (the source of truth) and translate it in every other locale file.
 * Components read strings through the `useI18n()` hook in
 * `src/web/contexts/I18nContext.tsx`, which wraps the pure helpers below.
 */
import { en, type MessageKey } from "./en";
import { ja } from "./ja";

export type { MessageKey } from "./en";

export const SUPPORTED_LOCALES = ["en", "ja"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** localStorage key used by the Browser UI to remember the selected locale. */
export const LOCALE_STORAGE_KEY = "backlog-locale";

export const messages: Record<Locale, Record<MessageKey, string>> = { en, ja };

export function isLocale(value: unknown): value is Locale {
	return typeof value === "string" && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

/**
 * Pick a supported locale from a stored preference and/or browser languages.
 * Order: explicit stored value → first matching navigator language → default.
 */
export function resolveLocale(stored: string | null | undefined, browserLanguages: readonly string[] = []): Locale {
	if (isLocale(stored)) return stored;
	for (const language of browserLanguages) {
		const base = language.toLowerCase().split("-")[0];
		if (isLocale(base)) return base;
	}
	return DEFAULT_LOCALE;
}

export type MessageParams = Record<string, string | number>;

/**
 * Translate `key` into `locale`, substituting `{name}` placeholders from `params`.
 * Falls back to English, then to the key itself, so a missing translation never
 * renders as an empty string.
 */
export function translate(locale: Locale, key: MessageKey, params?: MessageParams): string {
	const template = messages[locale]?.[key] ?? messages[DEFAULT_LOCALE][key] ?? key;
	if (!params) return template;
	return template.replace(/\{(\w+)\}/g, (match, name: string) => {
		const value = params[name];
		return value === undefined ? match : String(value);
	});
}

/** Name of each locale shown in its own language (used by the language switcher). */
export function localeDisplayName(locale: Locale): string {
	return messages[locale]["language.name"];
}
