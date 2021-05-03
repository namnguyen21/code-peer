const { create } = require("domain");
const express = require("express");
const { connect } = require("http2");
const app = express();
app.use(express.json());
const server = require("http").createServer(app);
const mysql = require("mysql2/promise");
const { v4: uuid } = require("uuid");
const cors = require("cors");
require("dotenv").config();

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


app.use(cors());

app.get("/room/create", async (req, res) => {
  const newID = uuid();

  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    port: 3306,
    database: "peer",
    password: process.env.DATABASE_PASSWORD,
  });
  const [rows, fields] = await connection.execute(
    `SELECT * FROM rooms WHERE uuid = "${newID}"`
  );
  if (rows.length === 0) {
    const newRoom = await connection.execute(
      `INSERT INTO rooms (uuid) VALUES ("${newID}")`
    );
    res.json({ roomID: newID });
  }
});

server.listen(3001, () => {
  console.log("SERVER NOW LISTENING ON PORT 3001");
});
