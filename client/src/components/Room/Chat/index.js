import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { FiSend } from "react-icons/fi";

import Input from "../../util/Input";
import useInput from "../../../hooks/useInput";

const StyledContainer = styled.div`
  height: 100%;
  width: 300px;
  transform: ${(props) => (props.open ? "translateX(0)" : "translateX(300px)")};
  background-color: ${(props) => props.theme.colors.lightGrey};
  transition: all 0.2s;
`;

const Header = styled.div`
  width: 100%;
  padding: 10px 0;
  border-bottom: ${(props) => `solid 1px ${props.theme.colors.paper}`};
  border-left: ${(props) => `solid 1px ${props.theme.colors.paper}`};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h2`
  font-size: 25px;
  text-align: center;
  vertical-align: middle;
`;

const MessagesContainer = styled.div`
  padding: 10px;
  height: ${(props) =>
    `calc(100% - ${props.chatFormHeight}px - ${props.topBarHeight}px)`};
  max-height: ${(props) => `calc(100% - ${props.chatFormHeight}px)`};
  overflow: auto;
  width: 100%;
  display: block;
`;

const ChatForm = styled.form`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  > *:not(:last-child) {
    margin-right: 10px;
  }
  border-top: ${(props) => `solid 1px ${props.theme.colors.paper}`};
`;

const SendBtn = styled.button`
  outline: none;
  border: none;
  color: ${(props) => props.theme.colors.blue.main};
  background: transparent;
  font-size: 1.2rem;
  transition: all 0.3s;
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.blue.light};
  }
`;

const Message = styled.div``;

const MessageContent = styled.p`
  background-color: ${(props) => props.theme.colors.blue.light};
  font-size: 0.9rem;
  border-radius: 5px;
  padding: 2px 5px;
  display: inline-block;
  max-width: 100%;
  word-wrap: break-word;
`;

const MessageAuthor = styled.p`
  color: ${(props) => props.theme.colors.white};
  font-size: 0.7rem;
  margin-bottom: 5px;
`;

const CloseButton = styled.button`
  outline: none;
  font-size: 0.9rem;
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.blue.light};
`;

export default function Chat({
  name,
  roomId,
  socket,
  topBarHeight,
  setTopBarHeight,
  chatOpen,
  setChatOpen,
}) {
  const [messages, setMessages] = useState([]);
  const [chatFormHeight, setChatFormHeight] = useState(0);
  const chatBox = useInput("");

  const chatForm = useCallback((node) => {
    if (!node) return;
    setChatFormHeight(node.getBoundingClientRect().height);
  }, []);

  const chatHeader = useCallback((node) => {
    if (!node) return;

    setTopBarHeight(node.getBoundingClientRect().height);
  }, []);

  // const useElHeightCallback = (setter) => {
  //   const element = useCallback((node) => {
  //     if (!node) return;
  //     setter(node.getBoundingClientRect().height);
  //   });
  // };

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
    chatBox.setValue("");
  };

  const renderChatMessages = () => {
    if (messages.length === 0) {
      return null;
    }

    return messages.map((mes, i) => (
      <Message key={i}>
        <MessageAuthor>{mes.name}:</MessageAuthor>
        <MessageContent>{mes.message}</MessageContent>
      </Message>
    ));
  };

  return (
    <StyledContainer open={chatOpen}>
      <Header ref={chatHeader}>
        <Heading>
          {/* <HiOutlineChat color="#7289DA" /> Chat */}
          Chat
        </Heading>
      </Header>
      <MessagesContainer
        topBarHeight={topBarHeight}
        chatFormHeight={chatFormHeight}
      >
        {renderChatMessages()}
      </MessagesContainer>
      <ChatForm ref={chatForm} onSubmit={handleSubmit}>
        <Input value={chatBox.value} onChange={chatBox.onChange} />
        <SendBtn>
          <FiSend color="#7289DA" />
        </SendBtn>
      </ChatForm>
    </StyledContainer>
  );
}
