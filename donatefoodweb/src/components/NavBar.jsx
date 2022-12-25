import React from 'react'
import { NavLink } from 'react-router-dom';
import '../assets/partials/navbar.scss';
import { useLogout } from './hoooks/useLogout';
import { useAuthContext } from './hoooks/useAuthContext';




const NavBar = (props) => {
  const {logout} = useLogout()

  const {user} = useAuthContext()

  const handleClick =()=>{
    logout()
  }
  return (


    <div>
      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container">

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link active" aria-current="page" >Home</NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink to="/about" className="nav-link" >About Us</NavLink>
              </li> */}
              {/* <li className="nav-item">
                <NavLink to="/services" className="nav-link" >Service</NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link" >Contact Us</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/donorAccount" className="nav-link" >Donor Account</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/orgAccount" className="nav-link" >Organization Account</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/donateDash" className="nav-link" >Donate</NavLink>
              </li>
            </ul>

            {props.auth ?
              <>
             <center> 

             <NavLink className="navbar-brand fw-bolder fs-1 mx-auto titleStyle" to="#">Food Bank</NavLink></center>
             {!user && (<div> <NavLink to="/login" className="btn btn-outline-primary ms-auto px-4 rounded-pill">
                  <i className='fa fa-sign-in me-2'></i> Login</NavLink>
                <NavLink to="/register" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
                  <i className='fa fa-user-plus me-2'></i> Register</NavLink>
              
                  </div>)}
               {user && (   <div><NavLink to="/logout" onClick={handleClick} className="btn btn-outline-primary ms-2 px-4 rounded-pill">
                  <i className='fa fa-sign-out me-2'></i> Log out</NavLink>
                  <span>           {    user.email}   </span></div>
               )}
              </>
              :
              <>
                <NavLink to="/logout" onClick={handleClick} className="btn btn-outline-primary ms-2 px-4 rounded-pill">
                  <i className='fa fa-sign-out me-2'></i> Log out</NavLink>
              </>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;