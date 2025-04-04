# Zoom MCP Server
[![smithery badge](https://smithery.ai/badge/@JavaProgrammerLB/zoom-mcp-server)](https://smithery.ai/server/@JavaProgrammerLB/zoom-mcp-server)

Now you can date a Zoom meeting with AI's help
![about.jpg](about.jpg)

## 3 Steps to play with zoom-mcp-server

- Download this repository
- Get Zoom Client ID, Zoom Client Secret and Account ID
- Config MCP server

### 1. Download this repository

```
git clone https://github.com/JavaProgrammerLB/zoom-mcp-server
```

### 2. Get Zoom Client ID, Zoom Client Secret and Account ID

1. vist [Zoom Marketplace](https://marketplace.zoom.us/)
1. Build App and choose **Server to Server OAuth App**
1. Add Scope > Meeting > Select All Meeting Permissions
1. Active your app
   then you can get **Account ID**, **Client ID**, **Client Secret** in App Credentials page

### 3. Config MCP Server

```
{
  "mcpServers": {
    "zoom-mcp-server": {
      "command": "npx",
      "args": [
        "/PATH/TO/zoom-mcp-server"
      ],
      "env": {
        "ZOOM_ACCOUNT_ID": "${ZOOM_ACCOUNT_ID}",
        "ZOOM_CLIENT_ID": "${ZOOM_CLIENT_ID}",
        "ZOOM_CLIENT_SECRET": "${ZOOM_CLIENT_SECRET}"
      }
    }
  }
}
```
