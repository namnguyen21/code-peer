import { useState } from "react";
import styled from "styled-components";

const ToggleContainer = styled.div`
  height: 20px;
  width: 40px;
  border-radius: 20px;
  position: relative;
`;

const Background = styled.span`
  background-color: ${(props) =>
    props.isOn ? props.theme.colors.green.main : props.theme.colors.white};
  width: 100%;
  height: 100%;
  display: inline-block;
  position: relative;
  transition: 0.2s;
  border-radius: 20px;
`;

const Slider = styled.span`
  height: 15px;
  width: 15px;
  position: absolute;
  transition: 0.2s;
  top: 2.5px;
  left: 2.5px;
  border-radius: 50%;
  cursor: pointer;
  transform: ${(props) => (props.isOn ? "translateX(20px)" : "translateX(0)")};
  /* transform: translateX(0); */
  background-color: ${(props) => props.theme.colors.lightGrey};
`;

const Input = styled.input`
  opacity: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  cursor: pointer;
`;

export default function Component({ isOn, onChange }) {
  return (
    <ToggleContainer>
      <Input onChange={onChange} type="checkbox" />
      <Background isOn={isOn}></Background>
      <Slider isOn={isOn}></Slider>
    </ToggleContainer>
  );
}
