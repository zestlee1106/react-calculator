import styled from "styled-components";

function Calculator({ children }) {
  return <StyledCalculator>{children}</StyledCalculator>;
}

const StyledCalculator = styled.div`
  width: 300px;
  display: grid;
  grid-template-areas:
    "total total total total"
    "modifier modifier modifier operation"
    "digit digit digit operation"
    "digit digit digit operation"
    "digit digit digit operation"
    "digit digit digit operation";
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  height: 500px;
`;

export default Calculator;
