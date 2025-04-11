#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { VERSION } from "./common/version.js";
import {
  CallToolRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  createMeeting,
  CreateMeetingOptionsSchema,
  deleteMeeting,
  DeleteMeetingOptionsSchema,
  ListMeetingOptionsSchema,
  listMeetings,
} from "./operations/meeting.js";
import { z } from "zod";

const server = new Server(
  {
    name: "zoom-mcp-server",
    version: VERSION,
  },
  {
    capabilities: {
      tools: {},
      prompts: {},
      logging: {},
    },
  },
);

enum PromptName {
  LIST_MEETINGS = "list_meetings",
  CREATE_A_MEETING = "create_meeting",
  DELETE_A_MEETING = "delete_a_meeting",
}

server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: PromptName.LIST_MEETINGS,
        description: "A prompt to list meetings",
      },
      {
        name: PromptName.CREATE_A_MEETING,
        description: "A prompt to create a meeting",
      },
      {
        name: PromptName.DELETE_A_MEETING,
        description: "A prompt to delete a meeting",
      },
    ],
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === PromptName.LIST_MEETINGS) {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: "List my zoom meetings",
          },
        },
      ],
    };
  } else if (name === PromptName.CREATE_A_MEETING) {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: "Create a zoom meeting",
          },
        },
      ],
    };
  } else if (name === PromptName.DELETE_A_MEETING) {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: "Delete a zoom meeting",
          },
        },
      ],
    };
  }
  throw new Error(`Unknown prompt: ${name}`);
});

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
      {
        name: "delete_meeting",
        description: "Delete a meeting with a given ID",
        inputSchema: zodToJsonSchema(DeleteMeetingOptionsSchema),
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    if (!request.params.arguments) {
      throw new Error("No arguments provided");
    }
    switch (request.params.name) {
      case "create_meeting": {
        const args = CreateMeetingOptionsSchema.parse(request.params.arguments);
        const result = await createMeeting(args);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "list_meetings": {
        const args = ListMeetingOptionsSchema.parse(request.params.arguments);
        const result = await listMeetings(args);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "delete_meeting": {
        const args = DeleteMeetingOptionsSchema.parse(request.params.arguments);
        const result = await deleteMeeting(args);
        return {
          content: [{ type: "text", text: result }],
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
  server.sendLoggingMessage({
    level: "info",
    data: "Server started successfully",
  });
}

runServer().catch((error) => {
  console.error("Fatal error in main()", error);
  process.exit(1);
});
