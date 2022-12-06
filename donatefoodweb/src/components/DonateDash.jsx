import React from 'react'
import { NavLink } from 'react-router-dom';
import {Col,Button} from 'react-bootstrap';
import 'animate.css';
import GradientButton from 'react-linear-gradient-button'

const navLinkStyles = () =>{
  return{
    //fontWeight:  'bold',
    //fontSize:'20px',
    textDecoration:  'none',
    borderRadius:'20'
    //color:'#fff',
    //background:'#7600dc',
    

  }
}

 const DonateDash = () => {
  return (
    <div>
       
           <div className="container shadow my-5 form animate__animated animate__backInRight">
               <div className="row justify-content-center"> 
                   <div className="col-md-5 d-flex flex-column">
                       <h5 className="topic display-4 fw-bolder">We Accept</h5>
                         <ul>
                                <li> Short coded product</li>
                                  <li> Excess product</li>
                                  <li> Product not meeting retailer specification</li>
                                  <li> Discontinued product</li>
                                  <li> Product requiring relabelling</li>
                                  <li> Under or over weight product</li>
                                  <li>Private label product</li>
                                  <li>New product lines or promotions which didn’t take off</li>
                                  <li>Product withdrawals if they’re still fit for use</li>
                         </ul>
                   
                   </div>
               </div>
           </div>
           <div className="container shadow my-5 form animate__animated animate__backInLeft animate__delay-2s ">
               <div className="row justify-content-center"> 
                   <div className="col-md-5 d-flex flex-column">
                   <h5 className="topic display-4 fw-bolder">We Don't Accept</h5>
                         <ul>
                              <li>Regulated products such as alcohol, tobacco or drugs of dependence</li>
                              <li>Product past its use by date</li>
                              <li>Product more than 6 months past its best before date</li>
                              <li>Product where the packaging seal has been broken</li>
                              <li>Mouldy or rotting product</li>
                              <li>Product where the cold chain has not been maintained</li>
                              <li>Product subject to a safety recall</li>
                              <li>Unlabelled product provided without ingredient details</li>
                         </ul>
                   
                   </div>
               </div>
           </div>
           <Col xs={12} className='md-5 my-3'>
           <center>
          <NavLink style={navLinkStyles} to="/donationType">
            <Button style={{ backgroundImage: `linear-gradient(to right, #1abc9c 50%, #16a085 100%)`, }} >Go to Donation Page</Button>
            {/* <GradientButton  >Go to Donation Page</GradientButton> */}
          </NavLink>
             </center>
             </Col>
          </div>
    
  )
}

export default DonateDash;
