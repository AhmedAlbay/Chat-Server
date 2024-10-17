const express = require("express");
var http = require("http");
const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);
var io = require("socket.io")(server);

// Middleware
app.use(express.json());

var clients = {};
const routes =require("./routes");
app.use("/routes", routes);
app.use("/uploads", express.static("uploads"));

io.on("connection", (socket) => {
  console.log("Connected");
  console.log(socket.id, "has joined");

  socket.on("signin", (id) => {
    console.log(id);
    clients[id] = socket;
    console.log(clients);
  });

  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    let targetSocket = clients[msg.targetId];
    if (targetSocket) {
      targetSocket.emit("message", msg);
      console.log(`Message sent to ${msg.targetId}`);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
