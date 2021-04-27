import Modal from "react-modal";
import styled from "styled-components";

import Input from "../util/Input";
import Button from "../util/Button";

const StyledModal = styled(Modal)`
  background-color: ${(props) => props.theme.colors.lightGrey};
  padding: 50px;
  position: absolute;
  top: 25%;
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
  color: ${(props) => props.theme.colors.paper};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > *:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export default function Component({ hasJoined, setHasJoined, name }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (name.value.length === 0) {
      return;
    }
    setHasJoined(true);
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
      <Form onSubmit={handleSubmit}>
        <Label>What's your name?</Label>
        <Input
          value={name.value}
          onChange={name.onChange}
          placeholder={'"John Doe"'}
        />
        <Button onClick={handleSubmit} color="blue">
          Enter Room
        </Button>
      </Form>
    </StyledModal>
  );
}
