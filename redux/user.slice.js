import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: {
    data: {
      admin: false,
      logged: false,
      displayName: "",
      email: "",
    },
    uid: ""
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState(state, action) {
      console.log("[REDUX-UPDATE] user state:", action.payload);
      state.user = {
        ...action.payload,
      };
    },
  },
});

export const { setUserState } = userSlice.actions;
export const userReducer = userSlice.reducer;
