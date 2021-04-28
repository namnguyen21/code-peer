import { useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";

import Input from "../util/Input";
import Button from "../util/Button";
import {
  createFakeAudioStream,
  createFakeVideoStream,
} from "./VoiceAndVideo/fakeStreams";
import Audio from "./VoiceAndVideo/Audio";
import Video from "./VoiceAndVideo/Video";
import Stack from "../util/Stack";
import Toggle from "../util/Toggle";

const StyledModal = styled(Modal)`
  background-color: ${(props) => props.theme.colors.lightGrey};
  padding: 25px 50px;
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  &:focus {
    outline: none;
    border: none;
  }
`;

const Label = styled.label`
  font-size: 1.2rem;
  display: block;
  text-align: center;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.white};
`;

const Form = styled.form``;

const StyledVideo = styled(Video)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
`;

const VideoContainer = styled.div`
  background-color: #000;
  position: relative;
  height: 200px;
  width: 200px;
  border-radius: 10px;
`;

export default function Component({
  hasJoined,
  setHasJoined,
  name,
  setMyAudioStream,
  setMyVideoStream,
  myAudioStream,
  myVideoStream,
  hasAudio,
  hasVideo,
  setHasAudio,
  setHasVideo,
}) {
  const [hasEnteredName, setHasEnteredName] = useState(false);

  useEffect(() => {
    if (!hasEnteredName) return;
    async function getMediaStreams() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      let hasAudio = false;
      let hasVideo = false;

      devices.forEach((d) => {
        if (d.kind === "audioinput") hasAudio = true;
        if (d.kind === "videoinput") hasVideo = true;
      });
      try {
        if (hasVideo && hasAudio) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          const audio = new MediaStream(stream.getAudioTracks());
          const video = new MediaStream(stream.getVideoTracks());
          setMyAudioStream(audio);
          setMyVideoStream(video);
          setHasAudio(true);
          setHasVideo(true);
        } else if (hasAudio && !hasVideo) {
          const audioStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          setMyAudioStream(audioStream);
          const fakeVideoStream = createFakeVideoStream();
          setMyVideoStream(fakeVideoStream);
          setHasAudio(true);
          setHasVideo(false);
        } else if (hasVideo && !hasAudio) {
          const videoStream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          setMyVideoStream(videoStream);
          const fakeAudioStream = createFakeAudioStream();
          setMyAudioStream(fakeAudioStream);
          setHasAudio(false);
          setHasVideo(true);
        } else {
          const fakeAudioStream = createFakeAudioStream();
          const fakeVideoStream = createFakeVideoStream();
          setMyAudioStream(fakeAudioStream);
          setMyVideoStream(fakeVideoStream);
          setHasAudio(false);
          setHasVideo(false);
        }
      } catch (err) {
        if (err === "DOMException: Permission denied") {
          // user denied access
          const fakeAudioStream = createFakeAudioStream();
          const fakeVideoStream = createFakeVideoStream();
          setMyAudioStream(fakeAudioStream);
          setMyVideoStream(fakeVideoStream);
          setHasAudio(false);
          setHasVideo(false);
        }
      }
    }
    getMediaStreams();
  }, [hasEnteredName]);

  function renderNamePrompt() {
    return (
      <Form onSubmit={handleSubmit}>
        <Stack space={10}>
          <Label>What's your name?</Label>
          <Input
            value={name.value}
            onChange={name.onChange}
            placeholder={'"John Doe"'}
          />
          <Button onClick={handleSubmit} color="blue">
            Next
          </Button>
        </Stack>
      </Form>
    );
  }

  function renderVoiceAndVideoPrompt() {
    function handleAudioChange() {
      const current = myAudioStream.getAudioTracks()[0].enabled;
      setHasAudio((hasAudio) => !hasAudio);
      myAudioStream.getAudioTracks()[0].enabled = !current;
    }

    function handleClick() {
      setHasJoined(true);
      console.log("hitting");
    }

    return (
      <div>
        <Stack space={10}>
          <VideoContainer>
            <StyledVideo stream={myVideoStream} />
          </VideoContainer>
          <Audio stream={myAudioStream} />
          {/* <Toggle isOn={hasAudio} onChange={handleAudioChange} /> */}
          <Button onClick={handleClick}>Join Room</Button>
        </Stack>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name.value.length === 0) {
      return;
    }
    setHasEnteredName(true);
  }

  return (
    <StyledModal
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.1)",
        },
      }}
      isOpen={hasJoined ? false : true}
    >
      {!hasEnteredName
        ? renderNamePrompt()
        : hasEnteredName && !hasJoined
        ? renderVoiceAndVideoPrompt()
        : null}
    </StyledModal>
  );
}
