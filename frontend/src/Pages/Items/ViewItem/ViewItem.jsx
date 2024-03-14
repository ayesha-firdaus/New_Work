import React, { useEffect, useState } from 'react';
import SingleItem from '../ViewSingleItem/SingleItem';
import { getElectronics,getStationary,getCleaning } from '../../../Components/redux/store';

import styles from "./Viewitem.module.css"
export default function ViewItem() {
  const electronics=getElectronics();
  const stationary=getStationary();
  const cleaning=getCleaning();

  return (
    <div className={`${styles.container} container`}>
    <div>
    <h1>Electronics</h1>
     <table>
        <thead>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Item Category</th>
            <th>Item Description</th>
            <th>Item Unit</th>

        </thead>
        <tbody>
           {electronics?.map(el=>{
              return <SingleItem item={el} />
           })}
        </tbody>
     </table>
    </div>
    <div>
    <h1>Stationary</h1>
     <table>
        <thead>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Item Category</th>
            <th>Item Description</th>
            <th>Item Unit</th>

        </thead>
        <tbody>
           {stationary?.map(el=>{
              return <SingleItem item={el} />
           })}
        </tbody>
     </table>
    </div>
    <div>
    <h1>Cleaning</h1>
     <table>
        <thead>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Item Category</th>
            <th>Item Description</th>
            <th>Item Unit</th>

        </thead>
        <tbody>
           {cleaning?.map(el=>{
              return <SingleItem item={el} />
           })}
        </tbody>
     </table>
    </div>
    </div>
  )
}
