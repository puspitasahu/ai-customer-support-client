import React, { useState, useEffect, useRef } from "react";
import useStompWebSocket from "./hook/useStompWebSocket";

const Chat = () => {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [waitingForAI, setWaitingForAI] = useState(false);
  const messagesEndref = useRef(null);

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
    if (e.key === "Enetr" && !e.shiftKey) {
      e.preventDeafualt();
      chatAI();
    }
  };

  useEffect(() => {
    messagesEndref.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages, waitingForAI]);

  const lastMsg = messages[messages.length - 1];
  const showTyping = waitingForAI && lastMsg && lastMsg.role === "user";

  return (
    <main className="support-page mt-5">
      <main className="main-content">
        <section className="chat-section">
          <div className="chat-container">
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`messages ${
                    messages.role === "user" ? "user" : "assistant"
                  }`}
                >
                  ${msg.content}
                </div>
              ))}

              {showTyping && (
                <div className="ai-typing-indicator">
                  <strong> Customer Support : </strong>
                  <em>is typing ...</em>
                </div>
              )}

              <div ref={messagesEndref}></div>
            </div>
          </div>
        </section>
      </main>
    </main>
  );
};

export default Chat;
