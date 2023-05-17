import React from "react";

import { ACTIONS } from "../App";

const OperationButton = ({ dispatch, operation }) => {
  const operationHandler = () => {
    dispatch({ type: ACTIONS.OPERATION, payload: { operation: operation } });
  };
  return (
    <>
      <button onClick={operationHandler}>{operation}</button>
    </>
  );
};

export default OperationButton;
