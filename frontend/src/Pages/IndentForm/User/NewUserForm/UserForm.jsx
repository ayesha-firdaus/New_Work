
import styles from "./UserForm.module.css";
import convert from 'number-to-words';
import { useEffect, useState } from "react";
import Button from "../../../../Utils/Button";
import { getUser } from "../../../../Components/redux/store";
import { useSelector } from "react-redux";
import Select from 'react-select';
import Message from "../../../../Utils/Message/Message";

const InitialItem = { id: 1, name: '', quantity: 0,units:"Each" ,price: 0.0,total:0 };
const UserForm = () => {
  const user=getUser();
const [error,seterror]=useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [message,setMessage]=useState("");
  const [category,setcategory]=useState("electronics");
  const [indentNumber,setIndentNumber]=useState(null);
  useEffect(function(){
    async function viewAllIndent() {
      const res = await fetch("/api/indent/view");
      const data = await res.json();
      const fetchedIndentNumber = data?.allIndent?.length;
      setIndentNumber(fetchedIndentNumber);
  
      // Update the year after fetching indentNumber
      const currentYear = new Date().getFullYear();
      const yearString = `${currentYear - 1}${currentYear}${fetchedIndentNumber + 1}`;
      setFormData((prevData) => ({ ...prevData, year: yearString }));
    }
    viewAllIndent();
  }, []);
 

const handleCategorySelect=function(category){
    setShowDropdown(false);
    setcategory(category);
}
  
  const [formData, setFormData] = useState({
    indenterName: user && user.name || '' ,
    section: user && user.designation || '',
    applicationOfItems: '',
    capitalGoods: { equipment: false, furniture: false, fixture: false },
    GeneralItemORstationary: { SemiConsumables: false, Consumables: false, AnyOther: false },
    Services: { JobWork: false, Printing: false, AnyOther: false },
    accounthead:{
    general: false,
    RD: false,
    project: false,
    },
    requisition:false,
    year:"",
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
    setFormData((prevData) => {
      const updatedItemArray = prevData.itemArray.map((item, i) => {
        if (i === index) {
          const newItem = { ...item, [fieldName]: value };
          // Recalculate total if quantity or price changes
          if (fieldName === "quantity" || fieldName === "price") {
            newItem.total = newItem.quantity * newItem.price;
          }
          return newItem;
        }
        return item;
      });
  
      return { ...prevData, itemArray: updatedItemArray };
    });
  };
  const handleGeneratePrice = () => {
    const amount = formData.itemArray.reduce((sum, item) => sum + item.total, 0);
    setFormData({...formData,amount:amount});
  };
  console.log(formData)

//added feild
const options = useSelector(state => {
  if (category === "electronics") return state.item.electronics;
  if (category === "stationary") return state.item.stationary;
  if (category === "cleaning") return state.item.cleaning;
  return [];
});

const handleChange = (selectedOption, index) => {
  setFormData((prevData) => ({
    ...prevData,
    itemArray: prevData.itemArray.map((item, i) =>
      i === index ? { ...item, name: selectedOption?.label || '', category: category } : item
    ),
  }));
};

const filterOptions = (inputValue) => {
  return options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const handleSubmitSuccess = () => {
  setMessage("Form submitted successfully.");
  setTimeout(() => {
    setMessage("");
    setFormData({
      indenterName: user && user.name || '' ,
      section: user && user.designation || '',
      applicationOfItems: '',
      capitalGoods: { equipment: false, furniture: false, fixture: false },
      GeneralItemORstationary: { SemiConsumables: false, Consumables: false, AnyOther: false },
      Services: { JobWork: false, Printing: false, AnyOther: false },
      accounthead:{
      general: false,
      RD: false,
      project: false,
      },
      requisition:false,
      year:"",
      itemArray:[InitialItem],
      budget: 0,
      amount:0,
      comment: "",
    });
  }, 3000); // Clear the message and reset form after 3000ms
};

const handleSubmitError = (message) => {
  setMessage(message || "Error occurred while submitting the form.");
  seterror(true);
  setTimeout(() => {
    setMessage("");
  }, 3000); // Clear the message after 3000ms
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    seterror(false);
    const res = await fetch("/api/indent/create", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({ ...formData, userRef: user._id })
    });
    const data = await res.json();
    if (data.status === "error" || data.status === "fail") {
      handleSubmitError(data.message);
      return;
    }
    handleSubmitSuccess();
  } catch (err) {
    handleSubmitError();
  }
};

  return (

    <>
   {message&& <Message message={message} type={error?"error":"success"} />}
    <form className={styles.form} onSubmit={handleSubmit}>
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
                  <th >Budget Head</th>
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




              <table className={styles.requisitiondetails}>
              <td className="flex">
              <label htmlFor="requisiton">Yearly Requisition</label>
              <input type="checkbox" checked={formData.requisition===true}  onClick={()=>{setFormData((prevData)=>({...prevData, requisition:!prevData.requisition}))}} />
              </td>
              <td className="flex">
                 <label htmlFor="year">Requisition Year</label>
                <input type="text"  value={formData.year}/>
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
          {formData?.itemArray?.map((item, index) => (
    <tr key={item.id} className={styles.ItemsTable}>
    <td>
              <Select
                value={options?.find(opt => opt.label === item.name)}
                onChange={(selectedOption) => handleChange(selectedOption, index)}
                options={options?.map((el) => ({
                  value: { itemName: el.itemName, itemCode: el.itemCode },
                  label: `${el.itemName} (${el.itemCode})`,
                }))}
                isSearchable
                filterOptions={filterOptions}
                placeholder="Search for items..."
              />
              <div>
              <label>Please Select the category first</label>
                <select onChange={(e) => handleCategorySelect(e.target.value)}>
                  <option value="electronics">Electronics</option>
                  <option value="stationary">Stationary</option>
                  <option value="cleaning">Cleaning</option>
                </select>
              </div>
            </td>
      <td>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value, 10))}
        />
      </td>
      <td>
      <select id="units" onChange={(e)=>handleItemChange(index,'units',e.target.value)} value={formData.units}>
  
  <optgroup label="Countable Units">
      <option value="Each">Each</option>
      <option value="Pack">Pack</option>
      <option value="Box">Box</option>
      <option value="Dozen">Dozen</option>
      <option value="Set">Set</option>
      <option value="Bundle">Bundle</option>
      <option value="Case">Case</option>
      <option value="Pair">Pair</option>
      <option value="Packet">Packet</option>
      <option value="Carton">Carton</option>
      <option value="Container">Container</option>
      <option value="Kit">Kit</option>
      <option value="Lot">Lot</option>
      <option value="Unit">Unit</option>
      <option value="Roll">Roll</option>
      <option value="Ream">Ream</option>
      <option value="Batch">Batch</option>
      <option value="Bag">Bag</option>
      <option value="Sack">Sack</option>
  </optgroup>


  <optgroup label="Measurable Units">
      <option value="Gram">Gram (g)</option>
      <option value="Kilogram">Kilogram (kg)</option>
      <option value="Milligram">Milligram (mg)</option>
      <option value="Liter">Liter (L)</option>
      <option value="Milliliter">Milliliter (ml)</option>
      <option value="Centimeter">Centimeter (cm)</option>
      <option value="Millimeter">Millimeter (mm)</option>
      <option value="Meter">Meter (m)</option>
      <option value="Inch">Inch (in)</option>
      <option value="Foot">Foot (ft)</option>
      <option value="Yard">Yard (yd)</option>
  </optgroup>
</select>
      </td>
      <td className={styles.forDelete}>
        <input
          type="number"
          value={item.price}
          onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
        />
           </td>
           <td>
           <input 
  type="number" 
  id={`total-${index}`}  
  value={item.total} 
  onChange={(e) => handleItemChange(index, 'total', parseInt(e.target.value, 10))}
/>

</td>

           <td>
           <span className={styles.delete} onClick={() => handleDelete(index)}>
          &times;
        </span>
           </td>
     
   
    </tr>
  ))}

      
      <Button  onClick={addNewItem} message="Add Item" type="button" category="normalbtn" />
      <Button  type="button" message="Generate Price" onClick={handleGeneratePrice} category="normalbtn" />
  
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

       <div><Button type={"submit"} category={"formButton"} message="submit"/></div>
    </form>
    </>
  )
}
export default UserForm;
