import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice";
import expandNavReducer from "./slices/navBarSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    expandNav: expandNavReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
