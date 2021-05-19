import { useParams, Redirect } from "react-router-dom";
import { useState, useCallback } from "react";
import styled from "styled-components";
import { HiOutlineChat, HiOutlineVideoCamera } from "react-icons/hi";

import CodeEditor from "./CodeEditor";
import VoiceAndVideo from "./VoiceAndVideo";
import Chat from "./Chat";
import PromptModal from "./Modals/PromptModal";
import InviteModal from "./Modals/InviteModal";
import Tooltip from "../util/Tooltip";
import useInput from "../../hooks/useInput";
import useValidRoom from "../../hooks/useValidRoom";
import useOpenElement from "../../hooks/useOpenElement";

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

const UtilityButtonContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 75px;
  right: 50px;
  > *:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const CircleButton = styled.button`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.blue.main};
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
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
  const [backgroundIsLight, setBackgroundIsLight] = useState(true);
  const [chatOpen, setChatOpen] = useOpenElement(false);
  const [videoOpen, setVideoOpen] = useOpenElement(true);
  const [inviteModalOpen, setInviteModalOpen] = useOpenElement(false);

  const name = useInput("");
  const { isValidRoom, color } = useValidRoom(roomId);

  const settingsRef = useCallback((node) => {
    if (!node) return;
    setTopBarHeight(node.getBoundingClientRect().height);
  }, []);

  if (isValidRoom === null) {
    return <Container></Container>;
  }

  if (isValidRoom === false) {
    return <Redirect to="/404" />;
  }

  if (!hasJoined)
    return (
      <PromptModal
        name={name}
        hasJoined={hasJoined}
        setHasJoined={setHasJoined}
      />
    );

  return (
    <Container>
      {inviteModalOpen ? (
        <InviteModal setInviteModalOpen={setInviteModalOpen} isOpen={true} />
      ) : null}
      <CodeContainer chatOpen={chatOpen}>
        <CodeEditor
          topBarHeight={topBarHeight}
          settingsRef={settingsRef}
          socket={socket}
          setBackgroundIsLight={setBackgroundIsLight}
          chatOpen={chatOpen}
          roomId={roomId}
          name={name.value}
          color={color}
          setInviteModalOpen={setInviteModalOpen}
        ></CodeEditor>
      </CodeContainer>

      <Chat
        backgroundIsLight={backgroundIsLight}
        color={color}
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
        socket={socket}
        name={name.value}
        roomId={roomId}
      />

      <VoiceAndVideo
        videoOpen={videoOpen}
        setVideoOpen={setVideoOpen}
        color={color}
        socket={socket}
        setSocket={setSocket}
        hasJoined={hasJoined}
        name={name.value}
        roomId={roomId}
        backgroundIsLight={backgroundIsLight}
        topBarHeight={topBarHeight}
      />
      <UtilityButtonContainer>
        <Tooltip tip={chatOpen ? "Hide Chat" : "Open Chat"}>
          <CircleButton onClick={() => setChatOpen((isOpen) => !isOpen)}>
            <HiOutlineChat />
          </CircleButton>
        </Tooltip>
        <Tooltip tip={videoOpen ? "Hide Video" : "Open Video"}>
          <CircleButton onClick={() => setVideoOpen((isOpen) => !isOpen)}>
            <HiOutlineVideoCamera />
          </CircleButton>
        </Tooltip>
      </UtilityButtonContainer>
    </Container>
  );
}
