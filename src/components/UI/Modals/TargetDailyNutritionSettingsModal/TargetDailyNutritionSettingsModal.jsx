import classes from "./TargetDailyNutritionSettingsModal.module.css";
import Button from "../../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { targetDailyNutritionActions } from "../../../../store/targetDailyNutrition-slice";
import GoalCaloriesSetter from "./GoalCaloriesSetter/GoalCaloriesSetter";

import {
  GOAL_PROTEIN_INFO,
  GOAL_FAT_INFO,
  GOAL_CARBS_INFO,
} from "./infoMessages";
import StaticDynamicValuePicker from "./StaticDynamicValuePicker/StaticDynamicValuePicker";
import GoalCarbsSetter from "./GoalCarbsSetter/GoalCarbsSetter";

const TargetDailyNutritionSettingsModal = ({ closeModal }) => {
  const { bodyWeight } = useSelector((state) => state.profile);
  const bodyWeights = useSelector((state) => state.bodyWeights);
  const lastKnownWeight = bodyWeights?.[0]?.weight ?? bodyWeight;
  const { targetDailyProtein, targetDailyCarbs, targetDailyFat } = useSelector(
    (state) => state.targetDailyNutrition
  );
  const dispatch = useDispatch();

  const setDailyProteinIsUsingDynamicValueHandler = (value) => {
    dispatch(
      targetDailyNutritionActions.setDailyProteinIsUsingDynamicValue(value)
    );
  };

  const increaseProteinDynamicValueHandler = () => {
    dispatch(targetDailyNutritionActions.increaseProteinDynamicValue());
  };

  const decreaseProteinDynamicValueHandler = () => {
    dispatch(targetDailyNutritionActions.decreaseProteinDynamicValue());
  };

  const setProteinStaticValueHandler = (value) => {
    dispatch(targetDailyNutritionActions.setProteinStaticValue(value));
  };

  const setFatsStaticValueHandler = (value) => {
    dispatch(targetDailyNutritionActions.setFatStaticValue(value));
  };

  const setDailyFatsIsUsingDynamicValueHandler = (value) => {
    dispatch(targetDailyNutritionActions.setDailyFatIsUsingDynamicValue(value));
  };

  const increaseFatDynamicValueHandler = () => {
    dispatch(targetDailyNutritionActions.increaseFatDynamicValue());
  };

  const decreaseFatDynamicValueHandler = () => {
    dispatch(targetDailyNutritionActions.decreaseFatDynamicValue());
  };

  return (
    <div className={classes.TargetDailyNutritionSettingsModal}>
      <div className={classes.macrosSettings}>
        <GoalCaloriesSetter />
        <StaticDynamicValuePicker
          info={GOAL_PROTEIN_INFO}
          title={"Proteinmenge"}
          targetValue={targetDailyProtein}
          lastKnownWeight={lastKnownWeight}
          onToggleDynamicValue={setDailyProteinIsUsingDynamicValueHandler}
          increaseDynamicValue={increaseProteinDynamicValueHandler}
          decreaseDynamicValue={decreaseProteinDynamicValueHandler}
          onSetStaticValue={setProteinStaticValueHandler}
        />
        <StaticDynamicValuePicker
          info={GOAL_FAT_INFO}
          title={"Fettmenge"}
          targetValue={targetDailyFat}
          lastKnownWeight={lastKnownWeight}
          onToggleDynamicValue={setDailyFatsIsUsingDynamicValueHandler}
          increaseDynamicValue={increaseFatDynamicValueHandler}
          decreaseDynamicValue={decreaseFatDynamicValueHandler}
          onSetStaticValue={setFatsStaticValueHandler}
        />
        <GoalCarbsSetter />
      </div>
      <div className={classes.actions}>
        <Button addedClasses={classes.btnClose} onClick={closeModal}>
          schließen
        </Button>
      </div>
    </div>
  );
};

export default TargetDailyNutritionSettingsModal;
