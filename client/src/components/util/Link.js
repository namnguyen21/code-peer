import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  outline: none;
  border: none;
`;

export default function MyLink({ children, to }) {
  return <StyledLink to={to}>{children}</StyledLink>;
}
