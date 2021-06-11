import ErrorPage from "./404";
import styled from "styled-components";

import Button from "../util/Button";
import Link from "../util/Link";

const Message = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  line-height: 1.1;
  margin-bottom: 20px;
`;

export default function Mobile() {
  return (
    <ErrorPage>
      <Message>
        Sorry, this application is currently unavailable for mobile devices.
      </Message>
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </ErrorPage>
  );
}
