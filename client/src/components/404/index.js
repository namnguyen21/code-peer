import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
`;

const H1 = styled.h1`
  color: ${(props) => props.theme.colors.white};
  font-size: 40px;
  text-align: center;
`;

export default function Component() {
  return (
    <Container>
      <H1>Sorry, that room doesn't exist.</H1>
    </Container>
  );
}
