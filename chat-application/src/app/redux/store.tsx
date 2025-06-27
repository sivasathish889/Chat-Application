import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice";
import expandNavReducer from "./slices/navBarSlice";
import msgStoreInChatSlice from "./slices/msgStoreInChatSlice";
import chatToContactToggleSLice from "./slices/chatToContactTogle";
import currentChatUser from "./slices/currectChatUserSlice";
import contactToChat from "./slices/contactToChatSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    expandNav: expandNavReducer,
    setMsgStoreInChat: msgStoreInChatSlice,
    chatToContactToggleSLice: chatToContactToggleSLice,
    currentChatUser: currentChatUser,
    setContactToChat: contactToChat,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
