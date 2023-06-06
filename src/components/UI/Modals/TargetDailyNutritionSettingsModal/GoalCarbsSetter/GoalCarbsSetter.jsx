import classes from "./GoalCarbsSetter.module.css";
import { useState } from "react";
import Button from "../../../Button/Button";
import InfoButton from "../../../InfoButton/InfoButton";
import { GOAL_CARBS_INFO } from "../infoMessages";
import Backdrop from "../../../Backdrop/Backdrop";
import NumPad from "../../../../NumPad/NumPad";
import { useSelector, useDispatch } from "react-redux";
import { targetDailyNutritionActions } from "../../../../../store/targetDailyNutrition-slice";
import { TbSettings } from "react-icons/tb";

const GoalCarbsSetter = () => {
  const [isUsingNumpad, setIsUsingNumpad] = useState(false);
  const { targetDailyCarbs } = useSelector(
    (state) => state.targetDailyNutrition
  );
  const dispatch = useDispatch();

  const acceptNumPadValue = (value) => {
    dispatch(targetDailyNutritionActions.setDailyCarbs(Number(value)));

    setIsUsingNumpad(false);
  };

  return (
    <>
      {isUsingNumpad && (
        <Backdrop>
          <NumPad
            maxIntegerDigits={3}
            noFloatingPoint={true}
            onAbort={() => setIsUsingNumpad(false)}
            onNewEntry={acceptNumPadValue}
          />
        </Backdrop>
      )}
      <div className={classes.GoalCarbsSetter}>
        <div className={classes.heading}>
          <label htmlFor="carbsInput">
            Kohlenhydrate <span>(täglich)</span>
          </label>
          <InfoButton info={GOAL_CARBS_INFO} />
        </div>
        <div className={classes.goalCarbs}>
          <div>
            {targetDailyCarbs.staticValue}
            <span>g</span>
          </div>
          <Button
            addedClasses="thumb-button"
            onClick={() => setIsUsingNumpad(true)}
          >
            <TbSettings />
          </Button>
        </div>
      </div>
    </>
  );
};

export default GoalCarbsSetter;
