import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  users: "",
};

export const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = users.actions;

export default users.reducer;
