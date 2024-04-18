import { createSlice } from "@reduxjs/toolkit";

export const notlarSlice = createSlice({
  name: "connectCheck",
  initialState: {
    connect: 0,
  },
  reducers: {
    checkConnectFunc: (state, action) => {
      state.connect = state.connect + action.payload;
    },
  },
});
export const { checkConnectFunc } = notlarSlice.actions;
export default notlarSlice.reducer;
