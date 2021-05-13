import { useParams, Redirect } from "react-router-dom";
import { useState, useRef } from "react";
import styled from "styled-components";
import { HiOutlineChat } from "react-icons/hi";

import CodeEditor from "./CodeEditor";
import VoiceAndVideo from "./VoiceAndVideo";
import Chat from "./Chat";
import Modal from "./Modal";
import useInput from "../../hooks/useInput";
import useValidRoom from "../../hooks/useValidRoom";

const Container = styled.main`
  height: 100vh;
  max-height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  max-width: 100vw;
  overflow-x: hidden;
  overflow: hidden;
  position: relative;
`;

const CodeContainer = styled.div`
  width: 100%;
  transition: all 0.2s;
  height: calc(100vh - 60px);
`;

const ChatButton = styled.button`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.blue.main};
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 100px;
  right: 50px;
  color: ${(props) => props.theme.colors.white};
  font-size: 35px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: ${(props) => props.theme.colors.blue.light};
  }
`;

export default function Index() {
  const { id: roomId } = useParams();
  const [socket, setSocket] = useState();
  const [hasJoined, setHasJoined] = useState(false);
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [myVideoStream, setMyVideoStream] = useState();
  const [myAudioStream, setMyAudioStream] = useState();
  const [backgroundIsLight, setBackgroundIsLight] = useState(true);
  const [chatOpen, setChatOpen] = useState(true);
  const name = useInput("");
  const { isValidRoom, color } = useValidRoom(roomId);

  if (isValidRoom === null) {
    return <Container></Container>;
  }

  if (isValidRoom === false) {
    return <Redirect to="/404" />;
  }

  if (!hasJoined)
    return (
      <Modal name={name} hasJoined={hasJoined} setHasJoined={setHasJoined} />
    );

  return (
    <Container>
      <CodeContainer chatOpen={chatOpen}>
        <CodeEditor
          socket={socket}
          setBackgroundIsLight={setBackgroundIsLight}
          chatOpen={chatOpen}
          topBarHeight={topBarHeight}
          roomId={roomId}
          name={name.value}
          color={color}
        ></CodeEditor>
      </CodeContainer>

      <Chat
        color={color}
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
        topBarHeight={topBarHeight}
        setTopBarHeight={setTopBarHeight}
        socket={socket}
        name={name.value}
        roomId={roomId}
      />

      <VoiceAndVideo
        color={color}
        myAudioStream={myAudioStream}
        setMyAudioStream={setMyAudioStream}
        myVideoStream={myVideoStream}
        setMyVideoStream={setMyVideoStream}
        socket={socket}
        setSocket={setSocket}
        hasJoined={hasJoined}
        name={name.value}
        roomId={roomId}
        backgroundIsLight={backgroundIsLight}
        topBarHeight={topBarHeight}
      />
      <ChatButton onClick={() => setChatOpen((isOpen) => !isOpen)}>
        <HiOutlineChat />
      </ChatButton>
    </Container>
  );
}
