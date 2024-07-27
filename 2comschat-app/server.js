const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  ws.id = uuidv4(); // Assign a unique ID to each client

  ws.on('message', message => {
    const parsedMessage = JSON.parse(message);
    parsedMessage.senderId = ws.id; // Add the sender ID to the message

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsedMessage));
      }
    });
  });

  ws.send(JSON.stringify({ text: 'Welcome to the chat!', senderId: ws.id }));
});

console.log('WebSocket server is running on ws://localhost:8080');
