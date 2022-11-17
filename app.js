const express = require("express");

let Rooms = [];

let app = express();
app.use(express.json());
const port = 2534;
app.post("/", (req, res) => {
  Rooms.forEach((element) => {
    if (element.id == req.body.id) {
      element.playercount = Number(req.body.playercount);
      res.json({
        Respons: { faild: false, playercount: Number(req.body.playercount) },
      });
      return;
    }
  });
  try {
    res.json({ Respons: { faild: true } });
  } catch {}
});

app.put("/", (req, res) => {
  let roomid = makeid(6);
  while (!isuniqueid(roomid)) {
    roomid = makeid(6);
  }

  Rooms.push({
    ip: req.body.ip,
    port: req.body.port,
    id: roomid,
    playercount: Number(req.body.playercount),
  });
  req.body.ip;
  res.json({ Respons: { faild: false, id: roomid } });
  console.log(Rooms);
});

app.delete("/", (req, res) => {
  console.log("want to delete" +req.body);
  Rooms.filter((ele) => {
    if (ele.ip != req.body.ip || ele.id != req.body.id) {
      return ele;
    }
    console.log("Deleted");
  });
  res.json({ Respons: { faild: false } });
});

app.get("/", (req, res) => {
  let count = 0;
  let ip = "";
  let port = "";
  if (Rooms.length <= 0) {
    res.send("no Availabe Rooms");
    return;
  }
  Rooms.forEach((element) => {
    console.log(element.ip);
    if (element.playercount >= count) {
      count = element.playercount;
      ip = element.ip;
      port = element.port;
      console.log(element);
    }
  });
  res.json({ Respons: { faild: false, ip: ip, port: port } });
});

app.listen(port, () => {
  console.log(`Lisnting on port ${port}`);
});

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function isuniqueid(id) {
  let unique = true;
  Rooms.forEach((element) => {
    if (element.id == id) {
      unique = false;
      return;
    }
  });
  return unique;
}
