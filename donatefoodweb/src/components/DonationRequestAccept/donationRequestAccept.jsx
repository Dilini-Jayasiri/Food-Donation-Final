import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import '../../assets/partials/services.scss'
import Nav from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer'
import { useDonationContext } from '../../components/hoooks/useDonationContext'
import { useAuthContext } from '../../components/hoooks/useAuthContext'
import emailjs from '@emailjs/browser';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import GradientButton from 'react-linear-gradient-button'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const navLinkStyles = () => {
    return {
        textDecoration: 'none',
        width: '50%'
    }
}

const DonationReqAcc = (props) => {

    const { orgName } = props;
    const { donations, dispatch } = useDonationContext()
    const { user } = useAuthContext()
    const navigate = useNavigate();
    const [status, setStatus] = useState();
    const [requestData, setRequestData] = useState([]);
    const [dons, setDons] = useState([]);

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     emailjs.send('service_4myyg6h', 'template_xge57pr', dons, 'AGKmDLzp5SojZrssC')
    //         .then(response => {
    //             console.log('Success', response);
    //             console.log("Message sent")
    //         }, error => {
    //             console.log('Failed...', error)
    //             console.log("message not sent")
    //         })
    // }



    const GetDonnerData = async () => {
        let response = await fetch(`request/Org/${requestData[0].orgEmail}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then((data) => data.json())
            .then((data) => setDons(data))
            .catch((error) => console.log(error))
        const json = await response.json()
        if (response.ok) {
            dispatch({ type: 'SET_DONATIONS', payload: json })
        }
    }

 // Getting Last Details
    useEffect(() => {
        const fetchRequest = async () => {
            const response = await fetch('/api/lastRequest', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                // .then((data) => data.json())
                .then((data) => data.json())
                .then((data) => {
                    setRequestData(data, () => { console.log("Set Data from API Requests", data) });
                })
                .catch((error) => console.log(error))
        }


        if (user) {
            fetchRequest()
        }
    }, []);
    GetDonnerData();

//update status
const onUpdateHandle = async (id,optionData) => {
    //console.log("Row Data->",RowData, "Option Data ->", optionData)
    console.log( "Data -> ",`/api/instantDonations/${id}`)
    try {
      const res = await fetch(`/api/instantDonations/${id}`, {
          method :"POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
          },
          body :JSON.stringify({
            "status": optionData
        })
      });

      if(res.status === 400 || !res){
          window.alert("Invalid Credentials"); 
      }else{
          console.log("Response Data -> ",res);
          dispatch({ type: 'CREATE_DONATIONS', payload: JSON });
          alert("Your Request Sent to the Donor")
         // navigate('/home');
      }
  } catch (error) {
      console.log(error);
  }
 }
 console.log(dons);

    if (dons.length === 0) {
        return (
            <>
        <Nav/>
        <section id="service">
                <div className="container py-5">
                    <div className="row">
                        <center>
                            <div className="col-12">
                        <h1>There are Currently No Pending Donations !!!</h1>
                        <p>We Will Contact You When We Got Donation</p>
                            <hr className='w-25 mx-auto' />
                        </div>
                        <center>
                            <div class>
                                <img src={require('../../assets/vol.jpg')} class="card-img-top" alt="oldagehome" width={'100px'} height={'400px'} />

                            </div>
                            </center>
                        </center>
                        <div className='row mt-5'>
                        <div className="col-md-6">
                                <div className="col-md-6">
                                
                        </div> 
                                </div>
                    </div>
                    </div>
                    </div>
                    </section>
           
           <Footer/>
    </>
        )
      }
    return (
        <>
            <Nav />
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
                            <div>

                                <div>

                                    {dons.map((don, index) => (
                                        <div class="card p-3 m-2">
                                            <div class="card-body text-center">
                                                <p key={index}><strong>Donor Name : </strong>{don.donorName}</p>
                                                <p key={index}><strong>Donor Email : </strong>{don.donEmail}</p>
                                                <p key={index}><strong>Contact : </strong>{don.phone}</p>
                                                <p key={index}><strong>City : </strong>{don.area ? don.area : don.district}</p>
                                                <p key={index}><strong>Requested Quantity : </strong>{don.quantity}</p>
                                                <p key={index}><strong>Donor Address : </strong>{don.address}</p>
                                                <p key={index}><strong>Time passed after preparing meal(Instant Donation) or Date(Reserved Donation): </strong>{don.oldFood ? don.oldFood : don.date}</p>
                                                <p class="card-text lead">If you are like to recive the food donation Please confirm here</p>
                                                
                                                <div>
                                                    <Box my={5} mx={12}>
                                                            <Select
                                                                name="Accept"
                                                                style={{ width: '100%' }}
                                                                labelId="demo-select-medium"
                                                                // id="demo-select-small"
                                                                placeholder="Action"
                                                                value={status}
                                                                onChange={(e) => onUpdateHandle(don._id,e.target.value)}  
                                                                
                                                            >
                                                                <MenuItem value={status}>
                                                                    <em>Action</em>
                                                                </MenuItem>
                                                                <MenuItem value={"Accept"}>Accept</MenuItem>
                                                            </Select>
                                                        {/* </NavLink>  */}
                                                    </Box>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

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
            <Footer />
        </>
    )
}
export default DonationReqAcc;
