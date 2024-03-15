import React from 'react'

export default function SingleItem({item}) {
 
  return (
    <tr>
      <td>{item.itemcode}</td>
      <td>{item.itemname}</td>
      <td>{item.category}</td>
      <td>{item.description}</td>
      <td>{item.unit}</td>
    </tr>
  )
}
