import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  email: "",
  username: "",
  profileImage: "",
  userId: "",
  role: "", 
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
      state.userId = action.payload.user.userId;
      state.role = action.payload.user.role; 
    },
    setAccessTokenOnly: (state, action) => {
      state.accessToken = action.payload;
    },
    clearUser: (state) => {
      state.accessToken = "";
      state.email = "";
      state.username = "";
      state.profileImage = "";
      state.userId = "";
      state.role = "";
    },
  },
});

export const { setUser, setAccessTokenOnly, clearUser } = authSlice.actions;
export default authSlice.reducer;
