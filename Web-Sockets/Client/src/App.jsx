import React from 'react'
import { useEffect } from 'react';
import {io} from "socket.io-client";

export default function App() {
  const socket = io("http://localhost:3000");

  useEffect(() =>{
    socket.on("connect", () =>{
      console.log(`Connected to server with ID: ${socket.id}`);
    });
  })

  socket.on('welcome', (m) =>{
    console.log(m)
  })
  return (
    <div>App</div>
  )
}
