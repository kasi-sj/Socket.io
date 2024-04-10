import React from "react";
import { useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

const MessageForm = () => {
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const sendMessage = (text) => {
    socket.emit("message", text , room);
    setMessages([...messages, text]);
    console.log(messages);
  };
  const joinRoom = (room) => {
    setRoom(room);
    socket.emit("joinRoom", room);
  }
  socket.on("message", (message) => {
    setMessages([...messages, message]);
  });
  socket.on("connect", () => {
    console.log("New client connected");
    console.log(socket.id);
  });
  return (
    <div
      style={{
        border: "1px solid black",
        width: "80%",
        margin: "0 auto",
        marginTop: "50px",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        MessageForm
      </h1>
      <div
        style={{
          border: "1px solid black",
          height: "500px",
          width: "90%",
          margin: "0 auto",
        }}
      >
        {messages.map((message, i) => (
          <p key={i}>{message}</p>
        ))}
      </div>
      <div
        style={{
          width: "90%",
          margin: "0 auto",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          <input type="text" />
          <input
            type="button"
            value="Send Message"
            style={{
              marginLeft: "20px",
              width: "100px",
            }}
            onClick={(e) => sendMessage(e.target.previousSibling.value)}
          />
        </div>
        <div
          style={{
            width: "100%",
          }}
        >
          <input type="text" />
          <input
            type="button"
            placeholder=""
            value="join room"
            style={{
              marginLeft: "20px",
              width: "100px",
            }}
            onClick={(e) => joinRoom(e.target.previousSibling.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
