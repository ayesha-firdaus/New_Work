import React from 'react'
import styles from "./Signup.module.css"
import img from "../../images/signup.jpg"
import { useState } from 'react';
import Message from '../../Utils/Message/Message';
import {Link, useNavigate} from "react-router-dom"
import Button from '../../Utils/Button';

export default function Signup() {
  const [formData,setformData]=useState({name:"",email:"",password:"",passwordConfirm:"",designation:"",photo:""});
  const [error,seterror]=useState(false);
  const [loading,setloading]=useState(false);
  const [message,setmessage]=useState("");
  const Navigate=useNavigate();
  const handleChange=function(e)
  {
    e.preventDefault();
      const name=e.target.id;
      const value=e.target.value;
      if(e.target.id==="photo")
      {
        const file = e.target.files[0];

        if (file) {
          const reader = new FileReader();
    
          reader.onloadend = () => {
            // Create a temporary image element
            const img = new Image();
            img.src = reader.result;
    
            img.onload = () => {
              // Create a canvas element to resize the image
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
    
              // Set the desired width and height (you can adjust these values)
              const maxWidth = 300;
              const maxHeight = 300;
    
              let newWidth = img.width;
              let newHeight = img.height;
    
              // Resize the image while maintaining aspect ratio
              if (img.width > maxWidth) {
                newWidth = maxWidth;
                newHeight = (img.height * maxWidth) / img.width;
              }
    
              if (img.height > maxHeight) {
                newHeight = maxHeight;
                newWidth = (img.width * maxHeight) / img.height;
              }
    
              canvas.width = newWidth;
              canvas.height = newHeight;
    
              // Draw the resized image onto the canvas
              ctx.drawImage(img, 0, 0, newWidth, newHeight);
    
              // Get the data URL of the resized image
              const resizedDataURL = canvas.toDataURL('image/jpeg'); // You can change the format if needed
    
              // Set the selected image preview with the resized URL
              setformData({ ...formData, photo: resizedDataURL });
            };
          };
    
          reader.readAsDataURL(file);
        }
      }
      
      setformData((prev)=>({...prev,[name]:value}));
  }
  console.log(loading)
  const handleSubmit=async function(e)
  {
   e.preventDefault();
   try{
    setloading(true);
    seterror(false);
    setmessage("");
   const res=await fetch("/api/auth/signup",{
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
   seterror(true);
   setmessage(data.message);
   setloading(false);
   return;
   }
   setmessage(data.message);
   setloading(false)
   Navigate("/login");
  }
  catch(err)
  {
    seterror(true);
    setmessage(err.message);
    setloading(false);
    return;
    
  }
  
   
   
  }
  console.log(loading)
  console.log(formData)
  return (
    <div  className={styles.signup}>
         <div className={styles.overall}>
        <div className={styles.text}>
        <h1 className={styles.formHeading}>Sign up</h1>
        <p className={styles.para}>register to create an account</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
       
        <div className={styles.inputContainer}>
          <label htmlFor='name'>Enter Your Name</label>
          <input type='text' id='name'  onChange={handleChange} value={formData.name}/>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='email'>Enter Your Email</label>
          <input type='email' id='email'  onChange={handleChange} value={formData.email} />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='password'>Enter Your Password</label>
          <input type='password' id='password' onChange={handleChange} value={formData.password} />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='passwordConfirm'>Enter Your Password Again</label>
          <input type='password' id='passwordConfirm' onChange={handleChange} value={formData.passwordConfirm} />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='designation'>Enter Your Designation</label>
          <input type='text' id='designation' onChange={handleChange} value={formData.designation} />
        </div>
        <div className={styles.inputContainer}>
  <label htmlFor='photo'>Choose an Image</label>
  <input type='file' accept='image/*' id='photo' onChange={handleChange}  />
  {formData?.photo && <img src={formData.photo} className={styles.imgPreview}alt="Selected Preview" />}
</div>
        
        <div className={styles.inputContainer}>
         <Button category={"formButton"} type={"submit"} loading={loading} loadmessage={"submitting"} message={"submit"} />
        </div>
        <div  className={styles.inputContainer}>
          <p className={styles.message}>Have an account, <span className={styles.highlight} ><Link to="/login">Login</Link></span> then</p>
        </div>
      {message.length>0&&<Message message={message} type={error?"error":"success"}  />}

        </form>
        </div>
        
     
    </div>
  )
}
