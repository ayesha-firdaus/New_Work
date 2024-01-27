import { useState } from "react";
import styles from "./Navbar.module.css"
import { IoMdCloseCircle } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import img from "../../images/NIELIT-Logo.jpeg"
import {Link} from "react-router-dom"

export default function Navbar() {
  const [IndentOpen, setIndentOpen] = useState(false);
  const [itemcatelogueopen, isitemcatelogueopen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

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
    <div className={styles.design}>
      <div>
        <img src={img} className={styles.img} />
      </div>

      <nav className={`${styles.nav} ${showNavbar && styles.show}`}>
        <ul className={styles.mainul}>
          <li>Daily Issue</li>
          <li onClick={handleIndentClick} className={styles.indent}>
            Indent
            {IndentOpen && (
              
              <ul className={styles.innerul}>
                <li>
                  <Link to="/userform">new</Link>
                </li>
                <li>
                  <Link>view</Link>
                </li>
              </ul>
              
            )}
          </li>
          <li onClick={handleitemcatelogueClick} className={styles.itemCatelogue}>
            Item catelogue
            {itemcatelogueopen && (
              <ul className={styles.innerul}>
                <li>
                  <Link to="/userform">new</Link>
                </li>
                <li>
                  <Link>view</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link> indent status</Link>
          </li>
          <li>
            <Link>Purchase</Link>
          </li>
        </ul>
      
          <IoMdCloseCircle onClick={toggleNavbar} className={`${styles.close} ${showNavbar && styles.show}`} />
        
      </nav>

      <IoMdMenu onClick={toggleNavbar} className={styles.menu} />
    </div>
  );
}
