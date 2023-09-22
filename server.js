const express = require("express");
const app = express();

app.use(express.static("src"));

const http = require("http").Server(app);
const serverSocket = require("socket.io")(http);
const port = 8000;

http.listen(port, () => {
  console.log(`Server started port: ${port}`);
});
app.get("/", (req, resp) => {
  resp.sendFile(__dirname + "/index.html");
});

serverSocket.on("connection", (socket) => {
  console.log(`Cliente conectado ${socket.id}`);
  socket.on("chat msg", (msg) => {
    console.log(`Msg recebida do cliente ${socket.id}: ${msg}`);
    serverSocket.emit("chat msg", msg);
  });
});
