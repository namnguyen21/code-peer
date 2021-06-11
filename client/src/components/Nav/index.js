import styled from "styled-components";
import { Link } from "react-router-dom";

import LogoImage from "../../assets/code-peer-logo.png";

const Nav = styled.nav`
  width: 100vw;
  height: 60px;
  background-color: ${(props) => props.theme.colors.paper};
  display: flex;
  align-items: center;
  z-index: 1;
  padding: 0 50px;
  @media (max-width: 1000px) {
    padding: 0 20px;
  }
`;

const Logo = styled.img`
  height: 50px;
`;

export default function Component() {
  return (
    <Nav>
      <Link to="/">
        <Logo src={LogoImage} alt="Code Peer Logo" />
      </Link>
    </Nav>
  );
}
