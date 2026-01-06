// import { createSlice } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: JSON.parse(localStorage.getItem("isAuth")) || false
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuth = true;
      localStorage.setItem("isAuth", true);
    },
    logout: (state) => {
      state.isAuth = false;
      localStorage.removeItem("isAuth");
    }
  }
});

export const { loginSuccess, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
