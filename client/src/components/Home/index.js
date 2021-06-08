import React from "react";
import { v4 as uuid } from "uuid";
import styled from "styled-components";

import Illustration from "../../images/hero-illustration.png";

import Demo from "./Demo";
import Button from "../util/Button";
import Link from "../util/Link";

const HeroSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;
`;

const Div = styled.div`
  height: 500px;
  width: 500px;
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
  transform: rotate3d(0.5, -0.866, 0, 15deg) rotateZ(-1deg);
`;

const HeroIllustration = styled.img`
  height: 300px;
  transform: rotate3d(0.5, -0.866, 0, 15deg) rotateZ(-1deg);
`;

export default function Index() {
  return (
    <div>
      <HeroSection>
        <Link to={`/room/create`}>
          <Button color="blue">Create a room</Button>
        </Link>

        <Demo />
        {/* <HeroIllustration alt="Code Peer Illustration" src={Illustration} /> */}
      </HeroSection>
    </div>
  );
}
