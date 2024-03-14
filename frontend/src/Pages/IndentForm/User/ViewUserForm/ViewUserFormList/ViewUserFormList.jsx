import React, { useEffect, useState } from 'react';
import { getUser } from '../../../../../Components/redux/store';
import { useNavigate } from 'react-router-dom';
export default function ViewUserForm() {
  const user=getUser();
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(false);
  const [message,setMessage]=useState("");
  const [indent,setindent]=useState(null);

 const Navigate=useNavigate();
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
  ,[indent])
  const formatDate = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };

    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateTimeString));
  };

  const formatTime = (dateTimeString) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };

    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateTimeString));
  };
  const handleNavigateAndView = (el) => {
    // Navigate to the URL and pass 'el' to ViewUserForm
    Navigate(`/viewuserform/${el._id}`, { state: { indentData: el } });
  };
  return (

 <table className='container'>
  <thead>
  <th>Serial No.</th>
            <th>Indent</th>
            <th>Indent Status</th>
            <th>Date</th>
            <th>Time</th>
            <th>View</th>
            </thead>
            <tbody>
              {indent?.map((el,i)=>{
                console.log(el)
                return (
                  <tr>
                    <td>{i+1}</td>
                    <td>{el.applicationOfItems}</td>
                    <td>{el.status}</td>
                    <td>{formatDate(el.updatedAt)}</td>
                  <td>{formatTime(el.updatedAt)}</td>
                  <td onClick={() => {
  Navigate(`/viewuserform/${el._id}`);
  // Pass 'el' to ViewUserForm
  // Call a function to handle navigation and passing data to ViewUserForm
  handleNavigateAndView(el);
}}>
  View
</td>
                  </tr>
                )
              })}
            </tbody>
           
 </table>
  )
}
