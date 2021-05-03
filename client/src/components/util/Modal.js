import styled from "styled-components";
import ReactModal from "react-modal";

const StyledModal = styled(ReactModal)`
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

export default function Modal({ isOpen, children }) {
  return (
    <StyledModal
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.1)",
        },
      }}
      isOpen={isOpen}
    >
      {children}
    </StyledModal>
  );
}
