import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FiSend } from "react-icons/fi";
import axios from "axios";

import Input from "../../util/Input";
import useInput from "../../../hooks/useInput";

const ChatContainer = styled.div`
  width: 300px;
  background-color: ${(props) =>
    props.backgroundIsLight
      ? props.theme.colors.lightGrey
      : props.theme.colors.white};
  position: absolute;
  bottom: 0;
  right: 150px;
  opacity: ${(props) => (props.chatOpen ? "1" : "0")};
  transform: ${(props) =>
    props.chatOpen ? "translateY(0)" : "translateY(100%)"};
  transition: opacity 0.4s, transform 0.2s;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const ChatHeader = styled.div`
  height: 45px;
  background-color: ${(props) =>
    props.backgroundIsLight
      ? props.theme.colors.paper
      : props.theme.colors.lightGrey};
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
  > *:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const ChatBox = styled.div`
  height: 55px;
  width: 100%;
  border: ${(props) =>
    props.backgroundIsLight
      ? `solid 1px ${props.theme.colors.paper}`
      : "solid 1px #ccc"};
  background-color: ${(props) =>
    props.backgroundIsLight
      ? props.theme.colors.paper
      : props.theme.colors.white};
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
  color: ${(props) =>
    props.backgroundIsLight
      ? props.theme.colors.white
      : props.theme.colors.lightGrey};
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
  backgroundIsLight,
  chatOpen,
  setChatOpen,
  color,
}) {
  const [messages, setMessages] = useState([]);
  const chatBox = useInput("");
  const messagesContainerRef = useRef();

  // retrieve all messages on mount
  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await axios.get(
        process.env.NODE_ENV === "development"
          ? `http://localhost:8080/room/${roomId}/chat`
          : process.env.REACT_APP_API_URL + `/room/${roomId}/chat`
      );
      if (data.length > 0) {
        setMessages(data);
      }
    };
    fetchMessages();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (chatBox.value.trim().length === 0) return;
    const newMessage = { roomId, name, message: chatBox.value, color };
    socket.emit("chat-send", newMessage);
    setMessages((messages) => [...messages, newMessage]);
    chatBox.setValue("");
    await axios.post(
      process.env.NODE_ENV === "development"
        ? `http://localhost:8080/room/${roomId}/chat`
        : `${process.env.REACT_APP_API_URL}/room/${roomId}/chat`,
      { message: chatBox.value, name, color }
    );
  };
  const renderChatMessages = () => {
    if (messages.length === 0) {
      return null;
    }

    return messages.map((mes, i) => (
      <Message key={i}>
        <MessageAuthor backgroundIsLight={backgroundIsLight}>
          {mes.name}:
        </MessageAuthor>
        <MessageContent color={mes.color}>{mes.message}</MessageContent>
      </Message>
    ));
  };

  return (
    <ChatContainer backgroundIsLight={backgroundIsLight} chatOpen={chatOpen}>
      <ChatHeader backgroundIsLight={backgroundIsLight}>
        <ChatHeading>Chat</ChatHeading>
      </ChatHeader>
      <MessageContainer
        backgroundIsLight={backgroundIsLight}
        ref={messagesContainerRef}
      >
        {renderChatMessages()}
      </MessageContainer>
      <ChatBox backgroundIsLight={backgroundIsLight}>
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
