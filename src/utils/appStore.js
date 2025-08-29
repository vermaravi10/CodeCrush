import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/userSlice.js";
import feed from "./slices/feedSlice.js";
import connections from "./slices/connectionSlice.js";

const appStore = configureStore({
  reducer: {
    user: user,
    feed: feed,
    connections: connections,
  },
});

export default appStore;
