import React, { useState, useRef, useEffect } from "react";
import useStompWebSocket from "../hook/useSTOMPWebSocket";

const Chat = () => {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [waitingForAI, setWaitingForAI] = useState(false);
  const messageRef = useRef(null);

  /* Use Stomp WebSocket Hook to recive mesages asychronously from AI (Assistamt) */
  const { messages: wsMessages } = useStompWebSocket(sessionId);

  /*Update messages when new messages are recived from websocket*/
  useEffect(() => {
    let chatId = localStorage.getItem("sessionId");
    if (!chatId) {
      chatId = crypto.randomUUID();
      localStorage.setItem("sessionId", chatId);
    }
    setSessionId(chatId);
  }, []);

  return <div>Chat</div>;
};

export default Chat;
