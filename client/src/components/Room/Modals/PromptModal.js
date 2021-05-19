import { useEffect, useState } from "react";
import styled from "styled-components";

import Input from "../../util/Input";
import Button from "../../util/Button";
import Stack from "../../util/Stack";
import Modal from "../../util/Modal";

const Label = styled.label`
  font-size: 1.2rem;
  display: block;
  text-align: center;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.white};
`;

const Form = styled.form``;

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
    <Modal
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.1)",
        },
      }}
      isOpen={hasJoined ? false : true}
    >
      {!hasJoined ? renderNamePrompt() : null}
    </Modal>
  );
}
