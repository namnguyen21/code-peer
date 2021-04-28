import styled from "styled-components";

const Select = styled.select`
  background-color: ${(props) => props.theme.colors.paper};
  outline: none;
  border: none;
  color: ${(props) => props.theme.colors.white};
  padding: 0 20px;
  font-size: 0.9rem;
  border-radius: 2px;
`;

const Option = styled.option`
  color: ${(props) => props.theme.colors.white};
  outline: none;
  border: none;
`;

export default function Component({ options, value, setValue }) {
  function renderOptions() {
    options.sort((a, b) => {
      if (a.value < b.value) return -1;
      if (a.value > b.value) return 1;
      return 0;
    });
    return options.map((o, i) => (
      <Option key={i} value={o.value}>
        {o.display}
      </Option>
    ));
  }

  function handleChange(e) {
    setValue(options.find((target) => target.value === e.target.value));
  }

  return (
    <Select value={value} onChange={handleChange}>
      {renderOptions()}
    </Select>
  );
}
