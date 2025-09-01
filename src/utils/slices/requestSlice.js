import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    setRequests: (state, action) => {
      return action.payload;
    },
    removeRequests: (state, action) => {
      console.log("🚀 ~ state:", state);
      const newArray = state?.filter((r) => r?._id !== action.payload);
      return newArray;
    },
    clearRequests: (state, action) => {
      return null;
    },
  },
});

export const { setRequests, removeRequests, clearRequests } =
  requestSlice.actions;
export default requestSlice.reducer;
