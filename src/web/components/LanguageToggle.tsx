import React from "react";
import { localeDisplayName, SUPPORTED_LOCALES } from "../../i18n";
import { useI18n } from "../contexts/I18nContext";

/** Cycles through the supported Browser UI languages (currently English ⇄ Japanese). */
const LanguageToggle: React.FC = () => {
	const { locale, setLocale, t } = useI18n();
	const index = SUPPORTED_LOCALES.indexOf(locale);
	const next = SUPPORTED_LOCALES[(index + 1) % SUPPORTED_LOCALES.length] ?? SUPPORTED_LOCALES[0];
	const label = t("language.switchTo", { language: localeDisplayName(next) });

	return (
		<button
			type="button"
			onClick={() => setLocale(next)}
			className="px-2 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 dark:focus:ring-stone-400 dark:focus:ring-offset-gray-900"
			aria-label={label}
			title={label}
			data-testid="language-toggle"
		>
			{locale}
		</button>
	);
};

export default LanguageToggle;
