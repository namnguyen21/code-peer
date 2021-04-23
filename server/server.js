const express = require("express");
const app = express();
app.use(express.json());
const server = require("http").createServer(app);

const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("join-room", ({ roomId, userId, name }) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", { userId, name });
  });

  socket.on("chat-send", (data) => {
    socket.to(data.roomId).emit("chat-receive", data);
  });
});

server.listen(3001, () => {
  console.log("SERVER NOW LISTENING ON PORT 3001");
});
