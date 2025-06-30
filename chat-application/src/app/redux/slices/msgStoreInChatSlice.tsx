import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Msg = {
  message: string;
  senderId: string;
  receiverId: string;
  createdAt?: string;
};
const initialState: Msg[] = [];

const msgStoreInChat = createSlice({
  initialState,
  name: "msgStoreInChat",
  reducers: {
    setMsgStoreInChat: (state, action: PayloadAction<Msg>) => {
      const exists = state.some(
        (msg) =>
          msg.message === action.payload.message &&
          msg.senderId === action.payload.senderId &&
          msg.receiverId === action.payload.receiverId &&
          msg.createdAt === action.payload.createdAt
      );
      if (!exists) {
        state.push({
          message: action.payload.message,
          receiverId: action.payload.receiverId,
          senderId: action.payload.senderId,
          createdAt: action.payload.createdAt,
        });
      }
    },
  },
});

export const setMsgStoreInChat = msgStoreInChat.actions.setMsgStoreInChat;
export default msgStoreInChat.reducer;
