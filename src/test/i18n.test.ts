import { describe, expect, it } from "bun:test";
import {
	DEFAULT_LOCALE,
	LOCALE_STORAGE_KEY,
	type MessageKey,
	SUPPORTED_LOCALES,
	isLocale,
	localeDisplayName,
	messages,
	resolveLocale,
	translate,
} from "../i18n";
import { en } from "../i18n/en";
import { ja } from "../i18n/ja";

describe("i18n dictionaries", () => {
	it("supports English and Japanese with English as the default", () => {
		expect(SUPPORTED_LOCALES).toEqual(["en", "ja"]);
		expect(DEFAULT_LOCALE).toBe("en");
		expect(LOCALE_STORAGE_KEY).toBe("backlog-locale");
	});

	it("keeps every locale in sync with the English key set", () => {
		const enKeys = Object.keys(en).sort();
		for (const locale of SUPPORTED_LOCALES) {
			expect(Object.keys(messages[locale]).sort()).toEqual(enKeys);
		}
	});

	it("has no empty messages in any locale", () => {
		for (const locale of SUPPORTED_LOCALES) {
			for (const [key, value] of Object.entries(messages[locale])) {
				expect(value.trim().length, `${locale}:${key}`).toBeGreaterThan(0);
			}
		}
	});

	it("uses the same placeholders in every translation", () => {
		const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
		for (const key of Object.keys(en) as MessageKey[]) {
			expect(placeholders(ja[key]), key).toEqual(placeholders(en[key]));
		}
	});

	it("exposes each locale's name in its own language", () => {
		expect(localeDisplayName("en")).toBe("English");
		expect(localeDisplayName("ja")).toBe("日本語");
	});
});

describe("translate", () => {
	it("returns the message for the requested locale", () => {
		expect(translate("en", "sidebar.kanban")).toBe("Kanban Board");
		expect(translate("ja", "sidebar.kanban")).toBe("かんばんボード");
	});

	it("substitutes named placeholders", () => {
		expect(translate("en", "board.selected", { count: 3 })).toBe("3 selected");
		expect(translate("ja", "board.selected", { count: 3 })).toBe("3 件選択中");
		expect(translate("ja", "statistics.titleFor", { project: "Demo" })).toBe("Demo の統計");
	});

	it("leaves unknown placeholders untouched and ignores extra params", () => {
		expect(translate("en", "board.selected", { other: 1 })).toBe("{count} selected");
		expect(translate("en", "sidebar.kanban", { count: 1 })).toBe("Kanban Board");
	});

	it("falls back to English, then to the key, for unknown entries", () => {
		const unknownLocale = "fr" as unknown as "en";
		expect(translate(unknownLocale, "sidebar.kanban")).toBe("Kanban Board");
		const unknownKey = "does.not.exist" as MessageKey;
		expect(translate("ja", unknownKey)).toBe("does.not.exist");
	});
});

describe("resolveLocale", () => {
	it("prefers an explicitly stored locale", () => {
		expect(resolveLocale("ja", ["en-US"])).toBe("ja");
		expect(resolveLocale("en", ["ja-JP"])).toBe("en");
	});

	it("falls back to the first supported browser language", () => {
		expect(resolveLocale(null, ["fr-FR", "ja-JP", "en-US"])).toBe("ja");
		expect(resolveLocale(undefined, ["EN-GB"])).toBe("en");
	});

	it("ignores invalid stored values and returns the default when nothing matches", () => {
		expect(resolveLocale("zz", [])).toBe("en");
		expect(resolveLocale("", ["fr-FR"])).toBe("en");
		expect(resolveLocale(null)).toBe("en");
	});

	it("validates locale strings", () => {
		expect(isLocale("ja")).toBe(true);
		expect(isLocale("JA")).toBe(false);
		expect(isLocale(undefined)).toBe(false);
	});
});
