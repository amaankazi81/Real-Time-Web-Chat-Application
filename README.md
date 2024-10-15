**Real-Time Chat Application**

This is a real-time chat application built with HTML, CSS, JavaScript, and WebSockets. The frontend is hosted on Vercel, while the WebSocket server is hosted locally. Users can join chat rooms, send messages, and view the list of online users in real time.


**Features :**

Real-time messaging using WebSockets

Create or join chat rooms dynamically

View online users and the count of active users in the current room

Send messages with basic text formatting (bold, italics, links)

Responsive and user-friendly design


**Technologies Used :**

Frontend:
HTML
CSS
JavaScript
WebSocket API

Backend:
Node.js
WebSocket Server


**How It Works**

When a user visits the site, they are prompted to enter a username.

![11](https://github.com/user-attachments/assets/5f98489c-ae68-4807-864a-baa7c15257e3)


Users can create or join chat rooms by entering the room name.

![12](https://github.com/user-attachments/assets/7f5ecbe0-667c-4bdf-b9b6-e7fad943ec5e)


Messages are broadcast in real-time to all users in the same room.

![13](https://github.com/user-attachments/assets/9dacac8d-175c-4369-9c5f-951f18a353e9)


Users can view a list of online users and the current count in the room.

![14](https://github.com/user-attachments/assets/d8677d20-c24b-42b7-80f6-cd52b6ef4411)



**Project Setup**

**Prerequisites**

To run the project locally, you need the following installed:

Node.js

Git

**Steps to Run Locally**

Clone the repository:


git clone https://github.com/amaankazi81/Real-Time-Web-Chat-Application.git

Navigate to the project folder:


cd Real-Time-Web-Chat-Application

Install dependencies (for the WebSocket server):


npm install

Run the WebSocket server locally:


node server.js

The WebSocket server will be running at ws://localhost:3000.

Open the index.html file in your browser, or use a local server like Live Server.

**Hosting**

Frontend: Hosted on vercel.

Backend: WebSocket server host on local or other cloud platform.

Frotend Demo : https://real-time-web-chat-application.vercel.app/

Make sure the WebSocket server URL in app.js points to the correct hosted URL. 

Update this line:

javascript (app.js, ln:15)

const socket = new WebSocket('wss://your-websocket-server-url');


Issues and Contributions

If you find any issues with the project, please open an issue in this repository. Contributions are welcome! Feel free to fork the project and submit a pull request with any enhancements or bug fixes.

License

This project is licensed under the MIT License - see the LICENSE file for details.
