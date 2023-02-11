import styled from "styled-components";
import GlobalStyle from "./style/GlobalStyle";
import Calculator from "./components/Calculator";
import Digits from "./components/Digits";
import Modifiers from "./components/Modifiers";
import Operations from "./components/Operations";
import Total from "./components/Total";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OPERATION_LIST = ["/", "X", "-", "+"];
const DIGIT_LIST = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const OPERATION = {
  DIVIDE: "/",
  MULTIPLY: "X",
  MINUS: "-",
  PLUS: "+",
};

function App() {
  const [digit, setDigit] = useState(0);
  const [digits, setDigits] = useState([]);
  const [operation, setOperation] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleDigitClick = (clickedDigit) => {
    if (String(digit).length === 3) {
      return;
    }

    setIsTyping(true);

    if (!isTyping) {
      setDigit(clickedDigit);
      return;
    }

    setDigit(Number(`${digit}${clickedDigit}`));
  };

  const handleOperationClick = (_operation) => {
    if (!digit) return;

    setDigits([digit]);
    setOperation(_operation);
    setIsTyping(false);
  };

  const handleModifierClick = () => {
    setDigit(0);
    setOperation("");
    setDigits([]);
    setIsTyping(false);
  };

  const getCalculatedNumber = (numberList, operation) => {
    let result = 0;
    switch (operation) {
      case OPERATION.DIVIDE:
        result = Math.floor(numberList[0] / numberList[1]);
        break;
      case OPERATION.MULTIPLY:
        result = numberList[0] * numberList[1];
        break;
      case OPERATION.MINUS:
        result = numberList[0] - numberList[1];
        break;
      case OPERATION.PLUS:
        result = numberList[0] + numberList[1];
        break;
      default:
        result = 1;
    }

    if (!isFinite(result)) return "오류";

    return result;
  };

  const handleCalculateClick = () => {
    setDigits((num) => [...num, digit]);
    setIsTyping(false);
  };

  useEffect(() => {
    if (digits.length > 1) {
      const calculatedNumber = getCalculatedNumber(digits, operation);
      setDigit(calculatedNumber);
      setDigits([calculatedNumber]);
    }
  }, [digits, operation]);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Calculator>
          <Total>{digit}</Total>
          <Digits>
            {DIGIT_LIST.map((digit) => (
              <button onClick={() => handleDigitClick(digit)} key={digit}>
                {digit}
              </button>
            ))}
          </Digits>
          <Modifiers>
            <button onClick={handleModifierClick}>AC</button>
          </Modifiers>
          <Operations>
            {OPERATION_LIST.map((operation) => (
              <button
                onClick={() => handleOperationClick(operation)}
                key={operation}
              >
                {operation}
              </button>
            ))}
            <button onClick={handleCalculateClick}>=</button>
          </Operations>
        </Calculator>
      </Wrapper>
    </>
  );
}

export default App;
