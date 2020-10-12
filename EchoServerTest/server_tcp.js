const net = require("net");

const serverSocket = new net.Server();

serverSocket.on("connection", (socket) => {
  console.log(`${socket.address().address} connected`);

  socket.on("data", (data) => {
    console.log(`received data: ${data}`);

    socket.write(data.toString().toUpperCase());
  });

  socket.on("end", (err) => console.log("client connection ended"));
  socket.on("error", (err) => console.log(err.toString()));
  socket.on("close", () => console.log("close"));
});

serverSocket.listen(3000, () => console.log("serve is running"));
serverSocket.on("error", (err) => console.log(err.toString()));
