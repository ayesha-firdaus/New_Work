import { useState } from "react";
import React from 'react'
import styles from "./ResetPassword.module.css"

export default function ResetPassword() {
    const [showpassword,setshowpassword]=useState(false);
    const [showconfirmPassword,setshowconfirmPassword]=useState(false)
    const [shownewPassword,setshownewPassword]=useState(false)
  return (
    <div >
      <div className={styles.password}>
             
             <div>
                 <label>Current Password</label>
                 <input type={showpassword?"text":"password"} />
                 <span> <input type='checkbox' onClick={()=>setshowpassword(prev=>!prev)}/><p>show password</p></span>
                

             </div>
             <div>
                 <label> New Password</label>
                 <input type={shownewPassword?"text":"password"} />
                 <span> <input type='checkbox' onClick={()=>setshownewPassword(prev=>!prev)}/><p>show password</p></span>
                

             </div>
             <div>
                 <label> Password Confirm</label>
                 <input type={showconfirmPassword?"text":"password"} />
                 <span> <input type='checkbox' onClick={()=>setshowconfirmPassword(prev=>!prev)}/><p>show password</p></span>
                

             </div>
         </div>
       

    </div>
  )
}
