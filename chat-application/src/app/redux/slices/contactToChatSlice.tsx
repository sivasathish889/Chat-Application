import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { friendType, userType } from "../../types/user.type";

// const friendState: friendType = {
//   inviter_user: "",
//   _id: "",
//   status: 0,
// };
const initialState: userType = {
  username: "",
  _id: "",
  avatar: "",
  email: "",
};
const contactToChatSlice = createSlice({
  initialState,
  name: "currentChatUser",
  reducers: {
    setContactToChat: (state, action: PayloadAction<userType>) => {
      return (state = action.payload);
    },
  },
});

export const  setContactToChat = contactToChatSlice.actions.setContactToChat
export default contactToChatSlice.reducer