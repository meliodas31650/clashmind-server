"use strict";
// clashmind-server/server.ts
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 10000;
const wss = new ws_1.WebSocketServer({ port: PORT });
wss.on("connection", (socket) => {
    console.log("✅ Client connecté");
    socket.on("message", (data) => {
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
