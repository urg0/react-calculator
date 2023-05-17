import React, { useReducer } from "react";

import DigitButton from "./components/DigitButton";
/* */
import "./App.css";
import OperationButton from "./components/OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  OPERATION: "operation",
  DELETE: "delete",
  CLEAR: "clear",
  EQUALS: "equals",
};

const calculatorReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          operation: action.payload.operation,
          overwrite: false,
        };
      }
      if (state.currentValue === "0" && action.payload.digit === "0")
        return state;
      if (state.currentValue == null && action.payload.digit === ".") {
        return {
          ...state,
          currentValue: `0.`,
        };
      }
      if (action.payload.digit === "." && state.currentValue.includes("."))
        return state;
      return {
        ...state,
        currentValue: `${state.currentValue || ""}${action.payload.digit}`,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.OPERATION:
      if (state.previousValue == null && state.currentValue == null)
        return { ...state, operation: action.payload.operation };
      if (state.currentValue == null) {
        return {
          ...state,
          operation: action.payload.operation,
          previousValue: state.previousValue,
        };
      }
      if (state.previousValue == null) {
        //null == undefined => true
        //null === undefined => false
        return {
          previousValue: state.currentValue,
          operation: action.payload.operation,
          currentValue: null,
        };
      }
      return {
        previousValue: calculate(state),
        operation: action.payload.operation,
        currentValue: null,
      };

    case ACTIONS.EQUALS:
      if (state.previousValue == null && state.currentValue == null)
        return state;
      return {
        operation: "",
        overwrite: true,
        currentValue: calculate(state),
        previousValue: null,
      };

    case ACTIONS.DELETE:
      if (state.currentValue == null) {
        return state;
      }
      if (state.currentValue.length === 1) {
        return {
          ...state,
          currentValue: null,
        };
      }

      return {
        ...state,
        currentValue: state.currentValue.slice(0, -1),
      };
  }
};

const calculate = ({ previousValue, currentValue, operation }) => {
  const previous = parseFloat(previousValue);
  const current = parseFloat(currentValue);

  switch (operation) {
    case "+":
      return previous + current;
    case "-":
      return previous - current;
    case "÷":
      return previous / current;
    case "*":
      return previous * current;
  }
};

const App = () => {
  const [{ currentValue, previousValue, operation }, dispatch] = useReducer(
    calculatorReducer,
    {}
  );

  return (
    <>
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">
            {previousValue} {operation}
          </div>
          <div className="current-operand">{currentValue}</div>
        </div>
        <button
          className="span-two"
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE })}>DEL</button>
        <OperationButton operation="÷" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />

        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <button
          className="span-two"
          onClick={() => dispatch({ type: ACTIONS.EQUALS })}
        >
          =
        </button>
      </div>
    </>
  );
};

export default App;
