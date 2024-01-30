import React, { Children } from 'react'
import styles from "./Button.module.css";
export default function Button({category="",message="",loadmessage="",loading="",type="",onClick}) {
  console.log(category)
  return (
    <div className={styles.button}>
      <button type={type}  disabled={loading} onClick={onClick} className={`${styles.btn} ${styles[category]}`}>{loading?loadmessage:message}</button>
    </div>
  )
}
