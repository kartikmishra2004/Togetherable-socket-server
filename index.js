const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", 'https://togetherable.vercel.app'],
        methods: ["GET", "POST"]
    }
});
app.use(cors());

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("sendMessage", (message) => {
        socket.broadcast.emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
    });
});


server.listen(5000, () => console.log("Server running on port 5000"));