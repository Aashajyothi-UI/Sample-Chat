const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  ws.id = uuidv4(); 

  ws.on('message', message => {
    const parsedMessage = JSON.parse(message);
    parsedMessage.senderId = ws.id; 

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsedMessage));
      }
    });
  });

  ws.send(JSON.stringify({ text: 'Welcome to the chat!', senderId: ws.id }));
});


