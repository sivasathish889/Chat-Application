import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let initialState: boolean = true;

const navExpandSlice = createSlice({
  initialState,
  name: "navExpand",
  reducers: {
    setExpandNav: (state) => {
      return !state
    },
  },
});

export const setExpandNav = navExpandSlice.actions.setExpandNav
export default navExpandSlice.reducer