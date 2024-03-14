import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, error: false, user: null };

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSucess: (state, action) => {
      state.loading = false;
      state.user = action.payload;

    },
    signInError: (state, action) => {
      state.error = true;
      state.loading = false;
  
    },
    updateInStart: (state) => {
      state.loading = true;
  
      state.error=false;
      
    },
    updateInSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;

    },
    updateInError: (state, action) => {
      state.error = true;
      state.loading=false;
 
    },
    signoutStart:(state)=>{
      state.loading=true;
    },
    signoutSuccess:(state)=>{
      state.loading=false;
      state.user=null;
      state.error=false;
    },
    signoutFailure:(state,action)=>{
      state.loading=false;
      state.error=true;
    },
    resetSetting:(state)=>{
      state.loading = false;
      state.message = "",
      state.error = false;
    },
    resetUser: (state) => {
      // Reset the state to its initial value
      state.loading = false;
      state.error = false;
      state.user = null;
      state.message = "";
    },
  },
});

export const {
  signInStart,
  signInSucess,
  signInError,
  updateInStart,
  updateInSuccess,
  updateInError,
  resetUser,
  signoutStart,
  signoutSuccess,
  signoutFailure // Add the resetUser action
} = userReducer.actions;

export default userReducer.reducer;