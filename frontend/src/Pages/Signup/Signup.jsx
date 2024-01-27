import React from 'react'
import styles from "./Signup.module.css"
import img from "../../images/signup.jpg"
import { useState } from 'react';
export default function Signup() {
  const [formData,setformData]=useState({name:"",email:"",password:"",passwordConfirm:"",designation:"",photo:""});
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
  console.log(formData)
  return (
    <div  className={styles.signup}>
         <div className={styles.overall}>
        <div className={styles.text}>
        <h1 className={styles.formHeading}>Sign up</h1>
        <p className={styles.para}>register to create an account</p>
        </div>
        <form className={styles.form}>
       
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
         <button type='submit'>Submit</button>
        </div>
        </form>
        </div>
     
    </div>
  )
}
