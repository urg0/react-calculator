import React from "react";

import { ACTIONS } from "../App";

const DigitButton = ({ digit, dispatch }) => {
  const addDigitHandler = () => {
    dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: digit } });
  };
  return (
    <>
      <button onClick={addDigitHandler}>{digit}</button>
    </>
  );
};

export default DigitButton;
