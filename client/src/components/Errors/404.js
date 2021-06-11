import styled from "styled-components";
import Lottie from "react-lottie";
import Animation from "../../assets/404-animation.json";

const Container = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 450px;
  @media (max-width: 800px) {
    width: 100%;
    padding: 0 20px;
  }
`;

export default function Component({ children }) {
  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Container>
      <Lottie options={animationOptions} />
      {children}
    </Container>
  );
}
