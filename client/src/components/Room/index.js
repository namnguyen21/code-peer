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
  position: relative;
`;

const CodeContainer = styled.div`
  width: ${(props) => (props.chatOpen ? "calc(100vw - 300px)" : "100vw")};
  transition: all 0.2s;
  height: 100%;
`;

export default function Index() {
  const { id: roomId } = useParams();
  const [socket, setSocket] = useState();
  const [hasJoined, setHasJoined] = useState(false);
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [myVideoStream, setMyVideoStream] = useState();
  const [myAudioStream, setMyAudioStream] = useState();
  const [backgroundIsLight, setBackgroundIsLight] = useState(true);
  const [audioDevices, setAudioDevices] = useState([]);
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioIsEnabled, setAudioIsEnabled] = useState(false);
  const [videoIsEnabled, setVideoIsEnabled] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);
  const name = useInput("");

  function renderJoinPrompt() {
    return (
      <Modal name={name} hasJoined={hasJoined} setHasJoined={setHasJoined} />
    );
  }

  if (!hasJoined) return renderJoinPrompt();

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
        myVideoStream={myVideoStream}
        setMyVideoStream={setMyVideoStream}
        audioIsEnabled={audioIsEnabled}
        setAudioIsEnabled={setAudioIsEnabled}
        videoIsEnabled={videoIsEnabled}
        setVideoIsEnabled={setVideoIsEnabled}
        audioDevices={audioDevices}
        setAudioDevices={setAudioDevices}
        videoDevices={videoDevices}
        setVideoDevices={setVideoDevices}
        socket={socket}
        setSocket={setSocket}
        hasJoined={hasJoined}
        name={name.value}
        roomId={roomId}
        backgroundIsLight={backgroundIsLight}
        topBarHeight={topBarHeight}
      />
      <Controller
        backgroundIsLight={backgroundIsLight}
        myAudioStream={myAudioStream}
        myVideoStream={myVideoStream}
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
        setMyAudioStream={setMyAudioStream}
        audioIsEnabled={audioIsEnabled}
        setAudioIsEnabled={setAudioIsEnabled}
        videoIsEnabled={videoIsEnabled}
        setVideoIsEnabled={setVideoIsEnabled}
        audioDevices={audioDevices}
        videoDevices={videoDevices}
      />
    </Container>
  );
}
