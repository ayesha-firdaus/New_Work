import React, { useState } from 'react'
import { getUser } from '../../Components/redux/store'
import { Link } from 'react-router-dom';
import Button from '../../Utils/Button';
import styles from "./Profile.module.css";
import {updateInStart,updateInSuccess,updateInError} from "../../Components/redux/User/userSlice";
import { useDispatch } from 'react-redux';
import { getAlldata } from '../../Components/redux/store';
import Message from '../../Utils/Message/Message';
export default function Profile() {
    const user=getUser();
    console.log(user);
   const [profileMessage,setprofileMessage]=useState("");
   const [formData,setformData]=useState({});
   const [selectedFile,setSelectedFile]=useState(null)
   const {loading,error,message}=getAlldata();
 const dispatch=useDispatch();

 const handleChange = (event) => {
  if (event.target.id === 'photo') {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();

        img.src = reader.result;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const maxWidth = 300;
          const maxHeight = 300;

          let newWidth = img.width;
          let newHeight = img.height;

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

          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          const resizedDataURL = canvas.toDataURL('image/jpeg');

          setformData((prev) => ({ ...prev, photo: resizedDataURL }));
        };
      };

      reader.readAsDataURL(file);
    }
  } else {
    setformData((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  }
};


  const handleImageClick = () => {
    // Trigger the file input when the image is clicked
    document.getElementById('photo').click();
  };
console.log(formData)
  const handleSubmit=async function(e)
  {
    e.preventDefault();
    try{
       setprofileMessage("");
       dispatch(updateInStart());
        const res=await fetch(`/api/user/update/${user._id}`,{
            method:"PATCH",
            headers:{
                'Content-type':"application/json"
            },
            body: JSON.stringify(formData)
        })
        const data=await res.json();
        console.log(data)
        if(data.status.trim()==="fail"||data.status.trim()==="error")
        {
          dispatch(updateInError());
          setprofileMessage(data.message);
          return;
        }
    dispatch(updateInSuccess(data.user));
    setprofileMessage(data.message);
    }
    catch(err){
    dispatch(updateInError(err.message));
    setprofileMessage(data.message);
    }
  }
  return (
    <div className={styles.design}> 
      <div className={styles.overall}>
         <div className={styles.text} >
            <h1>User's Profile</h1>
            <p> Update the information</p>
         </div>
         <form className={styles.form} onSubmit={handleSubmit}>
         <div className={styles.inputContainer}>
         <img
        src={selectedFile ? URL.createObjectURL(selectedFile) : user.photo}
        className={styles.img}
        onClick={handleImageClick}
      />
      <input
        type="file"
        accept="image/*"
        id="photo"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </div>
            <div className={styles.inputContainer}>
                <label htmlFor='name'>Name</label>
                <input defaultValue={user.name} type="text" id='name' value={formData.name} onChange={handleChange}/>
            </div>
            <div  className={styles.inputContainer}>
                <label htmlFor='email' >Email</label>
                <input defaultValue={user.email} id='email' type="text" value={formData.email}  onChange={handleChange} />
            </div>
            <div  className={styles.inputContainer}>
                <label htmlFor='designation'>Designation</label>
                <input defaultValue={user.designation} id="designation" type="text" value={formData.designation}  onChange={handleChange} />
            </div>
            <div>
               <Button category={"formButton"}  message={'Update'} loadmessage='updating' loading={loading} type={"submit"}  />
            </div>
            <div className={styles.inputContainer}>
                <p className={styles.message}>click here to <span><Link to="/resetpassword">update password</Link></span></p>
            </div>
            <div className={styles.inputContainer}>
              {profileMessage.length>0&&<Message message={profileMessage} type={error?"error":"success"} />}
            </div>
             
         </form>
     
      </div>
    </div>
  )
}
