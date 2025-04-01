import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { VERSION } from "./common/version.js";
import { ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from 'zod-to-json-schema';
import { CreateMeetingOptionsSchema } from "./operations/meeting.js";

const server = new Server(
    {
        name: 'zoom-mcp-server',
        version: VERSION,
    }, {
    capabilities: {
        tools: {},
    },
}
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "create_repository",
                description: "Create a meeting",
                inputSchema: zodToJsonSchema(CreateMeetingOptionsSchema),
            }
        ]
    }
});

async function runServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("zoom mcp server running on stdio")
}

runServer().catch((error) => {
    console.error("Fatal error in main()", error);
    process.exit(1);
});