import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    create(_, actions) {
      return actions.payload;
    },
    updatePAL(state, actions) {
      return { ...state, palLevel: actions.payload };
    },
    reset() {
      return initialState;
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice.reducer;
