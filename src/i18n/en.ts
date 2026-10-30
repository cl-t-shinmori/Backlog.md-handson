/**
 * English (default) messages for the Browser UI.
 * Keys are grouped by screen. Every other locale must provide the same keys.
 */
export const en = {
	// Language
	"language.name": "English",
	"language.switchTo": "Switch language to {language}",

	// Top navigation
	"nav.loading": "Loading...",
	"nav.poweredBy": "powered by",
	"nav.switchToDark": "Switch to dark mode",
	"nav.switchToLight": "Switch to light mode",

	// Side navigation
	"sidebar.search.placeholder": "Search (⌘K)...",
	"sidebar.search.title": "Search (⌘K)",
	"sidebar.search.results": "Search Results",
	"sidebar.search.searching": "Searching…",
	"sidebar.error.failed": "Failed to load navigation",
	"sidebar.error.retry": "Retry",
	"sidebar.error.failedRetry": "Failed to load navigation. Retry",
	"sidebar.tasks": "Tasks",
	"sidebar.kanban": "Kanban Board",
	"sidebar.allTasks": "All Tasks",
	"sidebar.milestones": "Milestones",
	"sidebar.drafts": "Drafts",
	"sidebar.statistics": "Statistics",
	"sidebar.documents": "Documents",
	"sidebar.documentation": "Documentation",
	"sidebar.documents.expand": "Expand documents",
	"sidebar.documents.collapse": "Collapse documents",
	"sidebar.documents.create": "Create new document",
	"sidebar.documents.unavailable": "Documents unavailable",
	"sidebar.documents.empty": "No documents",
	"sidebar.decisions": "Decisions",
	"sidebar.decisions.expand": "Expand decisions",
	"sidebar.decisions.collapse": "Collapse decisions",
	"sidebar.decisions.unavailable": "Decisions unavailable",
	"sidebar.decisions.empty": "No decisions",
	"sidebar.settings": "Settings",

	// Kanban board
	"board.title": "Kanban Board",
	"board.newTask": "+ New Task",
	"board.selected": "{count} selected",
	"board.moveSelectedTo": "Move selected tasks to",
	"board.moveTo": "Move to...",
	"board.move": "Move",
	"board.clear": "Clear",
	"board.lane.all": "All Tasks",
	"board.lane.milestone": "Milestone",
	"board.lane.milestone.disabled": "No tasks have milestones. Assign milestones to tasks first.",
	"board.lane.milestone.enabled": "Group tasks by milestone",
	"board.filter.allAssignees": "All assignees",
	"board.filter.unassigned": "Unassigned",
	"board.filter.allTypes": "All types",
	"board.filter.allProjects": "All projects",
	"board.filter.clear": "Clear filters",
	"board.error.failed": "Failed to load tasks",
	"board.error.retry": "Retry",

	// Task list
	"tasks.title": "All Tasks",
	"tasks.newTask": "+ New Task",
	"tasks.empty": "No tasks",
	"tasks.empty.filtered": "No tasks match the current filters",
	"tasks.empty.hint": "Get started by creating a new task.",
	"tasks.empty.filtered.hint": "Try adjusting your search or clearing filters to see more tasks.",
	"tasks.column.id": "ID",
	"tasks.column.title": "Title",
	"tasks.column.status": "Status",
	"tasks.column.priority": "Priority",
	"tasks.column.ordinal": "Ordinal",
	"tasks.column.labels": "Labels",
	"tasks.column.assignee": "Assignee",
	"tasks.column.milestone": "Milestone",
	"tasks.column.created": "Created",

	// Drafts
	"drafts.title": "Draft Tasks",
	"drafts.newDraft": "+ New Draft",
	"drafts.empty": "No drafts",
	"drafts.empty.hint": "Draft tasks will appear here before they're promoted to the main backlog.",
	"drafts.count.one": "1 draft",
	"drafts.count.other": "{count} drafts",

	// Milestones
	"milestones.title": "Milestones",

	// Statistics
	"statistics.title": "Project Statistics",
	"statistics.titleFor": "{project} Statistics",
	"statistics.subtitle": "Overview of your project's task metrics and activity",

	// Settings
	"settings.title": "Settings",
	"settings.webUi": "Web UI Settings",
} as const;

export type MessageKey = keyof typeof en;
