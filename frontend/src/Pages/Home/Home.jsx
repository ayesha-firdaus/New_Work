import React from 'react'
import styles from "./Home.module.css";
import img from "../../images/Hero.jpg"
import {Link,Navigate} from "react-router-dom";
import { useEffect } from 'react';
import { getItemStart,  getItemSuccessElectronics, getItemSuccessStationary, getItemSuccessCleaning, getItemError } from "../../Components/redux/Item/itemSlice";
import { useDispatch } from 'react-redux';
import Button from '../../Utils/Button';
import { getUser } from '../../Components/redux/store';

export default function Home() {



  
  return (
    <div className={styles.HomeDesign}>
  
     <div className={styles.heroTextBox}>
<h1 className={styles.heroheading}> Nielit Inventory  </h1>
<p className={styles.para}>An Inventory App that caters your needs.</p>

  {!user&&<Link to={"/signup"}><Button loadmessage='Getting Started' message='Get Started' type='normal' category='normalbtn' /></Link>}

     </div>
     <div className={styles.imgContainer}>
   <img src={img} className={styles.img} />
     </div>
    </div>
  )
}
