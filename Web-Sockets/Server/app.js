import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();
const server = createServer(app);
const PORT = 3000;
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use((socket, next) =>{
  if(true) next();
})

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("message", (data) =>{
    console.log(data)
    io.to(data.room).emit("recieveMsg", data.message)
  })
  socket.on("join-room", (room) =>{
    socket.join(room)
  })
  socket.on("disconnect", () => {
    console.log(`user dissconnect ${socket.id}`);
  });
});

app.get("/", (req, res) => {
  res.send("Hello from Express Server");
});


server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
