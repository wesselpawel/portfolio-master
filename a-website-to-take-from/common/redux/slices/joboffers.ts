import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  job_offers: "",
};

export const job_offers = createSlice({
  name: "job_offers",
  initialState,
  reducers: {
    set_job_offers: (state, action) => {
      state.job_offers = action.payload;
    },
  },
});

export const { set_job_offers } = job_offers.actions;

export default job_offers.reducer;
