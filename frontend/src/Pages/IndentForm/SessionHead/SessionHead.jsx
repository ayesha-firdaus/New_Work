import React, { useState } from 'react'
import styles from "./SessionHead.module.css"

export default function SessionHead({indent}) {
    const [SessionFormData, setSessionFormData] = useState({
        sessionApproval:"",
        materialProprietary: "",
        sessionComments: "",
      });
    
     
      const handleSessionHead=async function(e){
        e.preventDefault();
        try{
        const res=await fetch(`/api/indent/updateSessionHeadApproval/${indent._id}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(SessionFormData),
        })
        const data=await res.json();
        
        if(data.status==="fail"||data.status==="error")
        {
          
        } 
    
    }catch(err)
    {
        console.log(err)
    }
      }
  return (
    <form
    className={`${styles.form} ${styles.sessionHeadContainer}`}
    onSubmit={handleSessionHead}
    disabled={indent?.approvalStages?.length>0}
  >
    <h3>For Session Head Only</h3>
    <div className={styles.sessionHead}>
      <div className={styles.container1}>
        <p>Whether the Material is Proprietary?</p>
        <div className={styles.inputContainer}>
          <label htmlFor="materialProprietaryYes">Yes </label>
          <input
            type="radio"
            name="materialProprietary"
            id="materialProprietaryYes"
            value="yes"
            checked={SessionFormData.materialProprietary === "yes"||indent?.approvalStages&&indent.approvalStages[0]?.materialProprietary==="yes"}
            onChange={(e) => {
              setSessionFormData({
                ...SessionFormData,
                materialProprietary: e.target.value,
              });
            }}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="materialProprietaryNo"> No </label>
          <input
            type="radio"
            name="materialProprietary"
            id="materialProprietaryNo"
            value="no"
            checked={SessionFormData.materialProprietary === "no"||indent?.approvalStages&&indent?.approvalStages[0]?.materialProprietary==="no"}
            onChange={(e) => {
              setSessionFormData({
                ...SessionFormData,
                materialProprietary: e.target.value,
              });
            }}
          />
        </div>
        <p>If ‘Yes’, “Proprietary Certificate” to be attached preferably</p>
      </div>

      <div className={styles.container2}>
        <p>Session head Approval</p>
        <div className={styles.inputContainer}>
          <label> Yes</label>
          <input
            type="checkbox"
            id="sessionApprovalYes"
            checked={SessionFormData.sessionApproval === "yes"||indent?.approvalStages&&indent?.approvalStages[0]?.approvedBy==="Session Head"}
            onChange={(e) => {
              setSessionFormData({
                ...SessionFormData,
                sessionApproval: e.target.checked ? "yes" : "no",
              });
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <label> No</label>
          <input
type="checkbox"
id="sessionApprovalNo"
checked={SessionFormData.sessionApproval === "no" || (!indent?.approvalStages)}
onChange={(e) => {
  setSessionFormData({
    ...SessionFormData,
    sessionApproval: e.target.checked ? "no" : "yes",
  });
}}
/>
        </div>
      </div>
    </div>

    <div>
      <label htmlFor="comments">Comments</label>
      <textarea
        id="comment"
        value={SessionFormData.sessionComments||indent?.approvalStages&&indent?.approvalStages[0]?.comments}
        onChange={(e) => {
          setSessionFormData({
            ...SessionFormData,
            sessionComments: e.target.value,
          });
        }}
      ></textarea>
      </div>
    {indent?.approvalStages?.length===0 && <div>
      <button type="submit">Submit</button>
    </div>}
  </form>
  )
}
