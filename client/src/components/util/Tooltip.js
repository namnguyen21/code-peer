import styled from "styled-components";

const TooltipText = styled.span`
  /* display: block; */
  width: auto;
  visibility: hidden;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  color: ${(props) => props.theme.colors.white};
  background-color: #000;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -100%);
  z-index: 99999999;
  white-space: nowrap;
`;

const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  z-index: 9999999;
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      ${TooltipText} {
        visibility: visible;
      }
    }
  }
`;

export default function Component({ children, tip }) {
  return (
    <Tooltip onClick={null}>
      {children}
      <TooltipText>{tip}</TooltipText>
    </Tooltip>
  );
}
