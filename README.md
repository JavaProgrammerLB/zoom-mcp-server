# Zoom MCP Server

[![NPM Version](https://img.shields.io/npm/v/@yitianyigexiangfa/zoom-mcp-server)](https://www.npmjs.com/package/@yitianyigexiangfa/zoom-mcp-server) ![MIT licensed](https://img.shields.io/npm/l/@yitianyigexiangfa/zoom-mcp-server) [![smithery badge](https://smithery.ai/badge/@JavaProgrammerLB/zoom-mcp-server)](https://smithery.ai/server/@JavaProgrammerLB/zoom-mcp-server) ![Zoom MCP Server](https://badge.mcpx.dev?type=server "MCP Server")

Now you can date a Zoom meeting with AI's help
![about.jpg](about.jpg)

## Usage

### 1. list meetings

- `list my meetings`
- `list my upcoming meetings`

### 2. create a meeting

- `Schedule a meeting at today 3 pm with a introduce mcp topic`

### 3. delete a meeting

- `delete the latest meeting`
- `delete the 86226580854 meeting`

## 2 Steps to play with zoom-mcp-server

- Get Zoom Client ID, Zoom Client Secret and Account ID
- Config MCP server

### 1. Get Zoom Client ID, Zoom Client Secret and Account ID

1. vist [Zoom Marketplace](https://marketplace.zoom.us/)
1. Build App and choose **Server to Server OAuth App**
1. Add Scope > Meeting > Select All Meeting Permissions
1. Active your app
   then you can get **Account ID**, **Client ID**, **Client Secret** in App Credentials page

### 2. Config MCP Server

```json
{
  "mcpServers": {
    "zoom-mcp-server": {
      "command": "npx",
      "args": ["-y", "@yitianyigexiangfa/zoom-mcp-server"],
      "env": {
        "ZOOM_ACCOUNT_ID": "${ZOOM_ACCOUNT_ID}",
        "ZOOM_CLIENT_ID": "${ZOOM_CLIENT_ID}",
        "ZOOM_CLIENT_SECRET": "${ZOOM_CLIENT_SECRET}"
      }
    }
  }
}
```
