import styled from "styled-components";

const Button = styled.button`
  outline: none;
  background: ${(props) =>
    props.isOn && !props.disabled ? "transparent" : "rgba(255, 0, 0, 0.4);"};
  color: ${(props) => props.theme.colors.white};
  padding: 10px 20px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  transition: all 0.2s;
  cursor: pointer;
  transition: all 0.2s;
  > svg {
    font-size: 1.2rem;
  }
  &:hover {
    color: ${(props) => props.theme.colors.blue.light};
  }
`;

const ButtonDescription = styled.p`
  margin-top: 5px;
`;

export default function IconButton({
  icon,
  children,
  onClick,
  isOn,
  disabled,
}) {
  return (
    <Button
      onClick={disabled ? null : onClick}
      disabled={disabled ? true : false}
      isOn={isOn}
    >
      {icon}
      <ButtonDescription>{children}</ButtonDescription>
    </Button>
  );
}
