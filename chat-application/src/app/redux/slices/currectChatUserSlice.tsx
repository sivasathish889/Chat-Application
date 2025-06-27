import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { friendType, userType } from "../../types/user.type";

const friendState: friendType = {
  inviter_user: "",
  _id: "",
  status: 0,
};
const initialState: userType = {
  username: "",
  _id: "",
  avatar: "",
  email: "",
};
const currentChatUser = createSlice({
  initialState,
  name: "currentChatUser",
  reducers: {
    setCurrentChatUser: (state: userType, action: PayloadAction<userType>) => {
      state._id = action.payload._id;
      state.avatar = action.payload.avatar;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
  },
});

export const  setCurrentChatUser = currentChatUser.actions.setCurrentChatUser
export default currentChatUser.reducer