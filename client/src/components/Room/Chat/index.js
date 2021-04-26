import { useState, useEffect } from "react";
import useInput from "../../../hooks/useInput";

export default function Chat({ name, roomId, socket }) {
  const [messages, setMessages] = useState([]);
  const chatBox = useInput("");
  useEffect(() => {
    if (!socket) return;
    socket.on("chat-receive", (messageInfo) => {
      setMessages((messages) => [...messages, messageInfo]);
    });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chatBox.value.trim().length === 0) return;
    const newMessage = { roomId, name, message: chatBox.value };
    socket.emit("chat-send", newMessage);
    setMessages((messages) => [...messages, newMessage]);
  };

  const renderChatMessages = () => {
    if (messages.length === 0) {
      return null;
    }

    return messages.map((mes, i) => (
      <div key={i}>
        <span>{mes.name}: </span>
        <span>{mes.message}</span>
      </div>
    ));
  };

  return (
    <div style={{ height: "500px", width: "200px", backgroundColor: "yellow" }}>
      <form onSubmit={handleSubmit}>
        <input value={chatBox.value} onChange={chatBox.onChange} />
      </form>
      <div>{renderChatMessages()}</div>
    </div>
  );
}
