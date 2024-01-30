import Header from './Components/Header/Header';
import './App.css'
import UserForm from './Pages/IndentForm/User/UserForm';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Navbar from './Components/NavBar/Navbar';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Pages/Profile/Profile';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
function App() {


  return (
    <BrowserRouter>
     <Header />
     <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userform" element={<UserForm />} />
        <Route path="" element={<PrivateRoute />} >
           <Route path="/profile" element={<Profile />} />
           <Route path="/resetpassword" element={<ResetPassword />} />
    </Route>
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
