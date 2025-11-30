import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";

export default function App() {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("")

  console.log(messages);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };
  const joinRoom = (e) =>{
    e.preventDefault() 
    socket.emit("join-room", roomName)
    setRoomName("")
  }

  useEffect(() => {
    socket.on("connect", () => {
      setId(socket.id);
      console.log(`Connected to server with ID: ${socket.id}`);
    });

    socket.on("welcome", (msg) => {
      console.log(msg);
    });
    socket.on("recieveMsg", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="p" component="div" gutterBottom>
        Your Id : {socketId}
      </Typography>
      <form onSubmit={joinRoom}>
        <h5>Join Room</h5>
         <TextField
          id="outlined-basics"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          label="Room Name"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Join
        </Button>

      </form>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basics"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          label="Message"
          variant="outlined"
        />

        <TextField
          id="outlined-basics"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          label="Room"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
      <Stack>
        {messages.map((m, i) => (
          <Typography key={i} variant="p" component="div" gutterBottom>
            {m}
          </Typography>
        ))}
      </Stack>
    </Container>
  );
}
