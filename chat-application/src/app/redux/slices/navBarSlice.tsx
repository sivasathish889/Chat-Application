import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = true;

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