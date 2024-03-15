import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import ViewItem from './Pages/Items/ViewItem/ViewItem';
import Admin from "./Pages/AdminPanel/Admin";
import ViewUserFormList from './Pages/IndentForm/User/ViewUserForm/ViewUserFormList/ViewUserFormList';
import ApprovalList from './Pages/IndentForm/DepartmentHead/ApprovalList/ApprovalList';
import ApproveIndent from './Pages/IndentForm/DepartmentHead/ApproveIndent/ApproveIndent';
import ViewUserFormitem from './Pages/IndentForm/User/ViewUserForm/ViewUserFormitem/ViewUserFormitem';
import { useDispatch } from 'react-redux';
import { getItemStart, getItemSuccessElectronics, getItemSuccessStationary, getItemSuccessCleaning, getItemError } from './Components/redux/Item/itemSlice'; // Update the import path

function App() {
  const dispatch = useDispatch();
  const category1 = 'Electronics';
  const category2 = 'Stationary';
  const category3 = 'Cleaning';

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(getItemStart());

        const resElectronics = await fetch(`/api/item/viewitem/${category1}`);
        const dataElectronics = await resElectronics.json();
        dispatch(getItemSuccessElectronics(dataElectronics.item));

        const resStationary = await fetch(`/api/item/viewitem/${category2}`);
        const dataStationary = await resStationary.json();
        dispatch(getItemSuccessStationary(dataStationary.item));

        const resCleaning = await fetch(`/api/item/viewitem/${category3}`);
        const dataCleaning = await resCleaning.json();
        dispatch(getItemSuccessCleaning(dataCleaning.item));
      } catch (err) {
        dispatch(getItemError());
      }
    }

    fetchData();
  }, [category1, category2, category3, dispatch]);

  return (
    <BrowserRouter>
      <>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/newuserform" element={<UserForm />} />
            <Route path="/viewuserform" element={<ViewUserFormList />} />
            <Route path="/viewuserform/:id" element={<ViewUserFormitem />} />
            <Route path="/newitem" element={<NewItem />} exact />
            <Route path="/viewitem" element={<ViewItem />} exact />
            <Route path="/approvallist" element={<ApprovalList />} />
            <Route path="/indentapproval/:id" element={<ApproveIndent />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;