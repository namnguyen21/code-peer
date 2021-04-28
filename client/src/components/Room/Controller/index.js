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
  backgroundIsLight,
  hasAudio,
  setHasAudio,
}) {
  function onAudioChange() {
    const audioTrack = myAudioStream.getAudioTracks()[0];
    console.log(audioTrack);
    if (myAudioStream.getAudioTracks()[0].enabled) {
      myAudioStream.getAudioTracks()[0].enabled = false;
    } else {
      myAudioStream.getAudioTracks()[0].enabled = true;
    }
    setHasAudio((hasAudio) => !hasAudio);
  }

  return (
    <Container backgroundIsLight={backgroundIsLight}>
      {/* <Section> */}
      {/* <IconButton onClick={() => setChatOpen((open) => !open)}>
        <HiChatAlt2 />
        <ButtonDescription>
          {chatOpen ? "Close Chat" : "Open Chat"}
        </ButtonDescription>
      </IconButton> */}
      <IconBtn
        onClick={() => setChatOpen((open) => !open)}
        isOn={chatOpen}
        icon={<HiChatAlt2 />}
      >
        {chatOpen ? "Close Chat" : "Open Chat"}
      </IconBtn>
      {/* </Section>
      <Section> */}
      {/* <IconButton onClick={onAudioChange}>
          <HiMicrophone />
          <ButtonDescription>
            {hasAudio ? "Mute Audio" : "Unmute Audio"}
          </ButtonDescription>
        </IconButton> */}
      <IconBtn isOn={hasAudio} onClick={onAudioChange} icon={<HiMicrophone />}>
        {hasAudio ? "Mute Audio" : "Unmute Audio"}
      </IconBtn>
      {/* </Section>
      <Section> */}
      <IconBtn icon={<HiVideoCamera />}>Pause Camera</IconBtn>
      {/* <IconButton>
        <HiVideoCamera />
        <ButtonDescription>Pause Video</ButtonDescription>
      </IconButton> */}
      {/* </Section> */}
    </Container>
  );
}
