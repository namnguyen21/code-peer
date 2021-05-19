import styled from "styled-components";

import Modal from "../../util/Modal";
import Input from "../../util/Input";
import Button from "../../util/Button";

const Container = styled.div`
  width: 350px;
`;

const H2 = styled.h2`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 20px;
  text-align: center;
`;

const CopyContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 75% 20%;
  justify-content: space-between;
`;

export default function InviteModal({ isOpen, setInviteModalOpen }) {
  const onCopy = () => {
    navigator.clipboard.writeText(window.location);
    setInviteModalOpen(false);
  };

  const onRequestClose = () => {
    setInviteModalOpen(false);
  };

  return (
    <Modal
      shouldCloseOnOverlayClick={true}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <Container>
        <H2>Invite Peers</H2>
        <CopyContainer>
          <Input value={window.location} />
          <Button onClick={onCopy}>Copy</Button>
        </CopyContainer>
      </Container>
    </Modal>
  );
}
