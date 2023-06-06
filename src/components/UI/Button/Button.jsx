import classes from "./Button.module.css";

import { useRef } from "react";

const DEFAULT_BLUR_TIMEOUT = 50;

const Button = ({
  children,
  onClick,
  addedClasses = "",
  disabled = false,
  blurTimeout = DEFAULT_BLUR_TIMEOUT,
}) => {
  const btnRef = useRef(null);
  const handleClick = (event) => {
    event.preventDefault();

    setTimeout(() => {
      onClick();
      btnRef.current.blur();
    }, blurTimeout);
  };

  return (
    <button
      ref={btnRef}
      className={`${addedClasses} ${classes.button}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
