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
const currentChatUser = createSlice({
  initialState,
  name: "currentChatUser",
  reducers: {
    setCurrentChatUser: (
      state: initialStateProps,
      action: PayloadAction<initialStateProps>
    ) => {
      state._id = action.payload._id;
      state.avatar = action.payload.avatar;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
  },
});

export const setCurrentChatUser = currentChatUser.actions.setCurrentChatUser;
export default currentChatUser.reducer;
