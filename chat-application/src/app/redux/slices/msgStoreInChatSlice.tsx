import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateProp = {
  senderId?: string;
  receiverId?: string;
  message: string;
  createdAt: string;
  chatStatus: "Sender" | "Receiver";
};
const initialState: initialStateProp[] = [
  {
    senderId: "",
    receiverId: "",
    message: "",
    createdAt: "",
    chatStatus: "Sender",
  },
];

const msgStoreInChat = createSlice({
  initialState,
  name: "msgStoreInChat",
  reducers: {
    setMsgStoreInChat: (state, action: PayloadAction<initialStateProp>) => {
      state.push({
        message: action.payload.message,
        receiverId: action.payload.receiverId,
        senderId: action.payload.senderId,
        createdAt: action.payload.createdAt,
        chatStatus: action.payload.chatStatus,
      });
    },
  },
});

export const setMsgStoreInChat = msgStoreInChat.actions.setMsgStoreInChat;
export default msgStoreInChat.reducer;
