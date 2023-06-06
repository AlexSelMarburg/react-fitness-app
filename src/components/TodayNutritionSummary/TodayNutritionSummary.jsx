import { useState, memo } from "react";
import KcalsProgressBar from "./KcalsProgress/KcalsProgressBar";
import classes from "./TodayNutritionSummary.module.css";
import Button from "../UI/Button/Button";
import MacroDataDisplay from "./MacroDataDisplay/MacroDataDisplay";

import {
  PROTEIN_TO_KCALS_VALUE,
  CARBS_TO_KCALS_VALUE,
  FATS_TO_KCALS_VALUE,
} from "../../helpers/nutritionFunctions";

import {
  MISSING_CALORIES_DATA_WARNING,
  MISSING_PROTEIN_DATA_WARNING,
  MISSING_CARBS_DATA_WARNING,
  MISSING_FAT_DATA_WARNING,
} from "../../helpers/modalMessages";

import { useSelector } from "react-redux";
import { GoSettings } from "react-icons/go";
import { TbLayoutList } from "react-icons/tb";
import Backdrop from "../UI/Backdrop/Backdrop";
import NutritionEntriesListModal from "../UI/Modals/NutritionEntriesListModal/NutritionEntriesListModal";
import WarningsCollectionDisplay from "../WarningsCollectionDisplay/WarningsCollectionDisplay";
import TargetDailyNutritionSettingsModal from "../UI/Modals/TargetDailyNutritionSettingsModal/TargetDailyNutritionSettingsModal";

const TodayNutritionSummary = ({ date = "HEUTE", nutrition }) => {
  const [isNutritionsListOpen, setIsNutritionsListOpen] = useState(false);
  const [isTargetDailyNutritionModalOpen, setIsTargetDailyNutritionModalOpen] =
    useState(false);
  const {
    targetDailyCalories,
    targetDailyProtein,
    targetDailyCarbs,
    targetDailyFat,
  } = useSelector((state) => state.targetDailyNutrition);
  const { bodyWeight } = useSelector((state) => state.profile);
  const bodyWeights = useSelector((state) => state.bodyWeights);
  const lastKnownWeight = bodyWeights?.[0]?.weight ?? bodyWeight;

  const targetProteinValue = targetDailyProtein.isUsingDynamicValue
    ? targetDailyProtein.dynamicValue * lastKnownWeight
    : targetDailyProtein.staticValue;

  const targetFatValue = targetDailyFat.isUsingDynamicValue
    ? targetDailyFat.dynamicValue * lastKnownWeight
    : targetDailyFat.staticValue;

  const targetCarbsValue = targetDailyCarbs.staticValue;

  const {
    accumulatedCalories,
    accumulatedFats,
    accumulatedCarbs,
    accumulatedProteins,
    hasMissingCaloriesValues,
    hasMissingCarbsValues,
    hasMissingFatsValues,
    hasMissingProteinsValues,
  } = nutrition;

  const warnings = [];

  hasMissingCaloriesValues && warnings.push(MISSING_CALORIES_DATA_WARNING);
  hasMissingCarbsValues && warnings.push(MISSING_CARBS_DATA_WARNING);
  hasMissingFatsValues && warnings.push(MISSING_FAT_DATA_WARNING);
  hasMissingProteinsValues && warnings.push(MISSING_PROTEIN_DATA_WARNING);

  return (
    <>
      {isTargetDailyNutritionModalOpen && (
        <Backdrop>
          <TargetDailyNutritionSettingsModal
            closeModal={() => setIsTargetDailyNutritionModalOpen(false)}
          />
        </Backdrop>
      )}
      {isNutritionsListOpen && (
        <Backdrop>
          <NutritionEntriesListModal
            closeModal={() => setIsNutritionsListOpen(false)}
            nutrition={nutrition.entries}
            date={date}
          />
        </Backdrop>
      )}

      <div className={classes.TodayNutritionSummary}>
        <div className={classes.title}>
          <div className={classes.date}>{date}</div>
          <WarningsCollectionDisplay warningInfosArray={warnings} />
          <div className={classes.actions}>
            <Button
              addedClasses="thumb-button"
              onClick={() => setIsTargetDailyNutritionModalOpen(true)}
            >
              <GoSettings />
            </Button>
            <Button
              addedClasses="thumb-button"
              onClick={() => setIsNutritionsListOpen(true)}
            >
              <TbLayoutList />
            </Button>
          </div>
        </div>
        <KcalsProgressBar
          currentValue={accumulatedCalories}
          targetValue={targetDailyCalories}
        />
        <div className={classes.macros}>
          <MacroDataDisplay
            title="protein"
            className="protein"
            currentValue={accumulatedProteins}
            targetValue={targetProteinValue.toFixed()}
          />
          <MacroDataDisplay
            title="carbs"
            className="carbs"
            currentValue={accumulatedCarbs}
            targetValue={targetCarbsValue.toFixed()}
          />
          <MacroDataDisplay
            title="fats"
            className="fats"
            currentValue={accumulatedFats}
            targetValue={targetFatValue.toFixed()}
          />
        </div>
      </div>
    </>
  );
};

export default memo(TodayNutritionSummary);
