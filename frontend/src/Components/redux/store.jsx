import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/User/userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import { useSelector } from "react-redux";

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
export const getUser=function()
{
    const user=useSelector(state=>state.user?.user);
    return user!==null? user:"";
}
export const getAlldata=function(){
  const {loading,error,message}=useSelector(state=>state.user);
  return {loading,error,message};
}