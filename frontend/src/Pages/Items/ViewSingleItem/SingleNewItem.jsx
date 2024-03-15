import React, { useState } from 'react'
import { getUser} from '../../../Components/redux/store';
import Button from '../../../Utils/Button';
import Message from '../../../Utils/Message/Message';

export default function SingleNewItem({el,PendingHandler}) {
    const [status,setstatus]=useState("pending")
    const user = getUser();
    const isAdmin=user?.role==="StoreManager"
    const [loading,setloading]=useState(false);
    const [error,seterror]=useState(false);
    const [message,setmessage]=useState(false)
  const updateHandler=async function()
  {
    try{
        setloading(true);
        setmessage("");
        seterror(false);
    const res=await fetch(`/api/item/approvenewitem/${el._id}`,{
        method:"Post",
        headers:{
            'Content-Type':'application/json',

        },
        body:JSON.stringify({status:status})

    })     
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

    setloading(false);
    setmessage(data.message);
    PendingHandler()
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
  }
  return (
    <>
           <tr>
           <td>{el.itemcode}</td>
           <td>{el.itemname}</td>
           <td>{el.category}</td>
           <td>{el.description}</td>
           <td>{el.unit}</td>
           <td>{el.userName}</td>
           {isAdmin?
           <td>
           <select value={status} onChange={(e) => setstatus(e.target.value)}>
           
    <optgroup label='Select an option' ></optgroup>
    <option>Pending</option>
    <option value="approved">approved</option>
    <option value="rejected">rejected</option>
  </select>
  <Button message={"Update"} onClick={updateHandler} loading={loading} loadmessage={"updating"} category={'normalbtn'} type='button' /></td>:
           <td>{el.status}</td>}
         </tr>
         {message&&<Message message={message} type={!error?"success":"error"}/>}
       </>
        )
      }
 