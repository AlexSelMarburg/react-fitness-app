import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const bodyWeightsSlice = createSlice({
  name: "bodyWeights",
  initialState,
  reducers: {
    addNewEntry(state, action) {
      return [action.payload, ...state];
    },
    removeEntry(state, action) {
      return state.filter((bodyWeight) => bodyWeight.date !== action.payload);
    },
    reset(state) {
      return initialState;
    },
  },
});

export const bodyWeightsActions = bodyWeightsSlice.actions;

export default bodyWeightsSlice.reducer;
