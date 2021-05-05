import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FiSend } from "react-icons/fi";

import Input from "../../util/Input";
import useInput from "../../../hooks/useInput";

const ChatContainer = styled.div`
  width: 300px;
  background-color: ${(props) => props.theme.colors.lightGrey};
  position: absolute;
  bottom: 0;
  right: 150px;
  opacity: ${(props) => (props.chatOpen ? "1" : "0")};
  transform: ${(props) =>
    props.chatOpen ? "translateY(0)" : "translateY(100%)"};
  transition: opacity 0.4s, transform 0.2s;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  -webkit-box-shadow: 0px -1px 38px -11px #3a3a3a;
  box-shadow: 0px -1px 38px -11px #3a3a3a;
`;

const ChatHeader = styled.div`
  height: 45px;
  background: ${(props) => props.theme.colors.paper};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatHeading = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
  background: transparent;
`;

const MessageContainer = styled.div`
  height: 300px;
  max-height: 300px;
  overflow-y: auto;
  width: 100%;
  background: transparent;
  padding: 10px;
  >*:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const ChatBox = styled.div`
  height: 55px;
  width: 100%;
  background: ${(props) => props.theme.colors.paper};
`;

const ChatForm = styled.form`
  height: 100%;
  width: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
`;

const SendButton = styled.button`
  margin-left: 10px;
  outline: none;
  border: none;
  background: transparent;
  color: ${(props) => props.theme.colors.blue.main};
  font-size: 1.4rem;
`;

const Message = styled.div`
  margin-left: auto;
`;

const MessageAuthor = styled.p`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 5px;
`;

const MessageContent = styled.p`
  display: inline-block;
  max-width: 100%;
  word-wrap: break-word;
  background-color: ${(props) => props.color};
  border-radius: 5px;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.white};
  padding: 2px 5px;
`;

export default function Chat({
  name,
  roomId,
  socket,
  topBarHeight,
  setTopBarHeight,
  chatOpen,
  setChatOpen,
  color,
}) {
  const [messages, setMessages] = useState([]);
  const chatBox = useInput("");
  const messagesContainerRef = useRef();
  console.log(color);
  // incoming message listener
  useEffect(() => {
    if (!socket) return;
    socket.on("chat-receive", (messageInfo) => {
      setMessages((messages) => [...messages, messageInfo]);
    });
  }, [socket]);

  // keep chat container scrolled to bottom
  useEffect(() => {
    if (!chatOpen || messagesContainerRef.current === undefined) return;
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [chatOpen, messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chatBox.value.trim().length === 0) return;
    const newMessage = { roomId, name, message: chatBox.value, color };
    socket.emit("chat-send", newMessage);
    setMessages((messages) => [...messages, newMessage]);
    chatBox.setValue("");
  };
  const renderChatMessages = () => {
    if (messages.length === 0) {
      return null;
    }

    return messages.map((mes, i) => (
      <Message key={i}>
        <MessageAuthor>{mes.name}:</MessageAuthor>
        <MessageContent color={mes.color}>{mes.message}</MessageContent>
      </Message>
    ));
  };

  return (
    <ChatContainer chatOpen={chatOpen}>
      <ChatHeader>
        <ChatHeading>Chat</ChatHeading>
      </ChatHeader>
      <MessageContainer ref={messagesContainerRef}>
        {renderChatMessages()}
      </MessageContainer>
      <ChatBox>
        <ChatForm onSubmit={handleSubmit}>
          <Input value={chatBox.value} onChange={chatBox.onChange} />
          <SendButton onClick={handleSubmit}>
            <FiSend />
          </SendButton>
        </ChatForm>
      </ChatBox>
    </ChatContainer>
  );
}
