import React, { useState } from "react";
import Styles from "./StoreManager.module.css";
import Button from "../../../Utils/Button";
export default function StockManager({indent}) {
  
  const [formData, setformData] = useState({
    selectedOption: "",
    approval: "",
    comments: "",
  });
  const [loading,setloading]=useState(false);
  const [error,seterror]=useState(false);
  const [message,setmessage]=useState("");
  const handlecheckbox = function (e) {
    setformData((prev) => ({ ...prev, selectedOption: e.target.id }));
  };
  console.log(indent,formData)
  const handleSubmit=async function(e)
  {
    e.preventDefault();
    try{
      setloading(true);
      seterror(false);
      setmessage("");
      const res=await fetch(`/api/indent/updateStoreManager/${indent._id}`,{
        method:"POST",
        headers:{
          'Content-Type':"application/json",
        },
        body:JSON.stringify(formData)
      })
      const data=await res.json();
      if(data==="error"||data==="fail")
      {
        setloading(false);
        seterror(true);
        setmessage(data.message);
        return;
      
      }
      setloading(false);
      setmessage(data.message);

    }
    catch(err){
  setloading(false);
        seterror(true);
        setmessage(err.message);
    }
  }

  return (
    <form className={Styles.store} onSubmit={handleSubmit}>
      <h3 className={Styles.heading}> For Store Purpose Only</h3>
      <div className={Styles.div}>
        <div className={Styles.container1}>
          <div className={Styles.inputContainer}>
            <label htmlFor="notAvailable">
              The material indented is not available in the stores.
            </label>
            <input
              type="checkbox"
              id="notAvailable"
              name="The material indented is not available in the stores."
              onChange={handlecheckbox}
              checked={formData.selectedOption === "notAvailable"||indent.approvalStages&&indent.approvalStages.length===2&&indent?.approvalStages[1].selectedOption === "notAvailable"}
            />
          </div>
          <div className={Styles.inputContainer}>
            <label htmlFor="insufficentQuantity">
              The material indented is available in stores in insufficient
              quantity.
            </label>
            <input
              type="checkbox"
              id="insufficentQuantity"
              name="The material indented is available in stores in insufficient quantity."
              onChange={handlecheckbox}
              checked={formData.selectedOption === "insufficentQuantity"||indent.approvalStages&&indent.approvalStages.length===2&&indent?.approvalStages[1].selectedOption === "insufficentQuantity"}
            />
          </div>
          <div className={Styles.inputContainer}>
            <label htmlFor="approvedByEC">
              The capital good/s indented is/are approved by EC/Competent
              Authority.{" "}
            </label>
            <input
              type="checkbox"
              id="approvedByEC"
              name="The capital good/s indented is/are approved by EC/Competent Authority."
              onChange={handlecheckbox}
              checked={formData.selectedOption === "approvedByEC"||indent.approvalStages&&indent.approvalStages.length===2&&indent?.approvalStages[1].selectedOption === "approvedByEC"}
            />
          </div>
          <div className={Styles.inputContainer}>
            <label htmlFor="AnyOther">Any Other</label>
            <input
              type="checkbox"
              id="AnyOther"
              name="Any Other"
              onChange={handlecheckbox}
              checked={formData.selectedOption === "AnyOther"||indent.approvalStages&&indent.approvalStages.length===2&&indent?.approvalStages[1].selectedOption === "AnyOther"}
            />
          </div>
        </div>
        <div>
          <div>
            <h4>S & P Officer/Stores In-Charge</h4>
            <div className={Styles.inputContainer}>
              <label> Yes</label>
              <input
                type="checkbox"
                id="storeYes"
                name="yes"
                onChange={(e) =>
                  setformData((prev) => ({ ...prev, approval: e.target.name }))
                }
                checked={formData.approval === "yes"||indent.approvalStages&&indent.approvalStages.length===2&&indent?.approvalStages[1].approvedBy === "yes"}
              />
            </div>
            <div className={Styles.inputContainer}>
              <label> No</label>
              <input
                type="checkbox"
                id="storeNo"
                name="no"
                onChange={(e) =>
                  setformData((prev) => ({ ...prev, approval: e.target.name }))
                }
                checked={formData.approval === "no"||indent.approvalStages&&indent.approvalStages.length===2&&indent?.approvalStages[1].approvedBy === "no"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.comments}>
        <label htmlFor="commentsofStore">Comments</label>
        <textarea
          id="commentsofStore"
          value={formData.comments||indent.approvalStages&&indent.approvalStages.length===2&&indent?.approvalStages[1].comments}
          onChange={(e) =>
            setformData((prev) => ({ ...prev, comments: e.target.value }))
          }
          placeholder="in case you selected any other please specify the reason"
        ></textarea>
      </div>
      
      <div>
        <Button message="Submit" loadmessage="submitting" type="submit" category="formButton" />
      </div>

    </form>
  );
}
