
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Message from '../../../Utils/Message/Message';
import Button from '../../../Utils/Button';
import { getUser, getElectronics, getCleaning, getStationary } from '../../../Components/redux/store';
import styles from "./Newitem.module.css";

export default function NewItem() {
    const electronics = getElectronics();
    const cleaning = getCleaning();
    const stationary = getStationary();
    const user = getUser();

    const [formData, setFormData] = useState({
        itemname: "",
        category: "Stationary",
        units: "Each",
        itemcode: ""
    });

    const handleChange = function (e) {
        e.preventDefault();
        const name = e.target.id;
        const value = e.target.value;
    
        let code = formData.itemcode; // Preserve the existing item code
    
        if (name === 'category') {
            code =
                value === "Electronics"
                    ? `E${electronics?.length + 1}`
                    : value === "Stationary"
                        ? `S${stationary?.length + 1}`
                        : value === "Cleaning" ? `D${cleaning?.length + 1}` : '';
        }
        
        setFormData((prev) => ({ ...prev, [name]: value, itemcode: code }));
    };

    const handleSubmit = async function (e) {
        e.preventDefault();
        try {
            const res = await fetch("/api/item/newitem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...formData, userRef: user._id, status: "pending"})
            });
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };
  console.log(formData)
    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>Add an Item</h1>
                <div>
                    <label htmlFor='itemname'>Enter the item Name</label>
                    <input type='text' id='itemname' onChange={handleChange} value={formData.itemname} />
                </div>
                <div>
            <label htmlFor='category'>Enter the item category</label>
             <select id="category" onChange={handleChange} value={formData.category} >
                <option value="Stationary" >Stationary</option>
                <option value="Electronics">Electronics</option>
                <option value="Cleaning">Cleaning</option>
             </select>
            
        </div>
        <div>
            <label htmlFor='units'>Enter the units</label>
            <select id="units" onChange={handleChange} value={formData.units}>
  
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
        </div>
        <div>
    <label htmlFor='itemcode'>Item Code</label>
    <input
        type="text"
        id='itemcode'
       value={formData.itemcode}
    />
</div>
        <div>
            <label htmlFor='description'>description</label>
            <input type="text" id='description' onChange={handleChange} value={formData.description} />
        </div>
                <div>
                    <Button message="submit" category='formButton' type="submit" />
                </div>
            </form>
        </div>
    );
}
