#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Tools } from "./tools/tools.js";

async function main() {
  const server = new Server({ name: "zillow-com1-mcp", version: "1.0.0" }, { capabilities: { tools: {} } });
  new Tools(server);
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Zillow Com1 MCP Server started");
}

main().catch((e) => {
  console.error("Failed to start Zillow Com1 MCP:", e);
  process.exit(1);
});
