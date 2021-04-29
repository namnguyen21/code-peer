const express = require("express");
const app = express();
app.use(express.json());
const server = require("http").createServer(app);

const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("join-room", ({ roomId, userId, name }) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", { userId, name });
    socket.on("disconnect", () => {
      socket.to(roomId).emit("user-disconnected", userId);
    });
  });

  socket.on("chat-send", (data) => {
    socket.to(data.roomId).emit("chat-receive", data);
  });

  socket.on("theme-change", ({ roomId, theme }) => {
    socket.to(roomId).emit("theme-change", theme);
  });

  socket.on("mode-change", ({ roomId, mode }) => {
    socket.to(roomId).emit("mode-change", mode);
  });
});

server.listen(3001, () => {
  console.log("SERVER NOW LISTENING ON PORT 3001");
});
