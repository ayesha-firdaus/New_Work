import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ApproveIndent.module.css";
import convert from "number-to-words";
import Message from "../../../../Utils/Message/Message";
import Button from "../../../../Utils/Button";
import StoreManager from "../../StoreManager/StoreManager";
import Admin from "../../Admin/Admin";
import StoreTender from "../../StoreManager/StoreTender/StoreTender";
import SessionHead from "../../SessionHead/SessionHead";
export default function ApproveIndent() {
  const params = useParams();
  const id = params.id;
  const [indent, setindent] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState("");



  useEffect(
    function () {
      async function getIndentbyId() {
        try {
          const res = await fetch(`/api/indent/${id}`);
          const data = await res.json();
          console.log(data);
          if (data.status === "fail" || data.status === "error") {
            setmessage(data.message);
            seterror(true);
            setloading(false);
            return;
          }
    
          setmessage(data.message);
        
          setindent(data.indent);
          setloading(false);
          

          setloading(false);
          setTimeout(() => {
            setmessage("");
          }, 5000);
        } catch (err) {
          console.log(err)
          setmessage(err.message);
          seterror(true);
          setloading(false);
        }
      }
      getIndentbyId();
    },
    [id]
  );

  return (
    <div>
  
      {message?.length > 0 && (
        <div>
          <Message message={message} type={error ? "error" : "success"} />
        </div>
      )}
      
      {loading ? (
        <Message message="Loading.." />
      ) : (
        <form className={styles.form}>
          <table>
            <tr className={styles.IndenterDetails}>
              <th>Indenter’s Name</th>
              <td>
                <input
                  type="text"
                  id="indenterName"
                  value={indent?.indenterName}
                ></input>
              </td>
              <th>Section</th>
              <td>
                <input type="text" id="section" value={indent?.section}></input>
              </td>
            </tr>
          </table>
          <table>
            <tr className={styles.IndentDetails}>
              <th>Capital goods</th>
              <td>
                <div className={styles.align}>
                  <input
                    type="checkbox"
                    checked={indent?.capitalGoods?.equipment}
                  />
                  <span>Equipment</span>
                </div>
              </td>
              <td>
                <div className={styles.align}>
                  <input
                    type="checkbox"
                    checked={indent?.capitalGoods?.furniture}
                  />
                  <span>Furniture</span>
                </div>
              </td>
              <td>
                <div className={styles.align}>
                  <input
                    type="checkbox"
                    checked={indent?.capitalGoods?.fixture}
                  />
                  <span>Fixture</span>
                </div>
              </td>
            </tr>
            <tr className={styles.IndentDetails}>
              <th>General Item/Stationary</th>
              <td>
                <div className={styles.align}>
                  <input
                    type="checkbox"
                    checked={indent?.GeneralItemORstationary?.SemiConsumables}
                  />
                  <span>Semi-Consumables</span>
                </div>
              </td>
              <td>
                <div className={styles.align}>
                  <input
                    type="checkbox"
                    checked={indent?.GeneralItemORstationary?.Consumables}
                  />
                  <span>Consumables</span>
                </div>
              </td>
              <td>
                <div className={styles.align}>
                  <input
                    type="checkbox"
                    checked={indent?.GeneralItemORstationary?.AnyOther}
                  />
                  <span>Any Other. Pl. Specify</span>
                </div>
              </td>
            </tr>
            <tr className={styles.IndentDetails}>
              <th>Services</th>
              <td>
                <div className={styles.align}>
                  <input type="checkbox" checked={indent?.Services?.JobWork} />
                  <span>Job Work</span>
                </div>
              </td>
              <td>
                <div className={styles.align}>
                  <input type="checkbox" checked={indent?.Services?.Printing} />
                  <span>Printing</span>
                </div>
              </td>
              <td>
                <div className={styles.align}>
                  <input type="checkbox" checked={indent?.Services?.AnyOther} />
                  <span>Any Other. Pl. Specify</span>
                </div>
              </td>
            </tr>
          </table>
          <table className="table2">
            <tr className="tr1">
              <th></th>
              <th>Account Head</th>
              <th></th>
              <th>Budget Heat</th>
            </tr>
            <tr>
              <td>
                <div className={styles.align}>
                  <input
                    type="checkbox"
                    checked={indent?.accounthead?.general}
                    id="general"
                  />
                  <span>General</span>
                </div>
              </td>
              <td>
                <div className={styles.align}>
                  <input
                    type="checkbox"
                    checked={indent?.accounthead?.RD}
                    id="RD"
                  />
                  <span>R&D</span>
                </div>
              </td>
              <td>
                <div className={styles.align}>
                  <input
                    type="checkbox"
                    checked={indent?.accounthead?.project}
                    id="project"
                  />
                  <span>Project</span>
                </div>
              </td>
              <td>
                <input id="budget" type="number" value={indent?.budget}></input>
              </td>
            </tr>
          </table>
          <table>
            <tr className={styles.Application}>
              <th>Application of the Item/s</th>
              <td>
                <input
                  id="applicationOfItems"
                  value={indent?.applicationOfItems}
                  type="text"
                ></input>
              </td>
            </tr>
          </table>
          <div>
            <header>
              <h3>Name of Item/s and Specifications</h3>
            </header>
            <table className={styles.itemTable}>
              <thead>
                <tr className={styles.ItemsTable}>
                  <th>
                    <label htmlFor="nameOfthings">
                      Name of the Item/s with Detailed Specifications*
                    </label>
                  </th>
                  <th>
                    <label htmlFor="quantity">Quantity</label>
                  </th>
                  <th>
                    <label htmlFor="price">Estimated Price</label>
                  </th>
                </tr>
              </thead>
              <tbody>
                {indent?.itemArray?.map((item, index) => (
                  <tr key={item.id} className={styles.ItemsTable}>
                    <td>
                      <input type="text" value={item.name} />
                    </td>
                    <td>
                      <input type="number" value={item.quantity} />
                    </td>
                    <td className={styles.forDelete}>
                      <input type="number" value={item.price} />
                    </td>
                  </tr>
                ))}

                <tr className={styles.amount}>
                  <td>Total Amount in Words: </td>

                  <td>
                    <input
                      value={convert.toWords(indent?.amount ?? 0)}
                      type="text"
                    ></input>
                  </td>
                  <td>Total Amount</td>
                  <td>
                    <input
                      id="totalAmount"
                      value={indent?.amount}
                      type="number"
                      name=""
                    ></input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.comments}>
            <label htmlFor="comments">Comments</label>
            <textarea id="comment" value={indent?.comment}></textarea>
          </div>
        </form>
      )}
    <SessionHead indent={indent} />
   {indent?.approvalStages?.length===1&& indent?.status==="Approved by SessionHead"&&<div>
      <StoreManager indent={indent} />
    </div>}
    {indent?.approvalStages?.length===2&& indent?.status==="Approved by Store Mananger"&&<div className={styles.last}>
    <StoreTender indent={indent}/>
      <Admin indent={indent}/>
    </div>}

    </div>
  );
}
