import React, { useState } from 'react'
import styles from "./StoreTender.module.css"
export default function StoreTender() {
     const [formData,setformData]=useState({tenderNo:'',datedTender:"",dueDate:"",purchaseNo:"",purchaseDate:""});
  return (
    <div>
      
      <form className={styles.tender}>
                <h4 className='last1'>For Stores & Purchase Section only.</h4>

                <label className='last2'>Enquiry / Tender No.:</label><input type='text'></input> 
                <div className={styles.container}>
               <div >
                <label className='date'>Dated:</label><input type='date'></input></div>
                <div><label className='duedate'>Due Date:</label><input type='date'></input></div>
                </div>
                <div className={styles.container}>
                <div><label className='po'>P.O No.:</label><input type='text'></input></div>
                <div> <label className='date1'>Dated:</label><input type='date'></input></div>
                </div>
              </form>
    </div>
  )
}
