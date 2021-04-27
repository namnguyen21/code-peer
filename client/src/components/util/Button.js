import styled from "styled-components";

const Container = styled.button`
  background-color: ${(props) => props.theme.colors.blue.main};
  color: ${(props) => props.theme.colors.white};
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  padding: 5px 10px;
  font-weight: 500;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1rem")};
  transition: all 0.3s;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.colors.blue.light};
  }
`;

export default function Button({ children, onClick, fontSize }) {
  return <Container fontSize={fontSize}>{children}</Container>;
}
