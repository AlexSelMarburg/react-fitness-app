import classes from "./NutritionSelection.module.css";
import { CALCULATOR_ACTIONS } from "../NutritionEntryModal";

const NutritionSelection = ({ dispatch, value, editedNutrition }) => {
  return (
    <div className={classes.NutritionSelection}>
      <div className={classes.currentNutritionValueDisplay}>
        {value ?? "k.A"}
      </div>
      <div className={classes.nutritionTypeSelectionBtns}>
        <div
          onClick={() =>
            dispatch({
              type: CALCULATOR_ACTIONS.SELECT_NUTRITION_TYPE,
              payload: { nutritionName: "protein" },
            })
          }
          className={`${classes.proteinsSelector}  ${
            classes.nutritionSelector
          } ${editedNutrition === "protein" ? classes.active : null}`}
        >
          protein
        </div>
        <div
          onClick={() =>
            dispatch({
              type: CALCULATOR_ACTIONS.SELECT_NUTRITION_TYPE,
              payload: { nutritionName: "carbs" },
            })
          }
          className={`${classes.carbsSelector}  ${classes.nutritionSelector} ${
            editedNutrition === "carbs" ? classes.active : null
          }`}
        >
          carbs
        </div>
        <div
          onClick={() =>
            dispatch({
              type: CALCULATOR_ACTIONS.SELECT_NUTRITION_TYPE,
              payload: { nutritionName: "fats" },
            })
          }
          className={`${classes.fatsSelector}  ${classes.nutritionSelector} ${
            editedNutrition === "fats" ? classes.active : null
          }`}
        >
          fats
        </div>
        <div
          onClick={() =>
            dispatch({
              type: CALCULATOR_ACTIONS.SELECT_NUTRITION_TYPE,
              payload: { nutritionName: "calories" },
            })
          }
          className={`${classes.kcalsSelector} ${classes.nutritionSelector} ${
            editedNutrition === "calories" ? classes.active : null
          }`}
        >
          kcals
        </div>
      </div>
    </div>
  );
};

export default NutritionSelection;
