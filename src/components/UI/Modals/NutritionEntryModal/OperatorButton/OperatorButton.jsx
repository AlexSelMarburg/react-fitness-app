import classes from "./OperatorButton.module.css";
import { CALCULATOR_ACTIONS } from "../NutritionEntryModal";
import { useRef } from "react";

const DEFAULT_BLUR_TIMEOUT = 30;

const OperatorButton = ({ symbol, operator, dispatch, className = "" }) => {
  const btnRef = useRef(null);

  const handleClick = () => {
    setTimeout(() => {
      btnRef.current.blur();
      dispatch({
        type: CALCULATOR_ACTIONS.SELECT_OPERATOR,
        payload: { operator },
      });
    }, DEFAULT_BLUR_TIMEOUT);
  };

  return (
    <button
      ref={btnRef}
      className={`${className} ${classes.button}`}
      onClick={handleClick}
    >
      {symbol}
    </button>
  );
};

export default OperatorButton;
