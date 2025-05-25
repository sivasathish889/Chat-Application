import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice";
import otpReducer from "./slices/otpVerifySlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    otp : otpReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
