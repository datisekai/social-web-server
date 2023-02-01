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
  //User online
  socket.on("add-user-active", (user) => {
    if (!activeUsers.some((item) => item.id === user?.id)) {
      activeUsers.push({ ...user, socketId: socket.id });
    }
    io.emit("get-user-active", activeUsers);
  });

  //Hủy kết nối
  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((item) => item.socketId !== socket.id);

    io.emit("get-user-active", activeUsers);
  });

  //Gửi tin nhắn chat 2 người
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

  //Tạo nhóm chat 2 người
  socket.on("create-room-2", (data) => {
    const currentReceive = activeUsers.find(
      (item) => item.id === data.receiveId
    );
    if (currentReceive) {
      socket.to(currentReceive.socketId).emit("get-new-room-cr2", data.data);
    }
  });

  // Thu hồi tin nhắn
  socket.on(
    "recall-message",
    (data: { receiveId: number; messageId: number }) => {
      const currentReceive = activeUsers.find(
        (item) => item.id === data.receiveId
      );
      if (currentReceive) {
        socket.to(currentReceive.socketId).emit("get-recall-message", data);
      }
    }
  );

  //Thả react tin nhán
  socket.on(
    "react-message",
    (data: {
      messageId: number | string;
      userId: number;
      react: string;
      id: number | string;
      receiveId: number;
    }) => {
      const currentReceive = activeUsers.find(
        (item) => item.id === data.receiveId
      );
      if (currentReceive) {
        socket.to(currentReceive.socketId).emit("get-react-message", data);
      }
    }
  );

  socket.on("seen-message", (data: { receiveId: number, listMessage:number[] }) => {
    const currentReceive = activeUsers.find(
      (item) => item.id === data.receiveId
    );
    if (currentReceive) {
      console.log("===============================Send to client seen mesage=============")
      socket.to(currentReceive.socketId).emit("get-seen-message", data);
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
