import React from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

import Link from "../util/Link";
import Loader from "../util/LoadingOverlay";
import useCreateRoom from "../../hooks/useCreateRoom";

const Container = styled.section`
  background-color: ${(props) => props.theme.colors.paper};
  height: calc(100vh - 60px);
`;

const HeroSection = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  width: 1200px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px;
  > *:not(:last-child) {
    margin-bottom: 30px;
  }
  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 20px;
  }
`;

const CtaButton = styled.button`
  width: 100%;
  font-size: 1.2rem;
  text-transform: uppercase;
  color: #fff;
  padding: 10px 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  outline: none;
  border: none;
  border-radius: 2px;
  background-size: 300% 100%;
  -moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
  background-image: linear-gradient(
    to right,
    #7289da,
    #52c45e,
    #7289da,
    #52c45e
  );
  &:hover {
    background-position: 100% 0;
    -moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }
  position: relative;
`;

const Heading = styled.h1`
  font-size: 50px;
  font-weight: 800;
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  line-height: 1.4;
  letter-spacing: 1px;
  @media (max-width: 800px) {
    font-size: 1.6rem;
  }
`;

const SubHeading = styled.h2`
  font-size: 30px;
  font-weight: 300;
  text-align: center;
  color: ${(props) => props.theme.colors.white};
  @media (max-width: 800px) {
    font-size: 1.2rem;
  }
`;

const CtaContainer = styled.div`
  width: 400px;
`;

const SmallText = styled.p`
  color: #ccc;
  font-size: 0.7rem;
  font-weight: 200;
  text-align: center;
  margin-top: 2px;
`;

export default function Index() {
  const { isLoading, onCreateRoom, roomID } = useCreateRoom();

  if (roomID.length > 0) {
    return <Redirect to={`/room/${roomID}`} />;
  }

  return (
    <Container>
      <HeroSection>
        <Heading>
          Code Peer: where peers can code and interview prep collaboratively.
        </Heading>
        <SubHeading>
          Quickly create and join rooms, and start coding.
        </SubHeading>
        <CtaContainer>
          <CtaButton onClick={onCreateRoom}>
            {isLoading ? <Loader /> : null}
            Create a Room
            {/* <Link to="/room/create">Create a Room</Link> */}
          </CtaButton>
          <SmallText>* Currently unavailable on mobile devices</SmallText>
        </CtaContainer>
      </HeroSection>
    </Container>
  );
}
