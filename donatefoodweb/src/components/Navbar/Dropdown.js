import React,{useState} from "react";
import {accountDropDown} from "./NavItems";
import {Link} from "react-router-dom";
import "./Dropdown.css";

function Dropdown() {
    const [dropdown,setDropdown] = useState(false);

    return (
    
      <ul
         className={dropdown ? "account-submenu clicked" : "account-submenu"} onClick={() => setDropdown(!dropdown)}>
        {accountDropDown.map((item) => {
            return (
                <li key={item.id}>
                    <Link to={item.path} className={item.cName}>
                        {item.title}
                    </Link>
                </li>
            );
        })}
      </ul>
    
    );
}

export default Dropdown;