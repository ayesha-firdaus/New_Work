
import styles from "./UserForm.module.css";
import convert from 'number-to-words';
import { useState } from "react";
import Button from "../../../Utils/Button";
const InitialItem = { id: 1, name: '', quantity: 0, price: 0.0 };
import { getUser } from "../../../Components/redux/store";

const UserForm = () => {
  const {user}=getUser();

  const [formData, setFormData] = useState({
    indenterName: '',
    section: '',
    applicationOfItems: '',
    capitalGoods: { equipment: false, furniture: false, fixture: false },
    GeneralItemORstationary: { SemiConsumables: false, Consumables: false, AnyOther: false },
    Services: { JobWork: false, Printing: false, AnyOther: false },
    accounthead:{
    general: false,
    RD: false,
    project: false,
    },
    itemArray:[InitialItem],
    budget: 0,
    amount:0,
    comment: "",
  });

const handleCheckboxChange = (category, fieldName) => {
  setFormData((prevData) => {
    const updatedCategory = {
      ...prevData[category],
      [fieldName]: !prevData[category]?.[fieldName] || false,
    };

    return {
      ...prevData,
      [category]: updatedCategory,
    };
  });
};

  const handleFormDataChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    console.log(value)
    setFormData((prevData) => ({ ...prevData, [e.target.id]: value }));
  };
const handleDelete = (index) => {
  setFormData((prevData) => ({
    ...prevData,
    itemArray: prevData.itemArray
      .filter((_, i) => index !== i)
      .map((item, i) => ({ ...item, id: i + 1 })),
  }));
};
  const addNewItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      itemArray: [...prevData.itemArray, { ...InitialItem, id: prevData.itemArray.length + 1 }],
    }));
  };

  const handleItemChange = (index, fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      itemArray: prevData.itemArray.map((item, i) =>
        i === index ? { ...item, [fieldName]: value } : item
      ),
    }));
  };
  const handleGeneratePrice = () => {
    const amount = formData.itemArray.reduce((sum, item) => sum + item.quantity * item.price, 0);
    setFormData({...formData,amount:amount});
  };
  console.log(formData)
  return (

    <form className={styles.form}>
       <table  >
                <tr className={styles.IndenterDetails} >
                  <th  >Indenter’s Name</th>
                  <td >
                    <input   type='text' id="indenterName"   value={user&&user.name} defaultValue={user&&
                    user.name} onChange={handleFormDataChange}></input>
                  </td>
                  <th >Section</th>
                  <td><input type='text' id='section'value={user&&user.designation}      onChange={handleFormDataChange}></input></td>
                </tr>
              </table>
              <table  >
              <tr className={styles.IndentDetails}>
        <th>Capital goods</th>
        <td><div className={styles.align}><input type="checkbox" checked={formData.capitalGoods.equipment} onChange={() => handleCheckboxChange('capitalGoods', 'equipment')} /><span>Equipment</span></div></td>
        <td><div className={styles.align}><input type="checkbox" checked={formData.capitalGoods.furniture} onChange={() => handleCheckboxChange('capitalGoods', 'furniture')} /><span>Furniture</span></div></td>
        <td><div className={styles.align}><input type="checkbox" checked={formData.capitalGoods.fixture} onChange={() => handleCheckboxChange('capitalGoods', 'fixture')} /><span>Fixture</span></div></td>
      </tr>
      <tr className={styles.IndentDetails}>
        <th>General Item/Stationary</th>
        <td><div className={styles.align}><input type="checkbox" checked={formData.GeneralItemORstationary.SemiConsumables} onChange={() => handleCheckboxChange('GeneralItemORstationary', 'SemiConsumables')} /><span>Semi-Consumables</span></div></td>
        <td><div className={styles.align}><input type="checkbox" checked={formData.GeneralItemORstationary.Consumables} onChange={() => handleCheckboxChange('GeneralItemORstationary', 'Consumables')} /><span>Consumables</span></div></td>
        <td><div className={styles.align}><input type="checkbox" checked={formData.GeneralItemORstationary.AnyOther} onChange={() => handleCheckboxChange('GeneralItemORstationary', 'AnyOther')} /><span>Any Other. Pl. Specify</span></div></td>
      </tr>
      <tr className={styles.IndentDetails}>
        <th>Services</th>
        <td><div className={styles.align}><input type="checkbox" checked={formData.Services.JobWork} onChange={() => handleCheckboxChange('Services', 'JobWork')} /><span>Job Work</span></div></td>
        <td><div className={styles.align}><input type="checkbox" checked={formData.Services.Printing} onChange={() => handleCheckboxChange('Services', 'Printing')} /><span>Printing</span></div></td>
        <td><div className={styles.align}><input type="checkbox" checked={formData.Services.AnyOther} onChange={() => handleCheckboxChange('Services', 'AnyOther')} /><span>Any Other. Pl. Specify</span></div></td>
      </tr>
              </table>
              <table className='table2'>
                <tr className='tr1'>
                  <th  ></th>
                  <th  >Account Head</th>
                  <th  ></th>
                  <th >Budget Heat</th>
                </tr>
                <tr>
  <td><div className={styles.align}><input type="checkbox" checked={formData.accounthead.general} onChange={() =>handleCheckboxChange('accounthead', 'general')} id="general" /><span>General</span></div></td>
  <td><div className={styles.align}><input type="checkbox" checked={formData.accounthead.RD} onChange={() => handleCheckboxChange('accounthead', 'RD')} id="RD" /><span>R&D</span></div></td>
  <td><div className={styles.align}><input type="checkbox" checked={formData.accounthead.project} onChange={() =>handleCheckboxChange('accounthead', 'project')} id="project" /><span>Project
  </span></div></td>
  <td><input id='budget' type="number" value={formData.budget} onChange={handleFormDataChange}></input></td>
</tr>
              </table>
              <table >
                <tr className={styles.Application} >
                  <th >Application of the Item/s</th>
                  <td><input id='applicationOfItems' value={formData.applicationOfItems} onChange={handleFormDataChange}  type='text'></input></td>
                </tr>

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
              <label htmlFor="price">Estimated Price</label>
            </th>
          </tr>
        </thead>
        <tbody  >
          {formData?.itemArray?.map((item, index) => (
    <tr key={item.id} className={styles.ItemsTable}>
      <td>
        <input
          type="text"
          value={item.name}
          onChange={(e) => handleItemChange(index, 'name', e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value, 10))}
        />
      </td>
      <td className={styles.forDelete}>
        <input
          type="number"
          value={item.price}
          onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
        />
        <span className={styles.delete} onClick={() => handleDelete(index)}>
          &times;
        </span>
      </td>
    </tr>
  ))}

      
      <Button  onClick={addNewItem}>Add Item</Button>
      <Button  className={formData.amount === 0 ? styles.disabled : ""} disabled={formData.amount==0} onClick={handleGeneratePrice}>Generate Price</Button>
  
      {formData.amount>0&&<tr className={styles.amount} >
                  <td>Total Amount in Words: </td>

                  <td><input    value={convert.toWords(formData.amount)} type='text'></input></td>
                  <td>Total Amount</td>
                  <td><input   value={formData.amount} id="totalAmount"  type='number'  onChange={handleFormDataChange} name=""></input></td>
        </tr>}
      
      
     
      </tbody>
      </table>
      </div>
      <div className={styles.comments}>
        <label htmlFor='comments'>Comments</label>
        <textarea id='comment' value={formData.comment} onChange={handleFormDataChange}></textarea>
      </div>

       <div><Button >Submit</Button></div>
    </form>
  )
}
export default UserForm;
