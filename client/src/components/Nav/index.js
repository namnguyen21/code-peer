import styled from "styled-components";

const Nav = styled.nav`
  width: 100vw;
  height: 60px;
  background-color: ${(props) => props.theme.colors.paper};
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 30px;
  color: ${(props) => props.theme.colors.white};
`;

export default function Component() {
  return (
    <Nav>
      <Logo>PeerCode</Logo>
    </Nav>
  );
}
