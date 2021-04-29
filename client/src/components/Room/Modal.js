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

export default function Component({ hasJoined, setHasJoined, name }) {
  function renderNamePrompt() {
    function handleSubmit(e) {
      e.preventDefault();
      if (name.value.length === 0) {
        return;
      }
      setHasJoined(true);
    }

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

  return (
    <StyledModal
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.1)",
        },
      }}
      isOpen={hasJoined ? false : true}
    >
      {!hasJoined ? renderNamePrompt() : null}
    </StyledModal>
  );
}
