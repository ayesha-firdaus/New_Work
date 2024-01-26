import React,{useState} from 'react'
import { Link, NavLink } from 'react-router-dom';
export default function Navbar() {
    const [IndentOpen,setIndentOpen]=useState(false);
    const [itemcatelogueopen,isitemcatelogueopen]=useState(false);
    const handleIndentClick=function()
    {
        setIndentOpen(prev=>!prev);
    }
    const handleitemcatelogueClick=function()
    {
        isitemcatelogueopen(prev=>!prev)
    }

      return (
    <div>
      <div></div>
      <nav>
      <ul>
      <li>Daily Issue</li>
      <li onClick={handleIndentClick}>Indent
      {IndentOpen&& 
      <ul>
        <li><NavLink to="/userform">new</NavLink></li>
        <li><NavLink >view</NavLink></li>
      </ul>}
      </li>
      <li onClick={handleitemcatelogueClick}>Item catelogue
      {itemcatelogueopen&&
      <ul>
      <li><NavLink to="/userform">new</NavLink></li>
        <li><NavLink >view</NavLink></li>
      </ul>
      }

      </li>
      <li><Link>Track your indent status</Link></li>
      <li><Link>Purchase</Link></li>
      </ul>
      </nav>
    </div>
  )
}
