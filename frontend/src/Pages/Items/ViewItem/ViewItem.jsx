import React, { useEffect, useState } from 'react';
import SingleItem from '../ViewSingleItem/SingleItem';
import { getElectronics,getStationary,getCleaning, getUser } from '../../../Components/redux/store';

import styles from "./Viewitem.module.css"
import Message from '../../../Utils/Message/Message';
import Button from '../../../Utils/Button';
import SingleNewItem from '../ViewSingleItem/SingleNewItem';
export default function ViewItem() {
   const user=getUser();
   console.log(user)
  const electronics=getElectronics();
  const stationary=getStationary();
  const cleaning=getCleaning();
  const [pending,setpending]=useState(null)
  const [loading,setloading]=useState(false);
  const [error,seterror]=useState(false);
  const [message,setmessage]=useState(false)

  console.log(status)
  const PendingHandler = async function () {
   try {
     setloading(true);
     setmessage("");
     seterror(false);
     const res = await fetch("/api/item/viewpendingitem");
     const data = await res.json();
     if (data.status === "error" || data.status === "fail") {
       setloading(false);
       setmessage(data.message);
       seterror(true);
       setTimeout(() => {
         setmessage(""); // Clear the message after 5 seconds
       }, 5000);
       return;
     }
     setpending(data.item);
     setloading(false);
     setmessage(data.message);
     setTimeout(() => {
       setmessage(""); // Clear the message after 5 seconds
     }, 5000);
   } catch (err) {
     setloading(false);
     setmessage(data.message);
     seterror(true);
     setTimeout(() => {
       setmessage(""); // Clear the message after 5 seconds
     }, 5000);
   }
 };
  return (
    <div className={`${styles.container} container`}>
    <div>
    <h1>Electronics</h1>
     <table>
        <thead>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Item Category</th>
            <th>Item Description</th>
            <th>Item Unit</th>

        </thead>
        <tbody>
           {electronics?.map(el=>{
              return <SingleItem item={el} />
           })}
        </tbody>
     </table>
    </div>
    <div>
    <h1>Stationary</h1>
     <table>
        <thead>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Item Category</th>
            <th>Item Description</th>
            <th>Item Unit</th>

        </thead>
        <tbody>
           {stationary?.map(el=>{
              return <SingleItem item={el} />
           })}
        </tbody>
     </table>
    </div>
    <div>
    <h1>Cleaning</h1>
     <table>
        <thead>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Item Category</th>
            <th>Item Description</th>
            <th>Item Unit</th>

        </thead>
        <tbody>
           {cleaning?.map(el=>{
              return <SingleItem item={el} />
           })}
        </tbody>
     </table>
    </div>
  {!pending&& <Button onClick={PendingHandler} type="button" loading={loading} category="normalbtn" loadmessage="showing pending items" message="show pending items"  />} 
   {message&&<Message message={message} type={error?"error":"success"} />}
   {pending&&<div>
    <h1>New Item Pending For Approval</h1>
     {pending.length===0?<Message message="No items here" type="success" />:<table>
        <thead>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Item Category</th>
            <th>Item Description</th>
            <th>Item Unit</th>
            <th>Item Created by</th>
            <th>Item Status</th>
            
            

        </thead>
        <tbody>
        {pending?.map(el=>{
        return <SingleNewItem key={el._id} el={el} PendingHandler={Pendin} />
        })}
        </tbody>
     </table>}
    </div>}
    </div>
  )
}
