import classes from "./WeekDayNutritionSummary.module.css";
import Button from "../UI/Button/Button";
import { TbLayoutList } from "react-icons/tb";
import { useState } from "react";
import WarningsCollectionDisplay from "../WarningsCollectionDisplay/WarningsCollectionDisplay";
import Backdrop from "../UI/Backdrop/Backdrop";
import NutritionEntriesListModal from "../UI/Modals/NutritionEntriesListModal/NutritionEntriesListModal";
import {
  MISSING_CALORIES_DATA_WARNING,
  MISSING_PROTEIN_DATA_WARNING,
  MISSING_CARBS_DATA_WARNING,
  MISSING_FAT_DATA_WARNING,
} from "../../helpers/modalMessages";

const WeekDayNutritionSummary = ({
  entries: {
    accumulatedCalories,
    accumulatedCarbs,
    accumulatedFats,
    accumulatedProteins,
    name,
    hasMissingCaloriesValues,
    hasMissingCarbsValues,
    hasMissingFatsValues,
    hasMissingProteinsValues,
    entries,
  },
}) => {
  const [isNutritionsListOpen, setIsNutritionsListOpen] = useState(false);

  const warnings = [];

  hasMissingCaloriesValues && warnings.push(MISSING_CALORIES_DATA_WARNING);
  hasMissingCarbsValues && warnings.push(MISSING_CARBS_DATA_WARNING);
  hasMissingFatsValues && warnings.push(MISSING_FAT_DATA_WARNING);
  hasMissingProteinsValues && warnings.push(MISSING_PROTEIN_DATA_WARNING);

  return (
    <>
      {isNutritionsListOpen && (
        <Backdrop>
          <NutritionEntriesListModal
            closeModal={() => setIsNutritionsListOpen(false)}
            nutrition={entries}
            date={name}
          />
        </Backdrop>
      )}

      <div className={classes.WeekDayNutritionSummary}>
        <div className={classes.heading}>
          <div className={classes.kcalsValue}>
            <span>{accumulatedCalories.toFixed()}</span>
            <span>kcals</span>
          </div>
          <WarningsCollectionDisplay warningInfosArray={warnings} />
          <div className={classes.name}>{name}</div>
        </div>
        <div className={classes.data}>
          <div className={`${classes.nutritionData} ${classes.proteinsData}`}>
            <div className={classes.value}>{accumulatedProteins.toFixed()}</div>
            <div className={classes.name}>protein</div>
          </div>
          <div className={`${classes.nutritionData} ${classes.carbsData}`}>
            <div className={classes.value}>{accumulatedCarbs.toFixed()}</div>
            <div className={classes.name}>carbs</div>
          </div>
          <div className={`${classes.nutritionData} ${classes.fatsData}`}>
            <div className={classes.value}>{accumulatedFats.toFixed()}</div>
            <div className={classes.name}>fats</div>
          </div>
          <Button
            addedClasses="thumb-button"
            onClick={() => {
              setIsNutritionsListOpen(true);
            }}
          >
            <TbLayoutList />
          </Button>
        </div>
      </div>
    </>
  );
};

export default WeekDayNutritionSummary;
