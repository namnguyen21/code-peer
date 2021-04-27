import styled from "styled-components";
import { HiChatAlt2, HiMicrophone, HiVideoCamera } from "react-icons/hi";

const Container = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  > *:not(:last-child) {
    border-right: ${(props) => `solid 1px ${props.theme.colors.paper}`};
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

export default function Controller({ setChatOpen, chatOpen, myAudioStream }) {
  function onAudioChange() {
    const audioTrack = myAudioStream.getAudioTracks()[0];
    if (audioTrack.enabled) {
      audioTrack.enabled = false;
    } else {
      audioTrack.enabled = true;
    }
  }
  return (
    <Container>
      <Section>
        <IconButton>
          <HiChatAlt2 onClick={() => setChatOpen((open) => !open)} />
          <ButtonDescription>
            {chatOpen ? "Close Chat" : "Open Chat"}
          </ButtonDescription>
        </IconButton>
      </Section>
      <Section>
        <IconButton onClick={onAudioChange}>
          <HiMicrophone />
          <ButtonDescription>Mute Audio</ButtonDescription>
        </IconButton>
      </Section>
      <Section>
        <IconButton>
          <HiVideoCamera />
          <ButtonDescription>Pause Video</ButtonDescription>
        </IconButton>
      </Section>
    </Container>
  );
}
