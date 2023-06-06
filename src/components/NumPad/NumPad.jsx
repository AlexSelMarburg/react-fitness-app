import classes from "./NumPad.module.css";
import { MdOutlineBackspace } from "react-icons/md";
import { useState, useCallback } from "react";

const TIME_TO_REMOVE_BUTTON_FOCUS = 50;

const NumPad = ({
  onAbort,
  onNewEntry,
  noFloatingPoint = false,
  maxFloatingDigits = 1,
  maxIntegerDigits = 3,
}) => {
  const [result, setResult] = useState("");

  const concatToResult = useCallback(
    (btnVal) => {
      if (btnVal === "," && noFloatingPoint) return;

      if (
        !result.includes(",") &&
        result.length >= maxIntegerDigits &&
        btnVal !== ","
      )
        return;
      if (btnVal === "," && result.includes(",")) return;
      if (btnVal === "," && result.length === 0) return;
      if (btnVal === "0" && result.length === 0) return;
      if (
        result.includes(",") &&
        result.split(",")[1].length >= maxFloatingDigits
      )
        return;

      setResult((prevResult) => prevResult + btnVal);
    },
    [result]
  );

  const removeFromResult = useCallback(() => {
    setResult((prevResult) => prevResult.slice(0, -1));
  }, []);

  const parseStringValue = useCallback(
    (e) => {
      if (result.length === 0) {
        e.target.blur();
        return;
      }

      const value = Number(
        result.includes(",") ? result.replace(",", ".") : result
      );

      setTimeout(() => {
        onNewEntry(value);
        setResult("");
      }, TIME_TO_REMOVE_BUTTON_FOCUS);
    },
    [result, onNewEntry]
  );

  const removeButtonFocus = useCallback(
    (e, time = TIME_TO_REMOVE_BUTTON_FOCUS) => {
      setTimeout(() => {
        e.target.blur();
      }, time);
    },
    [TIME_TO_REMOVE_BUTTON_FOCUS]
  );

  const generateNums = () => {
    const nums = [];

    for (let i = 1; i < 10; i++) {
      nums.push(
        <button
          key={i}
          onClick={(e) => {
            concatToResult(i.toString());
            removeButtonFocus(e);
          }}
        >
          {i}
        </button>
      );
    }

    return nums;
  };

  return (
    <>
      <div className={classes.numPad}>
        <div className={classes.display}>{result}</div>
        <div className={classes.numPadNumButtonsContainer}>
          {generateNums()}

          <button
            disabled={noFloatingPoint}
            className={classes.comma}
            onClick={(e) => {
              removeButtonFocus(e);
              concatToResult(",");
            }}
          ></button>

          <button
            onClick={(e) => {
              concatToResult("0");
              removeButtonFocus(e);
            }}
          >
            0
          </button>
          <button
            className={classes.backspaceBtn}
            // disabled={!result.length}
            onClick={(e) => {
              removeFromResult(e);
              removeButtonFocus(e);
            }}
          >
            <MdOutlineBackspace style={{ pointerEvents: "none" }} />
          </button>
          <div className={classes.numPadActionButtonsContainer}>
            <button
              onClick={(e) => {
                setResult("");
                setTimeout(() => {
                  onAbort();
                }, TIME_TO_REMOVE_BUTTON_FOCUS);
              }}
            >
              Abbrechen
            </button>
            <button
              onClick={(e) => {
                parseStringValue(e);
              }}
            >
              Speichern
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NumPad;
