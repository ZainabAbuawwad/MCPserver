# Design: To-Do List MCP Server

## Pitch
Managing small daily tasks usually means switching to a separate to-do app, breaking flow with an AI assistant. This project is a To-Do List MCP server for individuals who already work inside an AI chat interface and want task management without leaving it. It exposes tools to add, list, complete, and delete tasks, backed by a simple local JSON file — no login, no paid API, fully offline.

## User & Demo Story
On Demo Day, I ask the assistant: "Add a task to review the design doc by Friday." The assistant calls `add_task` with the title and due date, and confirms the task was created. Later I ask, "What's still on my list?" — the assistant calls `list_tasks` filtered to pending, and reads back the open items including the new one. I then say, "Mark the design doc review as done," and the assistant calls `complete_task` with the matching id, confirming the update. Finally I ask, "Clean up anything I don't need anymore," and the assistant calls `delete_task` on an old, irrelevant item after confirming with me first.

## Tool Inventory

| tool_name | description (1 line) | inputs | output (shape) | priority |
|---|---|---|---|---|
| `add_task` | Creates a new to-do item | `title: string`, `due_date?: string` | `{ id, title, due_date, done: false }` | P0 |
| `list_tasks` | Returns tasks, optionally filtered by status | `filter?: "pending"\|"completed"\|"all"` | `{ tasks: [ {id, title, due_date, done} ] }` | P0 |
| `complete_task` | Marks a task as done by id | `id: string` | `{ id, title, done: true }` | P0 |
| `delete_task` | Permanently removes a task by id | `id: string` | `{ id, deleted: true }` | P1 |
| `update_task` | Edits a task's title or due date | `id: string`, `title?: string`, `due_date?: string` | `{ id, title, due_date, done }` | P1 |
| `search_tasks` | Finds tasks by keyword in the title | `query: string` | `{ tasks: [ {id, title, due_date, done} ] }` | P1 |

## Out of Scope
- No user authentication or multi-user accounts
- No paid APIs or external services — storage is a local JSON file only
- No mobile or web UI — MCP tool calls only, no separate frontend
- No recurring tasks, reminders, or notifications
- No syncing across devices

## Success Criteria
- [ ] `add_task` creates a task that then appears in `list_tasks` output
- [ ] `complete_task` correctly flips a task's `done` status, verified via `list_tasks`
- [ ] Server runs and responds to all P0 tool calls fully offline, with no external API calls

## Risks
1. **Risk:** Scope creep into P1 tools (search, update) eating time meant for polishing P0 tools.
   **Mitigation:** P1 tools stay as stubs (return "not implemented yet") until all P0 tools are solid and demoed once.
2. **Risk:** Data loss/corruption from a shared JSON file being read and written concurrently.
   **Mitigation:** Keep operations synchronous and simple for now (single-user, single-process); revisit only if it becomes a real problem.