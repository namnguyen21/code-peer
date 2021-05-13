import styled from "styled-components";
import { HiChatAlt2, HiMicrophone, HiVideoCamera } from "react-icons/hi";
import useVideoCallback from '../../../hooks/useVideoCallback'

const VideoContainer = styled.div`
  background-color: #000;
  height: 200px;
  width: 200px;
  position: relative;
`;

const Video = styled.video`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ButtonContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  > *:not(:last-child) {
    margin-right: 20px;
  }
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

const Button = styled.button`
  height: 35px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.disabled || !props.isOn ? "red" : "green"};
  outline: transparent;
  border: none;
  font-size: 20px;
  color: ${(props) => props.theme.colors.white};
  border-radius: 50%;
  z-index: 5;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: ${(props) =>
      props.disabled ? "red" : props.isOn ? "red" : "green"};
  }
`;

const NameTag = styled.p`
  position: absolute;
  background-color: rgba(114, 137, 218, 0.7);
  position: absolute;
  color: white;
  display: inline;
  padding: 2px 10px;
  z-index: 2;
  top: 5px;
  left: 5px;
  font-size: 0.8rem;
`;

function IconButton({ isOn, disabled, onClick, children }) {
  return (
    <Button disabled={disabled} isOn={isOn} onClick={disabled ? null : onClick}>
      {children}
    </Button>
  );
}

export default function MyVideo({
  stream,
  toggleAudio,
  toggleVideo,
  name,
  audioIsEnabled,
  videoIsEnabled,
  audioDevices,
  videoDevices,
}) {
  const videoRef = useVideoCallback(stream);
  return (
    <VideoContainer>
      <Video autoPlay ref={videoRef} />
      <ButtonContainer>
        <IconButton
          disabled={audioDevices.length === 0}
          isOn={audioIsEnabled}
          onClick={toggleAudio}
        >
          <HiMicrophone />
        </IconButton>
        <IconButton
          disabled={videoDevices.length === 0}
          isOn={videoIsEnabled}
          onClick={toggleVideo}
        >
          <HiVideoCamera />
        </IconButton>
        {/* <IconButton onClick={toggleAudio}>
          <HiMicrophone />
        </IconButton>
        <IconButton onClick={toggleVideo}>
          <HiVideoCamera />
        </IconButton> */}
      </ButtonContainer>
      <NameTag>{name}</NameTag>
    </VideoContainer>
  );
}
