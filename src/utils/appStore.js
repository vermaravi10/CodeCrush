import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/userSlice.js";

const appStore = configureStore({
  reducer: {
    user: user,
  },
});

export default appStore;
