import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
	DEFAULT_LOCALE,
	LOCALE_STORAGE_KEY,
	type Locale,
	type MessageKey,
	type MessageParams,
	resolveLocale,
	translate,
} from "../../i18n";

interface I18nContextType {
	locale: Locale;
	setLocale: (locale: Locale) => void;
	t: (key: MessageKey, params?: MessageParams) => string;
}

// Default value lets components render in English without a provider
// (server-side rendering in tests, isolated component previews).
const fallbackContext: I18nContextType = {
	locale: DEFAULT_LOCALE,
	setLocale: () => {},
	t: (key, params) => translate(DEFAULT_LOCALE, key, params),
};

const I18nContext = createContext<I18nContextType>(fallbackContext);

export const useI18n = () => useContext(I18nContext);

function readStoredLocale(): string | null {
	try {
		return typeof localStorage === "undefined" ? null : localStorage.getItem(LOCALE_STORAGE_KEY);
	} catch {
		return null;
	}
}

function readBrowserLanguages(): readonly string[] {
	if (typeof navigator === "undefined") return [];
	return navigator.languages ?? (navigator.language ? [navigator.language] : []);
}

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [locale, setLocaleState] = useState<Locale>(() => resolveLocale(readStoredLocale(), readBrowserLanguages()));

	useEffect(() => {
		if (typeof document !== "undefined") {
			document.documentElement.lang = locale;
		}
	}, [locale]);

	// Only an explicit choice is remembered; a locale auto-detected from the
	// browser keeps following the browser language on later visits.
	const setLocale = useCallback((next: Locale) => {
		setLocaleState(next);
		try {
			localStorage.setItem(LOCALE_STORAGE_KEY, next);
		} catch {
			// Storage can be unavailable (private mode, disabled storage); the choice then lasts for this page only.
		}
	}, []);
	const t = useCallback((key: MessageKey, params?: MessageParams) => translate(locale, key, params), [locale]);

	const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
