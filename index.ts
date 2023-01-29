import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from "./routes/User.route";
import RoomRoute from "./routes/Room.route";
import MessageRoute from "./routes/Message.route";

dotenv.config();

const app = express();

const server = require("http").createServer(app);

let activeUsers = [];

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  socket.on("add-user-active", (user) => {
    console.log("user", user);
    if (!activeUsers.some((item) => item.id === user.id)) {
      activeUsers.push({ ...user, socketId: socket.id });
    }

    io.emit("get-user-active", activeUsers);
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((item) => item.socketId !== socket.id);

    io.emit("get-user-active", activeUsers);
  });

  socket.on("send-message-cr2", (data) => {
    const currentRecieve = activeUsers.find(
      (item) => item.id === data.receiveId
    );
    if (currentRecieve) {
      socket
        .to(currentRecieve.socketId)
        .emit("get-new-message-cr2", data.roomMessage);
    }
  });

  socket.on("create-room-2", (data) => {
    const currentReceive = activeUsers.find(item => item.id === data.receiveId);
    if(currentReceive){
      socket.to(currentReceive.socketId).emit("get-new-room-cr2", data.data);
    }
  });
});

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 5151;

app.get("/api", (req, res) => {
  res.send("Server social web by datisekai is running!!!!!!!!");
});

app.use("/api/user", UserRoute);
app.use("/api/room", RoomRoute);
app.use("/api/message", MessageRoute);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
