import styled from "styled-components";
import { HiChatAlt2, HiMicrophone, HiVideoCamera } from "react-icons/hi";

import IconBtn from "./IconButton";

const Container = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: ${(props) =>
    props.backgroundIsLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.1)"};
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  > *:not(:last-child) {
    border-right: ${(props) => `solid 1px ${props.theme.colors.paper}`};
  }
  transition: all 0.2s;
  > *:first-child {
    border-top-left-radius: 10px;
  }
  > *:last-child {
    border-top-right-radius: 10px;
  }
`;

const Section = styled.div`
  color: ${(props) => props.theme.colors.white};
  padding: 10px 20px;
`;

const IconButton = styled.button`
  outline: none;
  background: transparent;
  color: inherit;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  transition: all 0.2s;
  cursor: pointer;
  > svg {
    font-size: 1.2rem;
  }
  &:hover {
    color: ${(props) => props.theme.colors.blue.light};
  }
`;

const ButtonDescription = styled.p`
  margin-top: 5px;
`;

export default function Controller({
  setChatOpen,
  chatOpen,
  myAudioStream,
  myVideoStream,
  backgroundIsLight,
  audioIsEnabled,
  setAudioIsEnabled,
  videoIsEnabled,
  setVideoIsEnabled,
  audioDevices,
  videoDevices,
}) {
  function onAudioChange() {
    console.log(audioDevices);
    if (myAudioStream.getAudioTracks()[0].enabled) {
      myAudioStream.getAudioTracks()[0].enabled = false;
    } else {
      myAudioStream.getAudioTracks()[0].enabled = true;
    }
    setAudioIsEnabled((isEnabled) => !isEnabled);
  }

  function onVideoChange() {
    if ((myVideoStream.getVideoTracks()[0].enabled = false)) {
      myAudioStream.getVideoTracks()[0].enabled = true;
    } else {
      myVideoStream.getVideoTracks()[0].enabled = false;
    }
    setVideoIsEnabled((isEnabled) => !isEnabled);
  }

  return (
    <Container backgroundIsLight={backgroundIsLight}>
      <IconBtn
        onClick={() => setChatOpen((open) => !open)}
        isOn={true}
        icon={<HiChatAlt2 />}
      >
        {chatOpen ? "Close Chat" : "Open Chat"}
      </IconBtn>

      <IconBtn
        isOn={audioIsEnabled}
        disabled={audioDevices.length === 0 ? true : false}
        onClick={onAudioChange}
        icon={<HiMicrophone />}
        disabled={audioDevices.length === 0 ? true : false}
      >
        {audioIsEnabled ? "Mute Audio" : "Unmute Audio"}
      </IconBtn>

      <IconBtn
        isOn={videoIsEnabled}
        disabled={videoDevices.length === 0 ? true : false}
        icon={<HiVideoCamera />}
        onClick={onVideoChange}
      >
        {videoIsEnabled ? "Pause Video" : "Resume Video"}
      </IconBtn>
    </Container>
  );
}
