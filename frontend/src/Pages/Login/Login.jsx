import React from 'react'

import styles from "./Login.module.css"
import img from "../../images/signup.jpg"
import { useState } from 'react';
import Message from '../../Utils/Message/Message';
import {Link, useNavigate} from "react-router-dom"
import Button from '../../Utils/Button';
import {signInStart,signInSucess,signInError} from "../../Components/redux/User/userSlice";
import { useDispatch,useSelector } from 'react-redux';
export default function Login() {
 const [formData,setformData]=useState({email:"",password:""});
      const {loading,error,message,user}=useSelector(state=>state.user);
      console.log(loading,error,message,user)
      const dispatch=useDispatch();
      const Navigate=useNavigate();
      const handleChange=function(e)
      {
        e.preventDefault();
          const name=e.target.id;
          const value=e.target.value;
      
          
          setformData((prev)=>({...prev,[name]:value}));
      }
   
      const handleSubmit=async function(e)
      {
       e.preventDefault();
       try{
       dispatch(signInStart);
       const res=await fetch("/api/auth/login",{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)
       })
       const data=await res.json();
       console.log(data);
      if(data.status==="fail"||data.status==="error")
       {
        dispatch(signInError(data.message));
       return;
       }
      dispatch(signInSucess({user:data.user,message:data.message}))
       Navigate("/");
      }
      catch(err)
      {
        dispatch(signInError(err.message));
        return;
        
      }
      
       
       
      }
      console.log(loading)
      console.log(formData)
      return (
        <div  className={styles.signup}>
             <div className={styles.overall}>
            <div className={styles.text}>
            <h1 className={styles.formHeading}>Log in</h1>
            <p className={styles.para}>Welcome again</p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
           
          
            <div className={styles.inputContainer}>
              <label htmlFor='email'>Enter Your Email</label>
              <input type='email' id='email'  onChange={handleChange} value={formData.email} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor='password'>Enter Your Password</label>
              <input type='password' id='password' onChange={handleChange} value={formData.password} />
            </div>
          
           
           
            
            <div className={styles.inputContainer}>
             <Button category={"formButton"} type={"submit"} loading={loading} loadmessage={"submitting"} message={"submit"} />
            </div>
            <div  className={styles.inputContainer}>
              <p className={styles.message}>Dont have an account, <span className={styles.highlight} ><Link to="/signup">Signup</Link></span> then</p>
            </div>
          {message?.length>0&&<Message message={message} type={error?"error":"success"}  />}
    
            </form>
            </div>
            
         
        </div>
      )
    }
    

