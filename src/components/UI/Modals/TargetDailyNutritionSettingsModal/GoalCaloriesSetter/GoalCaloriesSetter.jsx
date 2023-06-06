import { useEffect, useState } from "react";
import classes from "./GoalCaloriesSetter.module.css";
import InfoButton from "../../../InfoButton/InfoButton";
import { GOAL_CALORIES_INFO } from "../infoMessages";
import { useSelector, useDispatch } from "react-redux";
import { targetDailyNutritionActions } from "../../../../../store/targetDailyNutrition-slice";

import {
  PROTEIN_TO_KCALS_VALUE,
  CARBS_TO_KCALS_VALUE,
  FATS_TO_KCALS_VALUE,
} from "../../../../../helpers/nutritionFunctions";

const GoalCaloriesSetter = () => {
  const {
    targetDailyCalories,
    targetDailyProtein,
    targetDailyCarbs,
    targetDailyFat,
  } = useSelector((state) => state.targetDailyNutrition);
  const { bodyWeight } = useSelector((state) => state.profile);
  const bodyWeights = useSelector((state) => state.bodyWeights);
  const lastKnownWeight = bodyWeights?.[0]?.weight ?? bodyWeight;

  const dispatch = useDispatch();

  useEffect(() => {
    const caloriesFromCarbs =
      targetDailyCarbs.staticValue * CARBS_TO_KCALS_VALUE;

    const caloriesFromProtein = targetDailyProtein.isUsingDynamicValue
      ? lastKnownWeight *
        targetDailyProtein.dynamicValue *
        PROTEIN_TO_KCALS_VALUE
      : targetDailyProtein.staticValue * PROTEIN_TO_KCALS_VALUE;

    const caloriesFromFat = targetDailyFat.isUsingDynamicValue
      ? targetDailyFat.dynamicValue * lastKnownWeight * FATS_TO_KCALS_VALUE
      : targetDailyFat.staticValue * FATS_TO_KCALS_VALUE;

    const totalCalculatedCalories =
      caloriesFromCarbs + caloriesFromProtein + caloriesFromFat;

    dispatch(
      targetDailyNutritionActions.setDailyCalories(
        Number(totalCalculatedCalories.toFixed(0))
      )
    );
  }, [
    targetDailyCalories,
    targetDailyProtein,
    targetDailyCarbs,
    targetDailyFat,
  ]);

  return (
    <>
      <div className={classes.GoalCaloriesSetter}>
        <div className={classes.heading}>
          <label htmlFor="caloriesInput">
            Zielkalorien <span>(täglich)</span>
          </label>
          <InfoButton info={GOAL_CALORIES_INFO} />
        </div>
        <div className={classes.goalCalories}>
          <div>
            {targetDailyCalories}
            <span>kcal</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalCaloriesSetter;
