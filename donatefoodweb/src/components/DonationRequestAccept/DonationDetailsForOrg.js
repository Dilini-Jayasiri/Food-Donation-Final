import { useDonationContext } from "../hoooks/useDonationContext"
//import {useAuthContext} from './hoooks/useAuthContext'
//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const DonationDetailsForOrg = ({don}) =>{

    return (
        <div className="home">
        <div className="work-Details">
        <section id="service">
            
                <div className="row">
                    <div className="col-12">
                        <h3 className='fs-5 text-center mb-0'>Congratulations!!!</h3>
                        <h3 className='display-6 text-center mb-4'>You have a new Food Donation Request</h3>
                        <hr className='w-25 mx-auto' />
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className="col-md-6">
                        <div class="card p-3">

                            <div class="card-body text-center">
                                {/* <i className='fa fa-cogs fa-4x mb-4 text-primary'></i> */}
                                <h5 class="card-title mb-3 fs-4 fw-bold">Children's Home</h5>
 <h4><strong>Donor Name: {don.donorName}</strong></h4>
           <p><strong>Contact No : </strong>{don.phone}</p>
           <p><strong>Donor Email : </strong>{don.donEmail}</p>
           <p><strong>Address : </strong>{don.address}</p>
           <p><strong>Quantity : </strong>{don.quantity}</p>
           <p><strong>Food Name : </strong>{don.foodName}</p>
           <p><strong>Meal Type : </strong>{don.mealType}</p>
           <p><strong>Food Type : </strong>{don.foodType}</p>
           <p><strong>Donation Sheduled Date : </strong>{don.date}</p>
           {/* <p><strong>Created At: </strong>{formatDistanceToNow(new Date(don.date),{addSuffix:true})}</p> */}
                                
                               
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="p-3">
                            <img src={require('../../assets/vol.jpg')} class="card-img-top" alt="oldagehome" height={'300px'} />

                        </div>
                    </div>
                </div>
           

        </section>
            {/* <h4><strong>Your Donation Is Not Accepted Yet</strong></h4> */}

          
          
        </div>
        </div>
)
    }

export default DonationDetailsForOrg;