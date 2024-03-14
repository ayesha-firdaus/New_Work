import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/Header/Header';
import Navbar from './Components/NavBar/Navbar';
import Home from './Pages/Home/Home';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Pages/Profile/Profile';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import UserForm from './Pages/IndentForm/User/NewUserForm/UserForm';
import NewItem from './Pages/Items/NewItem/NewItem';
import Cookies from 'js-cookie';
import { useState,useEffect } from 'react';
import ViewItem from './Pages/Items/ViewItem/ViewItem';
import Admin from "./Pages/AdminPanel/Admin";
import ViewUserForm from './Pages/IndentForm/User/ViewUserForm/ViewUserForm';
import ApprovalList from './Pages/IndentForm/DepartmentHead/ApprovalList/ApprovalList';
import ApproveIndent from './Pages/IndentForm/DepartmentHead/ApproveIndent/ApproveIndent';

function App() {
  const [token, setToken] = useState(null);

  
  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    setToken(accessToken);
  }, []);

  return (
    <BrowserRouter>
 
        <>
          <Header />
          <Navbar token={token} />
          <Routes>
            <Route path="/" element={<Home  />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route path="" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route path="/newuserform" element={<UserForm />} />
              <Route path="/viewuserform" element={<ViewUserForm />} />
              <Route path="/newitem" element={<NewItem />} exact />
              <Route path="/viewitem" element={<ViewItem />} exact />
              <Route path='/approvallist' element={<ApprovalList />} />
              <Route path='/indentapproval/:id' element={<ApproveIndent />} />
              <Route path='/admin' element={<Admin />} />
            </Route>
          </Routes>
        </>
     
    </BrowserRouter>
  );
}

export default App;