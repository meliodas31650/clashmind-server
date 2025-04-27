// clashmind-server/server.js

const WebSocket = require('ws');
const PORT = process.env.PORT || 10000;

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (socket) => {
  console.log('✅ Client connecté');

  socket.on('message', (data) => {
    console.log('📩 Message reçu :', data);

    // Broadcast à tous les clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  socket.on('close', () => {
    console.log('❌ Client déconnecté');
  });
});

console.log(`🚀 Serveur WebSocket démarré sur le port ${PORT}`);

