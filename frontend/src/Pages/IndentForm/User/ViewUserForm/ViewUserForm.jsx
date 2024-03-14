import React, { useEffect, useState } from 'react';
import { getUser } from '../../../../Components/redux/store';
export default function ViewUserForm() {
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(false);
  const [message,setMessage]=useState("");
  const [indent,setindent]=useState(null);
const user=getUser();
  console.log(user,user?._id)
  useEffect(function(){async function getIndentbyId()
    {
      try{
        setLoading(true);
        setError(false);
        setMessage("");
     const res=await fetch(`/api/indent/user/${user?._id}`)
     const data=await res.json();
    if(data.status==="fail"||data.status==="error")
    {
      setError(true);
      setMessage(data.message);
      return;
    }
     setindent(data.indent);
     setLoading(false);
     setMessage(data.message);
    }
  
  catch(error){
    setError(true);
    setMessage(data.message);
   
  }
}
    getIndentbyId();
    
  }
  ,[])
  return (
 <table>
  <th></th>
  <th></th>
  <th></th>
 </table>
  )
}
