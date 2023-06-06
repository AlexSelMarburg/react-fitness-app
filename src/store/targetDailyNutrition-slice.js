import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  targetDailyCalories: 2100,
  targetDailyProtein: {
    dynamicValue: 2,
    staticValue: 200,
    isUsingDynamicValue: false,
  },
  targetDailyCarbs: {
    staticValue: 200,
  },
  targetDailyFat: {
    dynamicValue: 1,
    staticValue: 50, //465kcals
    isUsingDynamicValue: false,
  },
};

const targetDailyNutritionSlice = createSlice({
  name: "targetDailyNutrition",
  initialState,
  reducers: {
    setDailyCalories(state, actions) {
      state.targetDailyCalories = actions.payload;
    },

    setDailyCarbs(state, actions) {
      state.targetDailyCarbs.staticValue = actions.payload;
    },

    setDailyProteinIsUsingDynamicValue(state, actions) {
      state.targetDailyProtein.isUsingDynamicValue = actions.payload;
    },

    increaseProteinDynamicValue(state) {
      if (state.targetDailyProtein.dynamicValue < 3.5) {
        const newValue = state.targetDailyProtein.dynamicValue + 0.1;

        state.targetDailyProtein.dynamicValue = Number(newValue.toFixed(1));
      }
    },
    decreaseProteinDynamicValue(state) {
      if (state.targetDailyProtein.dynamicValue > 0.5) {
        const newValue = state.targetDailyProtein.dynamicValue - 0.1;

        state.targetDailyProtein.dynamicValue = Number(newValue.toFixed(1));
      }
    },
    setProteinStaticValue(state, actions) {
      state.targetDailyProtein.staticValue = actions.payload;
    },

    setDailyFatIsUsingDynamicValue(state, actions) {
      state.targetDailyFat.isUsingDynamicValue = actions.payload;
    },

    increaseFatDynamicValue(state) {
      if (state.targetDailyFat.dynamicValue < 3.5) {
        const newValue = state.targetDailyFat.dynamicValue + 0.1;

        state.targetDailyFat.dynamicValue = Number(newValue.toFixed(1));
      }
    },

    decreaseFatDynamicValue(state) {
      if (state.targetDailyFat.dynamicValue > 0.5) {
        const newValue = state.targetDailyFat.dynamicValue - 0.1;

        state.targetDailyFat.dynamicValue = Number(newValue.toFixed(1));
      }
    },
    setFatStaticValue(state, actions) {
      state.targetDailyFat.staticValue = actions.payload;
    },
  },
});

export const targetDailyNutritionActions = targetDailyNutritionSlice.actions;

export default targetDailyNutritionSlice.reducer;
