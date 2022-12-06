import React from 'react'
import { useNavigate } from 'react-router'
import '../../assets/partials/services.scss'
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import {alert} from '@mobiscroll/react';



const DonationReqAcc = () => {
    const navigate = useNavigate();
// const handleClick = ()=>{
//     navigate("/alart")
// }

const showAlert = () => {
    alert({
        title: 'Your Donation is on the way',
        message: 'Relevent Donor will Contact you soon',
    });
    
}
navigate("/home")

    return (
        <section id="service">
            <div className="container py-5">
                <div className="row">
                    <div className="col-12">
                        <h3 className='fs-5 text-center mb-0'>Congratulations!!!</h3>
                        <h1 className='display-6 text-center mb-4'>You have a new Food Donation Request</h1>
                        <hr className='w-25 mx-auto' />
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className="col-md-6">
                        <div class="card p-3">

                            <div class="card-body text-center">
                                {/* <i className='fa fa-cogs fa-4x mb-4 text-primary'></i> */}
                                <h5 class="card-title mb-3 fs-4 fw-bold">Children's Home</h5>

                                <p class="card-text lead">If you are like to recive the food donation Please confirm here</p>
                                <button type="button" onClick={showAlert}  class="btn btn-outline-primary btn-sm"><i className="fa fa-check-square" aria-hidden="true"></i> Confirm Request</button>
                                
                                
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="p-3">
                            <img src={require('../../assets/vol.jpg')} class="card-img-top" alt="oldagehome" height={'300px'} />

                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default DonationReqAcc;
