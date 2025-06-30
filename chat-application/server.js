const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { verify } = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const server = createServer(app);
let hostname = "localhost";
let port = 3001;
const ConservationModel = require("./src/app/api/lib/models/ConservationModel.js");
const dbServerCon = require("./db.js");
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Headers"],
    credentials: true,
  },
  cookie: true,
});
dbServerCon();

let users = {};
io.on("connection", (socket) => {
  if (socket.handshake.headers.cookie) {
    const cookies = socket.handshake.headers.cookie
      .split(";")
      .map((cookie) => cookie.trim());
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("__token="));
    const token = tokenCookie ? tokenCookie.split("=")[1] : null;
    const userId = token ? verify(token, process.env.JWT_SECRET_KEY)._id : null;
    if (userId) {
      users[userId] = socket.id;
    }

    socket.on("message", (data) => {
      const userId = Object.keys(users).find((key) => users[key] === socket.id);
      socket.emit("sender", {
        message: data.inputData,
        senderId: userId,
        receiverId: data.currentChatUserId,
      });
      ConservationModel.create({
        message: data.inputData,
        senderId: userId,
        receiverId: data.currentChatUserId,
      });
      const senderId = users[data.currentChatUserId];
      socket.broadcast.to(senderId).emit("recievedMsg", {
        message: data.inputData,
        senderId: userId,
        receiverId: data.currentChatUserId,
      });
    });
  }

  socket.on("disconnect", () => {
    delete users[socket.id];
    console.log("User disconnected", socket.id);
    console.log("users", users);
  });
});

server.listen(3001, () => {
  console.log(`Ready on http://${hostname}:${port}`);
});
