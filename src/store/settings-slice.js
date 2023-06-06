import { createSlice } from "@reduxjs/toolkit";

const initialState = { navbarTheme: "", navbarDisabled: true };

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeNavbarTheme(state, action) {
      state.navbarTheme = action.payload;
    },
    isNavbarDisabled(state, action) {
      state.navbarDisabled = action.payload;
    },
  },
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
