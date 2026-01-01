import React, { useRef, useState } from "react";

const useWebSocket = () => {
  const [messages, setMessages] = useState([]);
  const client = useRef(null);
  return <div>usewebSocket</div>;
};

export default useWebSocket;
