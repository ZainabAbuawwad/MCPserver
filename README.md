# my-first-mcp

A simple MCP (Model Context Protocol) server built with TypeScript, the official `@modelcontextprotocol/sdk`, and Zod for input validation. This project was built as a learning exercise to understand how MCP tools, schemas, and the Inspector workflow work.

Built by **Zainab Abu Awwad**.

## What this server does

This server exposes two tools over stdio transport:

| Tool | Description | Input |
|---|---|---|
| `greet` | Says hello to someone by name | `name: string` |
| `introduce_me` | Introduces the server owner | *(no input)* |

## Requirements

- Node.js (v18+ recommended)
- npm

## Setup

Clone the repo and install dependencies:

```bash
git clone <your-repo-url>
cd my-first-mcp
npm install
```

## Running the server

The server communicates over stdio, so it's meant to be launched by an MCP client (like Claude Desktop or MCP Inspector) rather than run standalone.

To test it locally with **MCP Inspector**:

```bash
npx @modelcontextprotocol/inspector npx tsx src/index.ts
```

This opens a local web UI where you can:
1. Connect to the server (Transport Type: `STDIO`, Command: `npx`, Arguments: `tsx src/index.ts`)
2. Go to the **Tools** tab and click **List Tools** to see `greet` and `introduce_me`
3. Call `greet` with a `name` value (e.g. `"Zainab"`) and see the response
4. Call `introduce_me` with no input and see the response

## Project structure

```
my-first-mcp/
├── src/
│   └── index.ts        # Server definition and tool registration
├── package.json
├── tsconfig.json
└── README.md
```

## Tech stack

- **TypeScript** — language
- **@modelcontextprotocol/sdk** — MCP server implementation
- **zod** — schema validation for tool inputs
- **tsx** — runs TypeScript directly without a separate build step

## Notes

- Input validation is handled automatically by Zod via `inputSchema` — invalid input (e.g. missing required fields) is rejected before it reaches the tool handler.
- This project uses ESM (`"type": "module"` in `package.json`), which is required for top-level `await` in `src/index.ts`.