import styled, { keyframes } from "styled-components";

const Spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Overlay = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  height: 1.2rem;
  width: 1.2rem;
  border: 5px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${Spin} 1s infinite;
`;

export default function LoadingOverlay() {
  return (
    <Overlay>
      <Loader />
    </Overlay>
  );
}
