let username = '';  
let isEventListenerAttached = false;  

// DOM elements
const messageInput = document.getElementById('message-input');
const sendMessageButton = document.getElementById('send-message-btn');
const messagesContainer = document.getElementById('messages-container');
const roomList = document.getElementById('room-list');
const roomNameDisplay = document.querySelector('#room-name span');  
const newRoomInput = document.getElementById('new-room-input');
const createRoomButton = document.getElementById('create-room-btn');
const usersCountDisplay = document.getElementById('users-count');  
const usersListContainer = document.getElementById('users-list');  

const socket = new WebSocket('ws:https://amaankazi81.github.io/Web-Chat-Application/');

// WebSocket open connection event
socket.addEventListener('open', () => {
  console.log('Connected to WebSocket server');
  
  // Prompt for username after WebSocket is open
  while (!username) {
    username = prompt('Enter your username:');
  }
  socket.send(JSON.stringify({ type: 'setUsername', username }));
  

  if (!isEventListenerAttached) {
    attachEventListeners();
    isEventListenerAttached = true; 
  }
});

// Log WebSocket connection closure
socket.addEventListener('close', () => {
    console.log('WebSocket connection closed');
});

// Log WebSocket errors
socket.addEventListener('error', error => {
    console.error('WebSocket error:', error);
});

// Function to attach event listeners
function attachEventListeners() {
  console.log('Attaching event listeners...');

  // Function to format messages (e.g., bold, italics, links)
  function formatMessage(message) {
    return message
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  
      .replace(/\*(.*?)\*/g, '<em>$1</em>')              
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');  
  }

  // Sending messages (Attach the event listener once)
  sendMessageButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
      const formattedMessage = formatMessage(message);
      const timestamp = new Date().toLocaleTimeString();
      console.log(`Sending message: ${formattedMessage} at ${timestamp}`);  
      socket.send(JSON.stringify({ type: 'message', message: formattedMessage, user: username, time: timestamp }));
      messageInput.value = '';
    }
  });

  // Handle creating/joining rooms 
  createRoomButton.addEventListener('click', () => {
    const room = newRoomInput.value;
    if (room) {
      console.log(`Joining room: ${room}`);  
      socket.send(JSON.stringify({ type: 'joinRoom', room }));
      roomNameDisplay.textContent = room;
      newRoomInput.value = '';  
    }
  });

  // Receiving messages (Handle incoming messages only once)
  socket.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    console.log(`Received message from server: `, data);  

    // Handle incoming chat messages
    if (data.type === 'message') {
      const messageElement = document.createElement('div');
      messageElement.innerHTML = `<strong>${data.user}</strong> <em>(${data.time})</em>: ${data.message}`;
      messagesContainer.appendChild(messageElement);
      scrollToBottom();  
    }

    // Handle online users update
    if (data.type === 'onlineUsers' && Array.isArray(data.users)) {
      usersListContainer.innerHTML = '';  
      data.users.forEach(user => {
        const userElement = document.createElement('li');
        userElement.textContent = user;
        usersListContainer.appendChild(userElement);
      });
      usersCountDisplay.textContent = data.users.length;  
    }

    // Handle room list updates
    if (data.type === 'roomsList') {
      roomList.innerHTML = '';  
      data.rooms.forEach(room => {
        const roomElement = document.createElement('li');
        roomElement.textContent = room;
        roomElement.addEventListener('click', () => {
          console.log(`Switching to room: ${room}`);  
          socket.send(JSON.stringify({ type: 'joinRoom', room }));
          roomNameDisplay.textContent = room;
        });
        roomList.appendChild(roomElement);
      });
    }
  });
}

// Helper function to scroll to the bottom of the message container
function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}



