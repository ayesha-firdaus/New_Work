import { createSlice } from "@reduxjs/toolkit";

const ItemSlice = createSlice({
  name: 'item',
  initialState: {
    loading: false,
    electronics: null,
    stationary: null,
    cleaning: null,
    error: false,
  },
  reducers: {
    getItemStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getItemSuccessElectronics: (state, action) => {
      state.loading = false;
      state.electronics = action.payload;
    
    },
    getItemSuccessStationary: (state, action) => {
      state.loading = false;
      state.stationary = action.payload;
    
    },
    getItemSuccessCleaning: (state, action) => {
      state.loading = false;
      state.cleaning = action.payload;
    
    },
  
  
    getItemError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { getItemStart,  getItemSuccessElectronics, getItemSuccessStationary, getItemSuccessCleaning, getItemError } = ItemSlice.actions;

export default ItemSlice.reducer;