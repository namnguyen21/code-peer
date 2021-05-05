const express = require("express");
const app = express();
app.use(express.json());
const server = require("http").createServer(app);
const mysql = require("mysql2/promise");
const { v4: uuid } = require("uuid");
const cors = require("cors");
require("dotenv").config();

const redis = require("redis");

const redisClient = redis.createClient();
redisClient.on("error", (err) => {
  console.log(err);
});

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

app.use("/room", require("./routes/room"));

// app.get("/room/create", async (req, res) => {
//   // const newID = uuid();

//   // const connection = await mysql.createConnection({
//   //   host: process.env.DATABASE_HOST,
//   //   user: process.env.DATABASE_USERNAME,
//   //   port: 3306,
//   //   database: "peer",
//   //   password: process.env.DATABASE_PASSWORD,
//   // });
//   // const [rows, fields] = await connection.execute(
//   //   `SELECT * FROM rooms WHERE uuid = "${newID}"`
//   // );
//   // if (rows.length === 0) {
//   //   const newRoom = await connection.execute(
//   //     `INSERT INTO rooms (uuid) VALUES ("${newID}")`
//   //   );
//   //   res.json({ roomID: newID });
//   // }

//   const newID = uuid();
//   redisClient.set(`members:${newID}`, 0, (err, results) => {
//     if (err) {
//       console.log(err);
//       res.sendStatus(500);
//     } else {
//       res.json({ roomID: newID });
//     }
//   });
// });

// app.get("/room/join/:id", (req, res) => {
//   const { id } = req.params;
//   redisClient.exists(`members:${id}`, (err, result) => {
//     if (err) throw err;
//     if (result === 0) {
//       res.json({ error: "Room does not exist." });
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });

server.listen(3001, () => {
  console.log("SERVER NOW LISTENING ON PORT 3001");
});
