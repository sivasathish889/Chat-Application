import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateProps = {
  username: string;
  _id: string;
  avatar: string;
  email: string;
};
const initialState: initialStateProps = {
  username: "",
  _id: "",
  avatar: "",
  email: "",
};
const contactToChatSlice = createSlice({
  initialState,
  name: "currentChatUser",
  reducers: {
    setContactToChat: (
      state: initialStateProps,
      action: PayloadAction<initialStateProps>
    ) => {
      return (state = action.payload);
    },
  },
});

export const setContactToChat = contactToChatSlice.actions.setContactToChat;
export default contactToChatSlice.reducer;
