const express = require("express");
const WebSocket = require("ws");
const app = express();
app.use(express.json());
const server = require("http").createServer(app);
const setupWSConnection = require("y-websocket/bin/utils").setupWSConnection;

const wss = new WebSocket.Server({ server });

wss.on("connection", setupWSConnection);

//const io = require("socket.io")(server, { cors: { origin: "*" } });

/*io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected");
  });
  socket.on("update-editor", ({ roomId, value }) => {
    socket.to(roomId).emit("update", value);
  });
});
*/
server.listen(3001, () => {
  console.log("SERVER NOW LISTENING ON PORT 3001");
});
