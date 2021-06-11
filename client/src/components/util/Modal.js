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
  z-index: 99999999999;
  &:focus {
    outline: none;
    border: none;
  }
`;
ReactModal.setAppElement("#root");
export default function Modal({
  isOpen,
  children,
  shouldCloseOnOverlayClick,
  onRequestClose,
}) {
  return (
    <StyledModal
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.9)",
          zIndex: "99999999",
        },
      }}
      isOpen={isOpen}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      onRequestClose={onRequestClose}
    >
      {children}
    </StyledModal>
  );
}
