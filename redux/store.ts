import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "./slices/posts";
import servicesReducer from "./slices/services";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    services: servicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
