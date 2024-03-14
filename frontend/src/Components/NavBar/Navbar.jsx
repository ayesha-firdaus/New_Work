import { useState ,useEffect} from "react";
import styles from "./Navbar.module.css"
import { IoMdCloseCircle } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import img from "../../images/NIELIT-Logo.jpeg"
import {Link} from "react-router-dom"
import { getUser } from "../redux/store";
import {signoutStart,signoutSuccess,signoutFailure} from "../redux/User/userSlice";
import { useDispatch } from "react-redux";

export default function Navbar({token}) {
  
  const user=getUser();

  const dispatch=useDispatch();
  const [IndentOpen, setIndentOpen] = useState(false);
  const [itemcatelogueopen, isitemcatelogueopen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [Message,setMessage]=useState("");
  const handlelogout=async function(){
    try{
      dispatch(signoutStart);
      const res=await fetch("/api/auth/logout");
      const data=await res.json();
      if(data.status==="fail"||data.status==="error")
      {
         dispatch(signoutFailure())
       setMessage(data.message);
         return ;
      }
      dispatch(signoutSuccess())
      setMessage(data.message);
    }
    catch(err){
      dispatch(signoutFailure())
      setMessage(err.message);
    }

  }
  const handleIndentClick = function () {
    setIndentOpen((prev) => !prev);
  };
  const handleitemcatelogueClick = function () {
    isitemcatelogueopen((prev) => !prev);
  };

  const toggleNavbar = function () {
    setShowNavbar((prev) => !prev);
  };

  return (
    <div className={`${styles.design} container`}>
      <div>
        <Link to="/"><img src={img} className={styles.img} /></Link>
      </div>
      <div className={styles.navContainer}>
     { user&&  <nav className={`${styles.nav} ${showNavbar && styles.show}`}>
        <ul className={styles.mainul}>
          <li>Daily Issue</li>
          <li onClick={handleIndentClick} className={styles.indent}>
            Indent
            {IndentOpen && (
              
              <ul className={styles.innerul}>
                <li>
                  <Link to="/newuserform">new</Link>
                </li>
                <li>
                  <Link to="/viewuserform">view</Link>
                </li>
              </ul>
              
            )}
          </li>
          <li onClick={handleitemcatelogueClick} className={styles.itemCatelogue}>
            Item catelogue
            {itemcatelogueopen && (
              <ul className={styles.innerul}>
                <li>
                  <Link to="/newitem">new</Link>
                </li>
                <li>
                  <Link to="/viewitem">view</Link>
                </li>
              </ul>
            )}
          </li>
         { user.role!=="Employee"&&
          <li>
            <Link to="/approvallist"> indent status</Link>
          </li>}
          <li>
            <Link>Purchase</Link>
          </li>
          { user.role==="Admin"&&
          <li>
            <Link to={"/admin"}>Admin Panel</Link>

          </li>
          }
         
        </ul>
      
          <IoMdCloseCircle onClick={toggleNavbar} className={`${styles.close} ${showNavbar && styles.show}`} />
        
      </nav>}
  <div>
    {user?<div className={styles.container}>
    <Link to="/profile"><img className={styles.profile} src={user.photo||"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAngMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQMEBQIHBv/EAC8QAQACAQIEBAMIAwAAAAAAAAABAgMRIQQSMVEFQWGRInGBExQyM1JTYnJCodH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAAAI1BIjVIAAAAAAAAAAAAAiZiOqnJl8qzt3Bbe9a9ZVWzTO0bKQHqb2nrMoQIJ1eovaPN4AXVzeVo+sLq2i0bTqxpiZidYnSVGwVY8vNtbaVoAAAAAAAKs9+WukdZB4y5NZ0hWgQARa0VjW06QCRz8/G3tMxi+Gvfzllm1rb2mZn1kHbQ41Ml6TrS81n0buG4znmK5tImelo8wawAGjDfX4Z6wzpiZidY6g2DzS0XrEw9KAAAADLktzWmWjJOlJZQQAgMHiOWZtGKs7RvLe5HETrnyf2kFYCoAA6fA5ftMOkzram0tDn+GzpmtHlNXRRUAAtwW307tDHWdLRLZCgAAACrPOlPnLO0cR+GPmzoAADl8ZTk4i3ad3UUcXg+2prE/HHT19AcsTaJrOkxpMIVAHvFjtmvy0+s9gavDKTre8x6N7xixxixxSvSHpFAAS1U3pHyZWrH+CvyUegAAAV5o1pLM2WjWswyTtKCAAB5yZK468150hkycf+1TbvYGnNgx5t71+LvHVmt4fH+OSfrVV9+y+UU9j79m/h7KLqcBWJ1vebekRo146Vx15aViIc779m/h7Ecdl7U9gdIZMXH0ttkrNZ7+TXExMax0QAAS112iGbHHNeOzUoAAAAM2avLbXu0vN6xeukgyIyXjHSbW6Q9WiY116sHiV96446fikGbNltlvNrfSOysBAAAABo4TiJxX5bb0n/TOA7fkKOCvz8PGvWuzVjpNrafUVbgrpHN3WojpskAAAAAAFeTHz/NxPENuKmJ6xEO+o4nhcfE10vGkx0tHWAfnhp4ngc2DfTnr+qrMIAAAABETM6REzLfw3huTJpbN8Fe3nP8AwV68KrN65Ij9Tq1rFY0hGLHTFSK46xWseUPYAAAAAAAAAADPm4Lh8u9scRPeuzQA5l/Caz+XlmP7RqqnwnJ+7X2dgByI8Jv55a+y7H4Vij8y9rfLaHRAVYeHw4Y0x4619fNaAAAAAAAAAAAAAAAAAAAAAAAAAAAP/9k="}/></Link>
   <div className={styles.signout} onClick={handlelogout}>logout</div>
    </div>:<ul className={styles.mainul}><span className={styles.login}><Link  to={"/login"}>Login</Link></span></ul>}
  </div>
  <IoMdMenu onClick={toggleNavbar} className={styles.menu} />
  </div>

    </div>
  );
}
