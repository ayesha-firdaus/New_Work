import React from 'react'
import styles from "./message.module.css";
export default function Message({message="",type=""}) {
  console.log(type)
  return (
    <div className={`${styles.messageContainer} ${styles[type]}`} >
      <p className={styles.message} >{message}</p>
    </div>
  )
}
