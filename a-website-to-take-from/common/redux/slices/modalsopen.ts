import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  modals: {
    quixies: false,
    config: false,
    isProjectOpen: "",
    currentChat: "",
  },
};

export const modals = createSlice({
  name: "modals",
  initialState,
  reducers: {
    set_modals: (state, action) => {
      state.modals = action.payload;
    },
  },
});

export const { set_modals } = modals.actions;

export default modals.reducer;
