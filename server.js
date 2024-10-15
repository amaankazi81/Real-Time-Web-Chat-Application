const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });
let rooms = {};  
let users = {};
let onlineUsers = [];  

server.on('connection', ws => {
  let currentRoom = null;
  let username = null;

  // Handle incoming messages from clients
  ws.on('message', message => {
    const data = JSON.parse(message);
    console.log("Recieved Message: ",data)

    // Handle setting username
    if (data.type === 'setUsername') {
      username = data.username;
      users[username] = ws;
      onlineUsers.push(username);
      broadcastOnlineUsers();      
    }

    // Handle creating or joining a room
    if (data.type === 'joinRoom') {
      currentRoom = data.room;
      if (!rooms[currentRoom]) rooms[currentRoom] = [];
      rooms[currentRoom].push(username);
      updateRoomList();
    }

    // Handle sending a message
    if (data.type === 'message') {
      broadcastMessage(currentRoom, {
        type: 'message',
        message: data.message,
        user: username,
        time: data.time
      });
    }
  });

  // Handle disconnecting users
  ws.on('close', () => {
    if (currentRoom) {
      rooms[currentRoom] = rooms[currentRoom].filter(user => user !== username);
      updateRoomList();
    }
    delete users[username];
    onlineUsers = onlineUsers.filter(user => user !== username);  
    broadcastOnlineUsers();  
  });

  // Broadcast a message to all users in a room
  function broadcastMessage(room, message) {
    if (rooms[room]) {
      rooms[room].forEach(user => {
        if (users[user]) {
          users[user].send(JSON.stringify(message));
        }
      });
    }
  }

  // Update the room list for all clients
  function updateRoomList() {
    const roomList = Object.keys(rooms).map(room => room);
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'roomsList', rooms: roomList }));
      }
    });
  }

  // Broadcast the list of online users to all clients
  function broadcastOnlineUsers() {
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'onlineUsers', users: onlineUsers }));
      }
    });
  }

  console.log('New client connected');
});

console.log('WebSocket server is running on ws://localhost:3000');
