import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice";
import expandNavReducer from "./slices/navBarSlice";
import msgStoreInChatSlice from "./slices/msgStoreInChatSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    expandNav: expandNavReducer,
    setMsgStoreInChat: msgStoreInChatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
