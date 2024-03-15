import React from 'react'
import styles from "./message.module.css";
export default function Message({message="",type=""}) {

  return (
    <div className={`${styles.messageContainer} container ${styles[type]}`} >
      <p className={styles.message} >{message}</p>
    </div>
  )
}
