import styled from "styled-components";

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;

  > *:not(:last-child) {
    margin-bottom: ${(props) => `${props.space}px`};
  }
`;

export default function Component({ children, space }) {
  return <Stack space={space}>{children}</Stack>;
}
