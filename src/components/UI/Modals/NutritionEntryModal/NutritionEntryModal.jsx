import classes from "./NutritionEntryModal.module.css";
import React, { useReducer, useState, useCallback, useEffect } from "react";
import Button from "../../Button/Button";
import { MdOutlineBackspace, MdClear, MdCheck } from "react-icons/md";
import { TiDivide, TiPlus, TiMinus, TiEquals, TiTimes } from "react-icons/ti";
import NutritionValueDisplay from "./NutritionValueDisplay/NutritionValueDisplay";
import NutritionSelection from "./NutritionSelection/NutritionSelection";
import DigitButton from "./DigitButton/DigitButton";
import OperatorButton from "./OperatorButton/OperatorButton";

import {
  reducer,
  getNextNutrient,
  calculateCalories,
} from "./NutritionEntryFunctions";

export const CALCULATOR_ACTIONS = {
  SELECT_NUTRITION_TYPE: "select-nutrition-type",
  SELECT_OPERATOR: "select-operator",
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  CALCULATE: "calculate",
  CALCULATE_KCALS: "calculate-kcals",
};

const initialState = {
  editedNutrition: "protein",
  calories: null,
  protein: null,
  carbs: null,
  fats: null,
  operandLeft: null,
  operandRight: null,
  operator: null,
};

const NutritionEntryModal = ({
  onAcceptMealData,
  onAbortMealEditing,
  data = null,
}) => {
  const state = data ? { ...initialState, ...data } : initialState;
  const [modalState, dispatch] = useReducer(reducer, state);

  const {
    editedNutrition,
    calories,
    protein,
    carbs,
    fats,
    operandLeft,
    operandRight,
    operator,
    date,
  } = modalState;

  useEffect(() => {
    if (fats !== null && protein !== null && carbs !== null) {
      dispatch({
        type: CALCULATOR_ACTIONS.CALCULATE_KCALS,
      });
    }
  }, [fats, protein, carbs]);

  const handleMealData = useCallback(() => {
    if (![calories, carbs, fats, protein].some((val) => val !== null)) {
      return;
    }

    const parsedData = {
      calories: calories !== null ? parseFloat(calories) : null,
      carbs: carbs !== null ? parseFloat(carbs) : null,
      fats: fats !== null ? parseFloat(fats) : null,
      protein: protein !== null ? parseFloat(protein) : null,
      date: date ? date : new Date(),
    };

    onAcceptMealData(parsedData);
  }, [calories, carbs, fats, protein, onAcceptMealData]);

  return (
    <div className={classes.NutritionEntryModal}>
      <div className={classes.nutritionValuesContainer}>
        <NutritionValueDisplay
          isEdited={editedNutrition === "protein"}
          value={protein}
          type="Eiweiß"
          addedClasses="proteinValueDisplay"
        />
        <NutritionValueDisplay
          isEdited={editedNutrition === "carbs"}
          value={carbs}
          type="Kohlenhydrate"
          addedClasses="carbsValueDisplay"
        />
        <NutritionValueDisplay
          isEdited={editedNutrition === "fats"}
          value={fats}
          type="Fett"
          addedClasses="fatsValueDisplay"
        />
        <NutritionValueDisplay
          isEdited={editedNutrition === "calories"}
          value={calories}
          type="Kalorien"
          unit="kcals"
          addedClasses="kcalsValueDisplay"
        />
      </div>

      <div className={classes.operandsDisplay}>
        {operandLeft}
        <span className={classes.operatorDisplay}> {operator} </span>{" "}
        {operandRight}
      </div>

      <div className={classes.nutritionValuesRecordContainer}>
        <NutritionSelection
          value={modalState[editedNutrition]}
          dispatch={dispatch}
          editedNutrition={editedNutrition}
        />

        <div className={classes.nutritionNumPad}>
          <OperatorButton
            symbol={<TiTimes />}
            operator="*"
            dispatch={dispatch}
          />
          <OperatorButton
            symbol={<TiDivide />}
            operator=":"
            dispatch={dispatch}
          />
          <OperatorButton
            symbol={<TiMinus />}
            operator="-"
            dispatch={dispatch}
          />
          <OperatorButton
            symbol={<TiPlus />}
            operator="+"
            dispatch={dispatch}
          />

          <DigitButton digit="7" dispatch={dispatch} />
          <DigitButton digit="8" dispatch={dispatch} />
          <DigitButton digit="9" dispatch={dispatch} />
          <DigitButton digit="0" dispatch={dispatch} />

          <DigitButton digit="4" dispatch={dispatch} />
          <DigitButton digit="5" dispatch={dispatch} />
          <DigitButton digit="6" dispatch={dispatch} />
          <Button
            onClick={() => {
              dispatch({
                type: CALCULATOR_ACTIONS.ADD_DIGIT,
                payload: { digit: "." },
              });
            }}
          >
            &#x275C;
          </Button>

          <DigitButton digit="1" dispatch={dispatch} />
          <DigitButton digit="2" dispatch={dispatch} />
          <DigitButton digit="3" dispatch={dispatch} />

          <Button onClick={() => dispatch({ type: CALCULATOR_ACTIONS.CLEAR })}>
            AC
          </Button>

          <Button
            addedClasses={classes.calculateBtn}
            onClick={() => dispatch({ type: CALCULATOR_ACTIONS.CALCULATE })}
          >
            <TiEquals />
          </Button>
          <Button onClick={onAbortMealEditing} addedClasses={classes.abortBtn}>
            <MdClear />
          </Button>
          <Button addedClasses={classes.confirmBtn} onClick={handleMealData}>
            <MdCheck />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NutritionEntryModal);
