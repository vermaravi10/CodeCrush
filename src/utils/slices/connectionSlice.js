import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    setConnections: (state, action) => {
      return action.payload;
    },
    clearConnections: (state, action) => {
      return null;
    },
  },
});

export const { setConnections, clearConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
