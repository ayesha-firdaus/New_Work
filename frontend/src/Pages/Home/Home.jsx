import React from 'react'
import styles from "./Home.module.css";
import img from "../../images/Hero.jpg"
import {Link} from "react-router-dom";
import { useEffect } from 'react';
import Cookies from 'js-cookie';
export default function Home() {
  useEffect(() => {
    const token = Cookies.get('access_token');
     console.log(token)
    if (!token) {
      // Token is not present, remove persisted state from localStorage
      localStorage.removeItem('persist:root');
      console.log('Token is not present, persisted state removed');
    }
  }, []);
  return (
    <div className={styles.HomeDesign}>
  
     <div className={styles.heroTextBox}>
<h1 className={styles.heroheading}> Nielit Inventory  </h1>
<p>An Inventory App that caters your needs.</p>
<button><Link to={"/signup"}>Get Started</Link></button>

     </div>
     <div className={styles.imgContainer}><img className={styles.img} src={img}/></div>
    </div>
  )
}
