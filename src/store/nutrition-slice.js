import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const nutritionSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    addNewEntry(state, action) {
      return [action.payload, ...state];
    },

    removeEntry(state, action) {
      return state.filter((nutrition) => nutrition.date !== action.payload);
    },

    editEntry(state, action) {
      return state.map((nutrition) => {
        if (nutrition.date !== action.payload.date) {
          return nutrition;
        }

        return action.payload;
      });
    },
    reset(state) {
      return initialState;
    },
  },
});

export const nutritionActions = nutritionSlice.actions;
export default nutritionSlice.reducer;
