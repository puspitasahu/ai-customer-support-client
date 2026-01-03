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

  /*Generate a session or load sessionId when component mounts */
  useEffect(() => {
    let chatId = localStorage.getItem("sessionId");
    if (!chatId) {
      chatId = crypto.randomUUID();
      localStorage.setItem("sessionId", chatId);
    }
    setSessionId(chatId);
  }, []);

  //combine local messages with the messages from websoket

  useEffect(() => {
    if (!wsMessages) return;

    //fliter out the messages that are already in local messages

    setMessage((prev) => {
        const nwmsgs = wsMessages.filter(
            (wsMsg) =>
                !prev.some(
                    (msg) => msg.content == wsMsg.content && msg.role == wsMsg.role
                )
        );
        if(nwmsgs.length >0)
            setWaitingForAI(false);

        return[...prev,...nwmsgs]
    }

  },[wsMessages])

  const Chat = () =>{
    const chatWithAI = async () =>{
        setMessages((prev) =>
        [...prev,{role:"user",contentmessage}])
        setWaitingForAI(true);
        try{
            const response  =await sendmessage(sessionId.message);
            setMessage((prev)=>[
                [...prev,{role :"assistant",content : response}]
            ]);
        setWaitingForAI(false);
        }catch(error){
            console.error("Error sendimg message",error);
            setMessage((prev) =>[
                [...prev,{role :"assistant",content : "Error sending message"}]
            ]);
        setWaitingForAI(false);

        }
        setMessage("");
    }
  }
  return <div>Chat</div>;
};

export default Chat;
