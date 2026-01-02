import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJs from "sockjs-client";

const useStompWebSocket = (sessionId) => {
  const [messages, setMessages] = useState([]);
  const clientRef = useRef(null);

  useEffect(
    (sessionId) => {
      if (!sessionId) return;

      const socketUrl = "http://localhost:9292/ws-chat";

      const client = new Client({
        webSocketFactory: () => new SockJs(socketUrl),
        reconnectDelay: 5000,
        debug: (str) => {
          console.log("[STOMP", str);
        },
      });

      client.onConnect = () => {
        console.log("Connected to webSocket");
        client.subscribe(`/topic/message/${sessionId}`, (message) => {
          if (message.body) {
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: message.body },
            ]);
          }
        });
      };

      client.onStompError = (frame) => {
        console.error("Broker reported error : " + frame.headers["messages"]);
        console.error("Additional Details : " + frame.body);
      };
      client.activate();
      clientRef.current = client;

      return () => {
        client.deactivate();
      };
    },
    [sessionId]
  );
  return { messages };
};

export default useStompWebSocket;
