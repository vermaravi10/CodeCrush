import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/userSlice.js";
import feed from "./slices/feedSlice.js";
import connections from "./slices/connectionSlice.js";
import request from "./slices/requestSlice.js";
import theme from "./slices/themeSlice.js";

const appStore = configureStore({
  reducer: {
    user: user,
    feed: feed,
    connections: connections,
    request: request,
    theme: theme,
  },
});

export default appStore;
