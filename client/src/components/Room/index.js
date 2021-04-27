import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import CodeEditor from "./CodeEditor";
import VoiceAndVideo from "./VoiceAndVideo";
import Chat from "./Chat";
import Modal from "./Modal";
import Controller from "./Controller";
import useInput from "../../hooks/useInput";

const Container = styled.main`
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  display: flex;
  max-width: 100vw;
  overflow-x: hidden;
  overflow: hidden;
`;

const CodeContainer = styled.div`
  /* width: calc(100vw - 300px); */
  width: ${(props) => (props.chatOpen ? "calc(100vw - 300px)" : "100vw")};
  transition: all 0.2s;
  height: 100%;
`;

const ChatContainer = styled.div`
  height: 100%;
`;

export default function Index() {
  const { id: roomId } = useParams();
  const [socket, setSocket] = useState();
  const [hasJoined, setHasJoined] = useState(false);
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [myVideoStream, setMyVideoStream] = useState();
  const [myAudioStream, setMyAudioStream] = useState();
  const [chatOpen, setChatOpen] = useState(true);
  const name = useInput("");

  function renderJoinPrompt() {
    function onJoinSubmit(e) {
      e.preventDefault();
      if (!name.value.length) {
        return;
      }

      setHasJoined(true);
    }
    return (
      <Modal name={name} hasJoined={hasJoined} setHasJoined={setHasJoined} />
    );
  }

  if (!hasJoined) return renderJoinPrompt();

  return (
    <Container>
      <CodeContainer chatOpen={chatOpen}>
        <CodeEditor
          chatOpen={chatOpen}
          topBarHeight={topBarHeight}
          roomId={roomId}
          name={name.value}
        ></CodeEditor>
      </CodeContainer>

      <Chat
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
        topBarHeight={topBarHeight}
        setTopBarHeight={setTopBarHeight}
        socket={socket}
        name={name.value}
        roomId={roomId}
      />

      <VoiceAndVideo
        myAudioStream={myAudioStream}
        setMyAudioStream={setMyAudioStream}
        myVideoStream={myAudioStream}
        setMyVideoStream={setMyVideoStream}
        socket={socket}
        setSocket={setSocket}
        hasJoined={hasJoined}
        name={name.value}
        roomId={roomId}
      />
      <Controller
        myAudioStream={myAudioStream}
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
      />
    </Container>
  );
}
