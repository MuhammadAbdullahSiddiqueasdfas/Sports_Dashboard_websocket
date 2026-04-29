import { WebSocketServer } from "ws";

export function createWebSocketServer(httpServer) {
  const wss = new WebSocketServer({ noServer: true });
  const broadcast = (payload) => {
    const message = JSON.stringify(payload);

    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    });
  };

  httpServer.on("upgrade", (request, socket, head) => {
    const { pathname } = new URL(request.url, "http://localhost");

    if (pathname !== "/ws") {
      socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
      socket.destroy();
      return;
    }

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });

  wss.on("connection", (ws) => {
    ws.send(
      JSON.stringify({
        type: "connected",
        message: "WebSocket connected to Sports Dashboard",
      }),
    );

    ws.on("message", (rawMessage) => {
      const message = rawMessage.toString();
      ws.send(JSON.stringify({ type: "echo", message }));
    });
  });

  return { wss, broadcast };
}
