import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: "caramellatte",
  reducers: {
    setTheme: (state, action) => {
      return action.payload;
    },
    clearTheme: (state, action) => {
      return "caramellatte";
    },
  },
});

export const { setTheme, clearTheme } = themeSlice.actions;
export default themeSlice.reducer;
