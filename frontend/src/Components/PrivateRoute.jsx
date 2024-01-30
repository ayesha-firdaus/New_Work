import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getUser } from './redux/store'; 
import { resetUser } from './redux/User/userSlice';// Assuming resetUser is an action to reset the user state
import { useDispatch } from 'react-redux';
export default function PrivateRoute() {
  const user = getUser();

  // Assuming you have access to dispatch
  const dispatch = useDispatch();

  // Reset user state if the user is not present
  if (!user) {
    dispatch(resetUser()); // Dispatch the action to reset user state
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}