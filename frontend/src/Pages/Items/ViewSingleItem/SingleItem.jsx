import React from 'react'

export default function SingleItem({item}) {
  
  return (
    <tr>
      <td>{item.itemCode}</td>
      <td>{item.itemName}</td>
      <td>{item.category}</td>
      <td>{item.description}</td>
      <td>{item.unit}</td>
    </tr>
  )
}
