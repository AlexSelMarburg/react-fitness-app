import classes from "./DigitButton.module.css";
import { CALCULATOR_ACTIONS } from "../NutritionEntryModal";
import { useRef } from "react";

const DEFAULT_BLUR_TIMEOUT = 30;

const DigitButton = ({ digit, dispatch, className = "" }) => {
  const btnRef = useRef(null);

  const handleClick = () => {
    setTimeout(() => {
      btnRef.current.blur();
      dispatch({ type: CALCULATOR_ACTIONS.ADD_DIGIT, payload: { digit } });
    }, DEFAULT_BLUR_TIMEOUT);
  };

  return (
    <button
      ref={btnRef}
      className={`${className} ${classes.button} `}
      onClick={handleClick}
    >
      {digit}
    </button>
  );
};

export default DigitButton;
