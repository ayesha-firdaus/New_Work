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

 const dispatch=useDispatch();
 const user=getUser();
 const category1='Electronics';
 const category2='Stationary';
 const category3='Cleaning';
  useEffect(() => {
   
    


  async function getelectronics()
  {
    try{
      dispatch(getItemStart());
    const res=await fetch(`/api/item/viewitem/${category1}`);
    const data=await res.json();
    dispatch(getItemSuccessElectronics(data.item));
    getstationary();
  }
  catch(err)
  {
    dispatch(getItemError());
  }
}
async function getstationary()
{
  try{
    dispatch(getItemStart());
    const res=await fetch(`/api/item/viewitem/${category2}`);
    const data=await res.json();
    dispatch(getItemSuccessStationary(data.item));
    getcleaning();
  }
  catch(err){
  
  }

}
async function getcleaning()
{
  try{
  const res=await fetch(`/api/item/viewitem/${category3}`);
    const data=await res.json();
    dispatch(getItemSuccessCleaning(data.item));
  }
  catch(err)
  {
    console.log(err);
  }
}

getelectronics();
  }, [category1,category2,category3]);
    
  
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
