const router = require("express").Router();
const redis = require("redis");
const { v4: uuid } = require("uuid");
const { promisify } = require("util");
const e = require("cors");

const HOURS_TILL_EXPIRATION = 24;

const client = redis.createClient();

client.on("error", (err) => {
  console.log(err);
});

const set = promisify(client.set).bind(client);
const setex = promisify(client.setex).bind(client);
const exists = promisify(client.exists).bind(client);
const increment = promisify(client.incr).bind(client);

const colors = ["#7289da", "#9256da",'#317e54','#2272a4','#a4569a','#637983'];

// creating a new room
router.get("/create", async (req, res) => {
  const newID = uuid();
  try {
    const results = await setex(
      `members:${newID}`,
      3600 * HOURS_TILL_EXPIRATION,
      0
    );
    res.json({ roomID: newID });
  } catch (err) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
  }
});

router.get("/join/:roomID", async (req, res) => {
  const { roomID } = req.params;

  try {
    const result = await exists(`members:${roomID}`);
    console.log(result);
    if (result === 0) {
      res.json({ error: "Not a valid room." });
    } else {
      const numOfMembers = await increment(`members:${roomID}`);
      const color = colors[(numOfMembers % 6) - 1];
      console.log(color);
      res.json({ color: color });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  // client.exists(`members:${roomID}`, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     res.sendStatus(500);
  //   } else {
  //     if (result === 0) {
  //       // no room
  //       res.json({ error: "Not a valid room." });
  //     } else {
  //       res.sendStatus(200);
  //     }
  //   }
  // });
});

module.exports = router;
