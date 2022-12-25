import React,{useState} from "react";
import { Link } from "react-router-dom";
import { FaSeedling } from 'react-icons/fa';
import "./Navbar.css";
import {navItems} from "./NavItems";
import Button from "./Button";
import "./Button.css";
import Dropdown from "./Dropdown";
import { useLogout } from '../hoooks/useLogout';
import { useAuthContext } from '../hoooks/useAuthContext';

function Nav() {
    const {logout} = useLogout()

  const {user} = useAuthContext()

  const handleClick =()=>{
    logout()
  }

   const [dropdown,setDropdown] = useState(false);
    return (
        <>
          <nav className="navbar1 navbar-expand-lg navbar-light shadow">
            <Link to="/" className="navbar-logo">
                FOOD BANK
                <FaSeedling/>
            </Link>
            <ul className="nav-items">
                {navItems.map((item) => {
                   if( item.title === "Account") {
                    return(
                    <li key={item.id} className={item.cName}
                    onMouseEnter={()=> setDropdown(true)}
                    onMouseLeave={()=> setDropdown(false)}>
                        <Link to={item.path}>{item.title}</Link>
                       {dropdown && <Dropdown/>} 
                    </li>
                    
                    );
                   }
                   return (
                    <li key={item.id} className={item.cName}>
                    <Link to={item.path}>{item.title}</Link>
                    
                </li>
                   );
                    
                })}
            </ul>
            {/* <Button/> */}
            <>
             
             {!user && (<div> <Link to="/login" className="btn1 btn-outline-primary ms-auto px-4 rounded-pill">
                  <i className='fa fa-sign-in me-2'></i> Login</Link>
                {/* <NavLink to="/register" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
                  <i className='fa fa-user-plus me-2'></i> Register</NavLink> */}
              
                  </div>)}
               {user && (   <div><Link to="/logout" onClick={handleClick} className="btn1 btn-outline-primary ms-2 px-4 rounded-pill">
                  <i className='fa fa-sign-out me-2'></i> Log out</Link>
                  <span>           {   user.email}   </span></div>
               )}
              </>
              
              
          </nav>
         
        </>
    );
}

export default Nav;