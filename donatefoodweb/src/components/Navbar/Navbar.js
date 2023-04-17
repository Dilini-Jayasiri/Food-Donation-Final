import React,{useState} from "react";
import { Link } from "react-router-dom";
import { FaSeedling } from 'react-icons/fa';
import "./Navbar.css";
import {navItems1, navItems3} from "./NavItems";
import {navItems2} from "./NavItems";
import { Box, Grid, requirePropFactory } from '@mui/material';
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
const role = localStorage.getItem('role');

if(role ==="Donor"){
   //const [dropdown,setDropdown] = useState(false);
    return (
        <>
               <nav className="navbar1 navbar-expand-lg navbar-light shadow">
                <Link to="/" className="navbar-logo">
                FOOD BANK
                <FaSeedling/>
            </Link>
            <ul className="nav-items">
                {navItems1.map((item) => {
                   return (
                    <li key={item.id} className={item.cName}>
                    <Link to={item.path}>{item.title}</Link>
                    
                </li>
                   );
                    
                })}
            </ul>
            {/* <Button/> */}
            <>
             <Box my={3} mx={4}>
             {!user && (<div> <Link to="/login" className="btn1 btn-outline-primary ms-auto px-4 rounded-pill">
                  <i className='fa fa-sign-in me-2'></i> Login</Link>
                  </div>)}
                  </Box>
                  <Box>
               {user && (   <div><Link to="/logout" onClick={handleClick} className="btn1 btn-outline-primary ms-2 px-4 rounded-pill">
                  <i className='fa fa-sign-out me-2'></i> Log out </Link>
                  <span>            {    user.email }   </span></div>
               )}
               </Box>
              </>
              
              
          </nav>
         
        </>
    );
  }else if(role==="Needy Organization"){
    return (
      <>
             <nav className="navbar1 navbar-expand-lg navbar-light shadow">
          <Link to="/" className="navbar-logo">
              FOOD BANK
              <FaSeedling/>
          </Link>
          <ul className="nav-items">
              {navItems2.map((item) => {
                 return (
                  <li key={item.id} className={item.cName}>
                  <Link to={item.path}>{item.title}</Link>
                  
              </li>
                 );
                  
              })}
          </ul>
          <>
           
           {!user && (<div> <Link to="/login" className="btn1 btn-outline-primary ms-auto px-4 rounded-pill">
                <i className='fa fa-sign-in me-2'></i> Login</Link>
                </div>)}
             {user && (   <div><Link to="/logout" onClick={handleClick} className="btn1 btn-outline-primary ms-2 px-4 rounded-pill">
                <i className='fa fa-sign-out me-2'></i> Log out</Link>
                <span>{user.email}</span></div>
             )}
            </>
            
            
        </nav>
       
      </>
  );
  }else{
    return (
      <>
             <nav className="navbar1 navbar-expand-lg navbar-light shadow">
          <Link to="/" className="navbar-logo">
              FOOD BANK
              <FaSeedling/>
          </Link>
          <ul className="nav-items">
              {navItems3.map((item) => {
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
}

export default Nav;