import React from 'react'
import styles from "./Formoverview.module.css";
import UserForm from '../User/UserForm';

export default function Formoverview() {

  return (
    <div className={styles.container}>
    <div className={styles.head}>
    <div className={styles.text}>
<p className={styles.heading}><strong>NIELIT KOLKATA</strong></p>
     <p className={styles.title}><strong>PURCHASE REQUISITION</strong></p>
     </div>

<div className={styles.table}>
  CDS/CC/7.4.1/F19/RO
  <br />
  <div className={styles.indentNo}>
    Indent No.:<input type="text" name=""></input>
  </div>
  </div>
</div>
 
<UserForm />


    </div>
  )
}
