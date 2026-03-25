import { createSlice } from "@reduxjs/toolkit";
const initialState: any = {
  services: [],
};
export const services = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
    },
  },
});

export const { setServices } = services.actions;

export default services.reducer;
