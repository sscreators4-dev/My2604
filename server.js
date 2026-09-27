const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const PASSWORD = process.env.CHAT_PASSWORD || "2604";

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.on("auth", (password, reply) => {
    const ok = password === PASSWORD;
    socket.data.authenticated = ok;
    if (typeof reply === "function") reply({ ok });
  });

  socket.on("chat:message", (data, reply) => {
    if (!socket.data.authenticated) {
      if (typeof reply === "function") reply({ ok:false, error:"Locked" });
      return;
    }

    const text = String(data?.text || "").trim();
    if (!text || text.length > 2000) return;

    const message = {
      id: Date.now() + "-" + Math.random().toString(36).slice(2),
      text,
      time: Date.now(),
      sender: socket.id
    };

    io.emit("chat:message", message);
    if (typeof reply === "function") reply({ ok:true });
  });

  socket.on("chat:typing", () => {
    if (socket.data.authenticated) socket.broadcast.emit("chat:typing");
  });

  socket.on("chat:stoptyping", () => {
    if (socket.data.authenticated) socket.broadcast.emit("chat:stoptyping");
  });
});

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Private chat running on port ${PORT}`);
});