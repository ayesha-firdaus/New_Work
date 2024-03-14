import React, { useState } from 'react'
import Styles from "./Admin.module.css"
export default function Admin() {
    const [formData,setformData]=useState({approval:""});
    console.log(formData);
  return (
    <div>
    <form className={Styles.form}>
    <h4>For Admin</h4>
    <div className={Styles.inputContainer}>
            <label>Approved</label>
            <input
              type="checkbox"
              id="AdminYes"
               name='yes'
               onChange={(e)=>setformData(prev=>({...prev,approval:e.target.name}))}
               checked={formData.approval==="yes"}
            />
          </div>
          <div className={Styles.inputContainer}>
            <label> Not Approved</label>
            <input
  type="checkbox"
  id="AdminNo"
  name='no'
  onChange={(e)=>setformData(prev=>({...prev,approval:e.target.name}))}
  checked={formData.approval==="no"}


/> 
</div>
    </form>
    </div>
  )
}
