import React, { Children } from 'react'
import styles from "./Button.module.css";
export default function Button({type,onClick,children}) {
  return (
    <div className={styles.button}>
      <button type='button' onClick={onClick} className={`${styles.btn} ${styles.type}`}>{children}</button>
    </div>
  )
}
