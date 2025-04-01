import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { VERSION } from "./common/version.js";

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

async function runServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("zoom mcp server running on stdio")
}

runServer().catch((error) => {
    console.error("Fatal error in main()", error);
    process.exit(1);
});