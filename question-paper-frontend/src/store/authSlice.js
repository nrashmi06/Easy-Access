import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  email: "",
  username: "",
  profileImage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.user.email;
      state.username = action.payload.user.name;
      state.profileImage = action.payload.user.profileImage;
    },
    clearUser: (state) => {
      state.accessToken = "";
      state.email = "";
      state.username = "";
      state.profileImage = "";
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
