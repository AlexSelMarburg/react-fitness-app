import classes from "./MacroDataDisplay.module.css";
import ProgressProvider from "./ProgressProvider";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./CircularProgressbar.css";

const MacroDataDisplay = ({
  title,
  className,
  currentValue = 0,
  targetValue = 100,
}) => {
  const percentage =
    targetValue > 0 ? Math.round((currentValue / targetValue) * 100) : 100;

  return (
    <div className={classes.MacroNutrient}>
      <div className={classes.macroNutrientTitle}>{title}</div>
      <div className={classes.nutrientProgressbarContainer}>
        <ProgressProvider valueStart={0} valueEnd={percentage}>
          {(value) => (
            <CircularProgressbar
              className={className}
              value={value}
              text={`${targetValue > 0 ? percentage + "%" : "∞"}`}
            />
          )}
        </ProgressProvider>
      </div>
      <div className={classes.values}>
        <div className={classes.currentValue}>{currentValue.toFixed()}</div>
        <div>von</div>
        <div className={classes.targetValue}>{targetValue}</div>
      </div>
    </div>
  );
};

export default MacroDataDisplay;
