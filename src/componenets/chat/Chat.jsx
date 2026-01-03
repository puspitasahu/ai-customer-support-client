import React, { useState, useEffect, useRef } from "react";
import useStompWebSocket from "./hook/useStompWebSocket";

const Chat = () => {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [waitingForAI, setWaitingForAI] = useState(false);
  const messageRef = useRef(null);

  const { messages: wsMessages } = useStompWebSocket(sessionId);

  useEffect(() => {
    let chatId = localStorage.getItem("sessionId");
    if (!chatId) {
      chatId = crypto.randomUUID();
      localStorage.setItem("sessionId", chatId);
    }
    setSessionId(chatId);
  }, []);

  useEffect(() => {
    if (!wsMessages || wsMessages.length === 0) return;

    setMessages((prev) => {
      const newMsgs = wsMessages.filter(
        (wsMsg) =>
          !prev.some(
            (msg) => msg.content === wsMsg.content && msg.role === wsMsg.role
          )
      );

      if (newMsgs.length > 0) {
        setWaitingForAI(false);
      }

      return [...prev, ...newMsgs];
    });
  }, [wsMessages]);

  const chatAI = async () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);

    setMessage("");
    setWaitingForAI(true);

    try {
      // backend / websocket will respond
      const response = await sendMessage(sessionId.message);
      setMessage((prev) => [
        [...prev, { role: "assistant", content: response }],
      ]);
      setWaitingForAI(false);
    } catch (error) {
      console.error("Error sending message", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error sending message" },
      ]);
      setWaitingForAI(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enetr" && !e.shiftKey) {
      e.preventDeafualt();
      chatAI();
    }
  };

  return (
    <div>
      <h2>Chat</h2>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
      />

      <button onClick={chatAi}>Send</button>

      {waitingForAI && <p>AI is typing...</p>}
    </div>
  );
};

export default Chat;
