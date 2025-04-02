#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { VERSION } from "./common/version.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  createMeeting,
  CreateMeetingOptionsSchema,
  ListMeetingOptionsSchema,
  listMeetings,
} from "./operations/meeting.js";
import { z } from "zod";
import { getAccessToken } from "./common/auth.js";

const server = new Server(
  {
    name: "zoom-mcp-server",
    version: VERSION,
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "create_meeting",
        description: "Create a meeting",
        inputSchema: zodToJsonSchema(CreateMeetingOptionsSchema),
      },
      {
        name: "list_meetings",
        description: "List scheduled meetings",
        inputSchema: zodToJsonSchema(ListMeetingOptionsSchema),
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    if (!request.params.arguments) {
      throw new Error("No arguments provided");
    }
    let token = await getAccessToken();
    switch (request.params.name) {
      case "create_meeting": {
        const args = CreateMeetingOptionsSchema.parse(request.params.arguments);
        const result = await createMeeting(args, token.access_token);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "list_meetings": {
        const args = ListMeetingOptionsSchema.parse(request.params.arguments);
        const result = await listMeetings(args, token.access_token);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid input: ${JSON.stringify(error.errors)}`);
    }
    throw error;
  }

  return {};
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("zoom mcp server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error in main()", error);
  process.exit(1);
});
