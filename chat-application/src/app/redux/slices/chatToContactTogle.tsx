import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ChatToContactToggleStateProp = "chats" | "contacts";

const initialState = "chats" as ChatToContactToggleStateProp;

const chatToContactToggleSLice = createSlice({
  initialState,
  name: "chatToContactToggle",
  reducers: {
    toggleChatToContact: (
      state,
      action: PayloadAction<ChatToContactToggleStateProp>
    ) => {
      return state = action.payload;
    },
  },
});

export const setToggleChatToContact =
  chatToContactToggleSLice.actions.toggleChatToContact;
export default chatToContactToggleSLice.reducer;
