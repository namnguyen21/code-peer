import ErrorPage from "./404.js";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

import Link from "../util/Link";
import Button from "../util/Button";
import useCreateRoom from "../../hooks/useCreateRoom";
import Loader from "../util/LoadingOverlay";

const Message = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  line-height: 1.1;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 43% 43%;
  justify-content: space-between;
`;

export default function InvalidRoom() {
  const { isLoading, roomID, onCreateRoom } = useCreateRoom();
  if (roomID.length > 0) return <Redirect to={`/room/${roomID}`} />;
  return (
    <ErrorPage>
      <Message>Looks like you tried to join a room that doesn't exist!</Message>
      <ButtonContainer>
        <Link to="/">
          <Button>Go Home</Button>
        </Link>
        <Button onClick={onCreateRoom}>
          {isLoading ? <Loader /> : null}Create a Room
        </Button>
      </ButtonContainer>
    </ErrorPage>
  );
}
