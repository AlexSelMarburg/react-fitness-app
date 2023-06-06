import { CALCULATOR_ACTIONS } from "./NutritionEntryModal.jsx";
import {
  PROTEIN_TO_KCALS_VALUE,
  CARBS_TO_KCALS_VALUE,
  FATS_TO_KCALS_VALUE,
} from "../../../../helpers/nutritionFunctions.js";

const nutrientsArray = ["protein", "carbs", "fats", "calories"];
export function getNextNutrient(currentValue, nutrients = nutrientsArray) {
  const currentIndex = nutrients.indexOf(currentValue);
  const nextIndex = (currentIndex + 1) % nutrients.length;
  return nutrients[nextIndex];
}

export function calculateCalories(protein, carbs, fats) {
  const calories =
    protein * PROTEIN_TO_KCALS_VALUE +
    carbs * CARBS_TO_KCALS_VALUE +
    fats * FATS_TO_KCALS_VALUE;
  return Math.floor(calories);
}

export function reducer(state, { type, payload }) {
  switch (type) {
    case CALCULATOR_ACTIONS.SELECT_NUTRITION_TYPE:
      return {
        ...state,
        editedNutrition: payload.nutritionName,
        operandLeft: null,
        operandRight: null,
        operator: null,
      };

    case CALCULATOR_ACTIONS.ADD_DIGIT:
      if (state.operandLeft?.length >= 7 || state.operandRight?.length >= 7)
        return state;

      const digitsAfterDotLeft = state.operandLeft?.split(".")[1];
      const digitsAfterDotRight = state.operandRight?.split(".")[1];

      if (
        (digitsAfterDotLeft &&
          digitsAfterDotLeft.length >= 2 &&
          !state.operator) ||
        (digitsAfterDotRight && digitsAfterDotRight.length >= 2)
      ) {
        return state;
      }

      if (payload.digit === "0" && state.operandLeft === "0") {
        return state;
      }

      if (state.operandLeft === "0" && payload.digit !== ".") {
        return state;
      }

      if (
        payload.digit === "." &&
        state.operandLeft &&
        !state.operator &&
        state.operandLeft.includes(".")
      )
        return state;

      if (
        payload.digit === "." &&
        state.operandRight &&
        state.operandRight.includes(".")
      )
        return state;

      if (state.operator) {
        if (payload.digit === "0" && state.operandRight === "0") return state;

        return {
          ...state,
          operandRight: `${state.operandRight || ""}${payload.digit}`,
        };
      }

      return {
        ...state,
        operandLeft: `${state.operandLeft || ""}${payload.digit}`,
      };

    case CALCULATOR_ACTIONS.CLEAR:
      return {
        ...state,
        operandLeft: null,
        operandRight: null,
        operator: null,
      };

    case CALCULATOR_ACTIONS.SELECT_OPERATOR:
      if (!state.operandLeft && !state.operandRight) return state;

      if (state.operator !== null) return state;

      if (!state.operandRight) {
        return {
          ...state,
          operator: payload.operator,
        };
      }

      break;

    case CALCULATOR_ACTIONS.CALCULATE:
      if (state.operandLeft === null || state.operandLeft === ".") {
        return state;
      }

      const value = calculate(state);

      if (value !== null) {
        return {
          ...state,
          [state.editedNutrition]: value,
          editedNutrition: getNextNutrient(state.editedNutrition),
          operandLeft: null,
          operandRight: null,
          operator: null,
        };
      }

    case CALCULATOR_ACTIONS.CALCULATE_KCALS:
      return {
        ...state,
        calories: calculateCalories(state.protein, state.carbs, state.fats),
      };

    default:
      return state;
  }
}

function calculate({
  operandLeft,
  operator,
  operandRight,
  editedNutrition = "calories",
}) {
  const left = parseFloat(operandLeft);
  const right = parseFloat(operandRight);

  if (!isNaN(left) && operandLeft && !operandRight) {
    if (left > 9999.99 || right > 9999.9) {
      return "9999";
    }

    return editedNutrition === "calories" ? left?.toFixed() : left?.toFixed(1);
  }

  if (isNaN(right)) return null;

  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    ":": (a, b) => a / b,
  };

  const operation = operators[operator];
  const computation = operation(left, right);

  if (computation > 9999.99) {
    return "9999";
  }

  if (computation < 0) return "0";

  return editedNutrition === "calories"
    ? computation.toFixed()
    : computation.toFixed(1);
}
