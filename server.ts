// clashmind-server/server.ts

import { WebSocketServer } from "ws";
import { WebSocket } from "ws"; // On importe bien WebSocket comme type

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 10000;

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (socket: WebSocket) => {
  console.log("✅ Client connecté");

  socket.on("message", (data: Buffer) => {
    const message = data.toString();
    console.log("📩 Message reçu :", message);

    // Broadcast à tous les clients
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on("close", () => {
    console.log("❌ Client déconnecté");
  });
});

console.log(`🚀 Serveur WebSocket démarré sur le port ${PORT}`);
