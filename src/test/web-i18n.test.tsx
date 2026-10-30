import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { LOCALE_STORAGE_KEY } from "../i18n";
import Navigation from "../web/components/Navigation";
import SideNavigation from "../web/components/SideNavigation";
import { I18nProvider } from "../web/contexts/I18nContext";
import { ThemeProvider } from "../web/contexts/ThemeContext";

// These tests render on the server (renderToString), so only the state
// initialisers of the providers run. They read localStorage, navigator and
// window.matchMedia, which are stubbed here so results never depend on the host.
const storage = new Map<string, string>();
const globalDescriptors = new Map<string, PropertyDescriptor | undefined>();

const defineGlobal = (name: string, value: unknown) => {
	if (!globalDescriptors.has(name)) globalDescriptors.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
	Object.defineProperty(globalThis, name, { value, writable: true, configurable: true, enumerable: true });
};

const stubBrowser = (languages: string[]) => {
	defineGlobal("localStorage", {
		getItem: (key: string) => storage.get(key) ?? null,
		setItem: (key: string, value: string) => storage.set(key, value),
		removeItem: (key: string) => storage.delete(key),
		clear: () => storage.clear(),
		key: (index: number) => [...storage.keys()][index] ?? null,
		get length() {
			return storage.size;
		},
	} as Storage);
	defineGlobal("navigator", { languages, language: languages[0] ?? "en-US" });
	defineGlobal("window", { matchMedia: () => ({ matches: false }) });
};

beforeEach(() => {
	storage.clear();
	stubBrowser(["en-US"]);
});

afterEach(() => {
	for (const [name, descriptor] of globalDescriptors) {
		if (descriptor) Object.defineProperty(globalThis, name, descriptor);
		else Reflect.deleteProperty(globalThis, name);
	}
	globalDescriptors.clear();
});

const renderSideNavigation = (): string =>
	renderToString(
		<I18nProvider>
			<MemoryRouter>
				<SideNavigation
					taskCount={2}
					docs={[]}
					decisions={[]}
					isLoading={false}
					onRetry={async () => {}}
					onRefreshData={async () => {}}
				/>
			</MemoryRouter>
		</I18nProvider>,
	).replaceAll("<!-- -->", "");

const renderNavigation = (): string =>
	renderToString(
		<I18nProvider>
			<ThemeProvider>
				<Navigation projectName="" loadingMessage={null} />
			</ThemeProvider>
		</I18nProvider>,
	);

describe("Browser UI language switching", () => {
	it("renders English when nothing is stored and the browser prefers English", () => {
		const html = renderSideNavigation();
		expect(html).toContain("Kanban Board");
		expect(html).toContain("All Tasks");
		expect(html).toContain("Tasks (2)");
		expect(html).toContain("No documents");
		expect(html).not.toContain("かんばんボード");
	});

	it("follows the browser language when nothing is stored", () => {
		stubBrowser(["ja-JP", "en-US"]);
		expect(renderSideNavigation()).toContain("かんばんボード");
	});

	it("renders Japanese when the stored language is ja", () => {
		storage.set(LOCALE_STORAGE_KEY, "ja");
		const html = renderSideNavigation();
		expect(html).toContain("かんばんボード");
		expect(html).toContain("すべてのタスク");
		expect(html).toContain("タスク (2)");
		expect(html).toContain("マイルストーン");
		expect(html).toContain("ドキュメントはありません");
		expect(html).toContain("設定");
		expect(html).not.toContain("Kanban Board");
	});

	it("prefers the stored language over the browser language", () => {
		stubBrowser(["ja-JP"]);
		storage.set(LOCALE_STORAGE_KEY, "en");
		expect(renderSideNavigation()).toContain("Kanban Board");
	});

	it("ignores an unsupported stored language and falls back to English", () => {
		storage.set(LOCALE_STORAGE_KEY, "fr");
		expect(renderSideNavigation()).toContain("Kanban Board");
	});

	it("translates the top navigation and exposes the language toggle", () => {
		const english = renderNavigation();
		expect(english).toContain("Loading...");
		expect(english).toContain('data-testid="language-toggle"');
		expect(english).toContain("Switch language to 日本語");
		expect(english).toContain("Switch to dark mode");

		storage.set(LOCALE_STORAGE_KEY, "ja");
		const japanese = renderNavigation();
		expect(japanese).toContain("読み込み中...");
		expect(japanese).toContain("表示言語をEnglishに切り替える");
		expect(japanese).toContain("ダークモードに切り替える");
	});

	it("does not write an auto-detected language to storage", () => {
		stubBrowser(["ja-JP"]);
		renderSideNavigation();
		expect(storage.has(LOCALE_STORAGE_KEY)).toBe(false);
	});
});
