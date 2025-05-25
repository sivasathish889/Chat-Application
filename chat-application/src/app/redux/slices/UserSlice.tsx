import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type userType = {
  username: String;
  email: String;
  phone: Number;
};

const initialState: userType = {
  username: "",
  email: "",
  phone: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state: userType, action: PayloadAction<userType>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    }
  },
});

export const user =  userSlice.actions;
export default userSlice.reducer;
