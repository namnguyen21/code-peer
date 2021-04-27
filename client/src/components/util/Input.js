import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  font-size: 1rem;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.paper};
  font-weight: 400;
  /* padding: 3px 0px 3px 3px;
  margin: 5px 1px 3px 0px; */
  padding: 5px 0 5px 5px;
  border-radius: 2px;
  border: 1px solid #fff;
  outline: none;
  transition: all 0.3s ease-in-out;

  &:focus {
    //box-shadow: 0 0 20px rgba(81, 203, 238, 1);
    box-shadow: ${(props) => `0 0 10px ${props.theme.colors.blue.main}`};
    /* padding: 3px 0px 3px 3px;
    margin: 5px 1px 3px 0px; */
    border: ${(props) => `solid 1px ${props.theme.colors.blue.main}`};
  }
`;

export default function Input({ onChange, value, placeholder }) {
  return (
    <StyledInput placeholder={placeholder} value={value} onChange={onChange} />
  );
}
