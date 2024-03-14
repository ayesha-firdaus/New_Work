import { useLocation } from 'react-router-dom';

// Inside your functional component
import styles from "./ViewUserFormitem.module.css"
import React from 'react'

export default function ViewUserFormitem() {
    //     const location = useLocation();
    // const indentData = location.state.indentData;
    // console.log(indentData)
    return (
        <div className='container'>
            <form className={`${styles.form} `} >
                <table  >
                    <tr className={styles.IndenterDetails} >
                        <th  >Indenter’s Name</th>
                        <td >
                            <input type='text' id="indenterName"  ></input>
                        </td>
                        <th >Section</th>
                        <td><input type='text' id='section'></input></td>
                    </tr>
                </table>



                <table  >
                    <tr className={styles.IndentDetails}>
                        <th>Capital goods</th>
                        <td><div className={styles.align}><input type="checkbox" /><span>Equipment</span></div></td>
                        <td><div className={styles.align}><input type="checkbox" /><span>Furniture</span></div></td>
                        <td><div className={styles.align}><input type="checkbox" /><span>Fixture</span></div></td>
                    </tr>
                    <tr className={styles.IndentDetails}>
                        <th>General Item/Stationary</th>
                        <td><div className={styles.align}><input type="checkbox" /><span>Semi-Consumables</span></div></td>
                        <td><div className={styles.align}><input type="checkbox" /><span>Consumables</span></div></td>
                        <td><div className={styles.align}><input type="checkbox" /><span>Any Other. Pl. Specify</span></div></td>
                    </tr>
                    <tr className={styles.IndentDetails}>
                        <th>Services</th>
                        <td><div className={styles.align}><input type="checkbox" /><span>Job Work</span></div></td>
                        <td><div className={styles.align}><input type="checkbox" /><span>Printing</span></div></td>
                        <td><div className={styles.align}><input type="checkbox" /><span>Any Other. Pl. Specify</span></div></td>
                    </tr>
                </table>
                <table className='table2'>
                    <tr className='tr1'>
                        <th  ></th>
                        <th  >Account Head</th>
                        <th  ></th>
                        <th >Budget Head</th>
                    </tr>
                    <tr>
                        <td><div className={styles.align}><input type="checkbox" id="general" /><span>General</span></div></td>
                        <td><div className={styles.align}><input id="RD" /><span>R&D</span></div></td>
                        <td><div className={styles.align}><input type="checkbox" id="project" /><span>Project
                        </span></div></td>
                        <td><input id='budget' type="number" ></input></td>
                    </tr>
                </table>
                <table >
                    <tr className={styles.Application} >
                        <th >Application of the Item/s</th>
                        <td><input id='applicationOfItems' type='text'></input></td>
                    </tr>

                </table>




                <table className={styles.requisitiondetails}>
                    <td className="flex">
                        <label htmlFor="requisiton">Yearly Requisition</label>
                        <input type="checkbox" />
                    </td>
                    <td className="flex">
                        <label htmlFor="year">Requisition Year</label>
                        <input type="text" />
                    </td>
                </table>



                <div  >
                    <header>
                        <h3>Name of Item/s and Specifications</h3>
                    </header>
                    <table >
                        <thead   >

                            <tr className={styles.ItemsTable} >

                                <th>
                                    <label htmlFor='nameOfthings'>Name of the Item/s with Detailed Specifications*</label>
                                </th>
                                <th>
                                    <label htmlFor="quantity">Quantity</label>
                                </th>
                                <th>
                                    <label htmlFor="units">Units</label>
                                </th>
                                <th>
                                    <label htmlFor="price">Estimated Price/Quantity</label>
                                </th>
                                <th>
                                    <label htmlFor="total">total price</label>
                                </th>
                                <th>

                                </th>

                            </tr>
                        </thead>
                        <tbody  >





                            <tr className={styles.amount} >
                                <td>Total Amount in Words: </td>

                                <td><input type='text'></input></td>
                                <td>Total Amount</td>
                                <td><input id="totalAmount" type='number' name=""></input></td>
                            </tr>



                        </tbody>
                    </table>
                </div>
                <div className={styles.comments}>
                    <label htmlFor='comments'>Comments</label>
                    <textarea id='comment' ></textarea>
                </div>

            </form>
            <form
                className={`${styles.form} ${styles.sessionHeadContainer}`}
                
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
                              
                               
                            />
                        </div>

                        <div className={styles.inputContainer}>
                            <label htmlFor="materialProprietaryNo"> No </label>
                            <input
                                type="radio"
                                name="materialProprietary"
                                id="materialProprietaryNo"
                                
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
                             
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label> No</label>
                            <input
                                type="checkbox"
                                id="sessionApprovalNo"
                               
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="comments">Comments</label>
                    <textarea
                        id="comment"
                       
                    ></textarea>
                </div>
                
            </form>
            <form className={styles.store} >
                <h3 className={styles.heading}> For Store Purpose Only</h3>
                <div className={styles.div}>
                    <div className={styles.container1}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="notAvailable">
                                The material indented is not available in the stores.
                            </label>
                            <input
                                type="checkbox"
                                id="notAvailable"
                              
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="insufficentQuantity">
                                The material indented is available in stores in insufficient
                                quantity.
                            </label>
                            <input
                                type="checkbox"
                                id="insufficentQuantity"
                              
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="approvedByEC">
                                The capital good/s indented is/are approved by EC/Competent
                                Authority.{" "}
                            </label>
                            <input
                                type="checkbox"
                                id="approvedByEC"
                              
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="AnyOther">Any Other</label>
                            <input
                                type="checkbox"
                                id="AnyOther"
                            
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <h4>S & P Officer/Stores In-Charge</h4>
                            <div className={styles.inputContainer}>
                                <label> Yes</label>
                                <input
                                    type="checkbox"
                                    id="storeYes"
                                    name="yes"
                                   
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <label> No</label>
                                <input
                                    type="checkbox"
                                    id="storeNo"
                                    name="no"
                                   
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.comments}>
                    <label htmlFor="commentsofStore">Comments</label>
                    <textarea
                        id="commentsofStore"
                      
                        placeholder="in case you selected any other please specify the reason"
                    ></textarea>
                </div>

           

            </form>

            <form className={styles.tender}>
                <h4 className='last1'>For Stores & Purchase Section only.</h4>

                <label className='last2'>Enquiry / Tender No.:</label><input type='text'></input>
                <div className={styles.container}>
                    <div >
                        <label className='date'>Dated:</label><input type='date'></input></div>
                    <div><label className='duedate'>Due Date:</label><input type='date'></input></div>
                </div>
                <div className={styles.container}>
                    <div><label className='po'>P.O No.:</label><input type='text'></input></div>
                    <div> <label className='date1'>Dated:</label><input type='date'></input></div>
                </div>
            </form>
            <form className={styles.form}>
                <h4>For Admin</h4>
                <div className={styles.inputContainer}>
                    <label>Approved</label>
                    <input
                        type="checkbox"
                        id="AdminYes"
                        name='yes'
                       
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label> Not Approved</label>
                    <input
                        type="checkbox"
                        id="AdminNo"
                        name='no'
                       


                    />
                </div>
            </form>
        </div>
    )
}
