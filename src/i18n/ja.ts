import type { MessageKey } from "./en";

/**
 * Japanese messages for the Browser UI.
 */
export const ja: Record<MessageKey, string> = {
	// Language
	"language.name": "日本語",
	"language.switchTo": "表示言語を{language}に切り替える",

	// Top navigation
	"nav.loading": "読み込み中...",
	"nav.poweredBy": "powered by",
	"nav.switchToDark": "ダークモードに切り替える",
	"nav.switchToLight": "ライトモードに切り替える",

	// Side navigation
	"sidebar.search.placeholder": "検索 (⌘K)...",
	"sidebar.search.title": "検索 (⌘K)",
	"sidebar.search.results": "検索結果",
	"sidebar.search.searching": "検索中…",
	"sidebar.error.failed": "ナビゲーションを読み込めませんでした",
	"sidebar.error.retry": "再試行",
	"sidebar.error.failedRetry": "ナビゲーションを読み込めませんでした。再試行",
	"sidebar.tasks": "タスク",
	"sidebar.kanban": "かんばんボード",
	"sidebar.allTasks": "すべてのタスク",
	"sidebar.milestones": "マイルストーン",
	"sidebar.drafts": "下書き",
	"sidebar.statistics": "統計",
	"sidebar.documents": "ドキュメント",
	"sidebar.documentation": "ドキュメント",
	"sidebar.documents.expand": "ドキュメントを展開",
	"sidebar.documents.collapse": "ドキュメントを折りたたむ",
	"sidebar.documents.create": "新しいドキュメントを作成",
	"sidebar.documents.unavailable": "ドキュメントを取得できません",
	"sidebar.documents.empty": "ドキュメントはありません",
	"sidebar.decisions": "決定事項",
	"sidebar.decisions.expand": "決定事項を展開",
	"sidebar.decisions.collapse": "決定事項を折りたたむ",
	"sidebar.decisions.unavailable": "決定事項を取得できません",
	"sidebar.decisions.empty": "決定事項はありません",
	"sidebar.settings": "設定",

	// Kanban board
	"board.title": "かんばんボード",
	"board.newTask": "+ 新しいタスク",
	"board.selected": "{count} 件選択中",
	"board.moveSelectedTo": "選択したタスクの移動先",
	"board.moveTo": "移動先...",
	"board.move": "移動",
	"board.clear": "解除",
	"board.lane.all": "すべてのタスク",
	"board.lane.milestone": "マイルストーン",
	"board.lane.milestone.disabled": "マイルストーンが設定されたタスクがありません。先にタスクへマイルストーンを割り当ててください。",
	"board.lane.milestone.enabled": "マイルストーンごとにタスクをまとめる",
	"board.filter.allAssignees": "すべての担当者",
	"board.filter.unassigned": "未割り当て",
	"board.filter.allTypes": "すべての種類",
	"board.filter.allProjects": "すべてのプロジェクト",
	"board.filter.clear": "フィルターを解除",
	"board.error.failed": "タスクを読み込めませんでした",
	"board.error.retry": "再試行",

	// Task list
	"tasks.title": "すべてのタスク",
	"tasks.newTask": "+ 新しいタスク",
	"tasks.empty": "タスクはありません",
	"tasks.empty.filtered": "条件に一致するタスクはありません",
	"tasks.empty.hint": "新しいタスクを作成して始めましょう。",
	"tasks.empty.filtered.hint": "検索条件を変更するか、フィルターを解除してください。",
	"tasks.column.id": "ID",
	"tasks.column.title": "タイトル",
	"tasks.column.status": "ステータス",
	"tasks.column.priority": "優先度",
	"tasks.column.ordinal": "並び順",
	"tasks.column.labels": "ラベル",
	"tasks.column.assignee": "担当者",
	"tasks.column.milestone": "マイルストーン",
	"tasks.column.created": "作成日",

	// Drafts
	"drafts.title": "下書きタスク",
	"drafts.newDraft": "+ 新しい下書き",
	"drafts.empty": "下書きはありません",
	"drafts.empty.hint": "下書きタスクは、バックログに昇格するまでここに表示されます。",
	"drafts.count.one": "1 件の下書き",
	"drafts.count.other": "{count} 件の下書き",

	// Milestones
	"milestones.title": "マイルストーン",

	// Statistics
	"statistics.title": "プロジェクト統計",
	"statistics.titleFor": "{project} の統計",
	"statistics.subtitle": "プロジェクトのタスク指標と活動の概要",

	// Settings
	"settings.title": "設定",
	"settings.webUi": "Web UI 設定",
};
