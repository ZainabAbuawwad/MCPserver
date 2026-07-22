import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "my-first-mcp", version: "0.1.0" });

server.registerTool(
  "greet",
  {
    title: "Greet",
    description: "Say hello to someone by name",
    inputSchema: z.object({
      name: z.string().describe("The person's name to greet"),
    }),
  },
  async ({ name }) => {
    return {
      content: [
        { type: "text", text: `Hello, ${name}! This is Zainab Abu Awwad's MCP server.` },
      ],
    };
  },
);

server.registerTool(
  "introduce_me",
  {
    title: "Introduce Me",
    description: "Introduces the server owner",
    inputSchema: z.object({}),
  },
  async () => {
    return {
      content: [
        { type: "text", text: "This MCP server was built by Zainab Abu Awwad." },
      ],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Failed to start MCP server:", error);
  process.exit(1);
});