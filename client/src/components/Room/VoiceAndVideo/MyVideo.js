import styled from "styled-components";
import { HiChatAlt2, HiMicrophone, HiVideoCamera } from "react-icons/hi";
import { FiMicOff, FiMic, FiVideoOff, FiVideo } from "react-icons/fi";
import useVideoCallback from "../../../hooks/useVideoCallback";

const VideoContainer = styled.div`
  background-color: #000;
  height: 200px;
  width: 200px;
  position: relative;
`;

const Filler = styled.div`
  height: 200px;
  width: 200px;
  background-color: #000;
  position: absolute;
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
    props.disabled || !props.isOn
      ? props.theme.colors.red.main
      : props.theme.colors.green.main};
  outline: transparent;
  border: none;
  font-size: 20px;
  color: ${(props) => props.theme.colors.white};
  border-radius: 50%;
  z-index: 5;
  cursor: pointer;
  transition: all 0.2s;
  @media (hover: hover) {
    &:hover {
      background-color: ${(props) =>
        props.disabled
          ? props.theme.colors.red.main
          : props.isOn
          ? props.theme.colors.green.light
          : props.theme.colors.red.light};
    }
  }
`;

function IconButton({ isOn, disabled, onClick, children, color }) {
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
  audioIsEnabled,
  videoIsEnabled,
  audioDevices,
  videoDevices,
}) {
  const videoRef = useVideoCallback(stream);
  return (
    <VideoContainer>
      {stream ? (
        <>
          <Video autoPlay ref={videoRef} />
          <ButtonContainer>
            <IconButton
              disabled={audioDevices.length === 0}
              isOn={audioIsEnabled}
              onClick={toggleAudio}
            >
              {audioDevices.length === 0 || !audioIsEnabled ? (
                <FiMicOff />
              ) : (
                <FiMic />
              )}
            </IconButton>
            <IconButton
              disabled={videoDevices.length === 0}
              isOn={videoIsEnabled}
              onClick={toggleVideo}
            >
              {videoDevices.length === 0 || !videoIsEnabled ? (
                <FiVideoOff />
              ) : (
                <FiVideo />
              )}
            </IconButton>
            {/* <IconButton onClick={toggleAudio}>
          <HiMicrophone />
        </IconButton>
        <IconButton onClick={toggleVideo}>
          <HiVideoCamera />
        </IconButton> */}
          </ButtonContainer>
        </>
      ) : (
        <Filler />
      )}
    </VideoContainer>
  );
}
