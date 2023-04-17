import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Nav from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer'
import { useDonationContext } from '../../components/hoooks/useDonationContext'
import { useAuthContext } from '../../components/hoooks/useAuthContext'
import { margin } from '@mui/system';
import { Box } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';


const navLinkStyles = () => {
  return {
    //fontWeight:  'bold',
    //fontSize:'20px',
    textDecoration: 'none',
    borderRadius: '20'
    //color:'#fff',
    //background:'#7600dc',


  }
}

function DonationShedule() {
    const { donations, dispatch } = useDonationContext()
    const { user } = useAuthContext()
    const [requestData, setRequestData] = useState([]);
    const { orgEmail } = useParams();

    const [dons, setDons] = useState([]);
    const [insDons,setInsDons] = useState([]);

    const date = new Date(); // assume myDate is a date object
    const formattedDate = date.toISOString().substring(0, 10);
    console.log(formattedDate);
    // const GetDonnerData = async () => {
    //     let response = await fetch(`/findDonorByEmail`, {
    //         body: { "orgEmail" : orgEmail },
    //         headers: {
    //             'Authorization': `Bearer ${user.token}`
    //         }
    //     })
    //         .then((data) => data.json())
    //         .then((data) => console.log("Dta from db ->",data))
    //         .catch((error) => console.log(error))
    //     const json = await response.json()
    //     if (response.ok) {
    //         dispatch({ type: 'SET_DONATIONS', payload: json })
    //         console.log(`request/Org/${requestData[0]}`)
    //     }
    // }

    useEffect(() => {
      const fetchResDonation = async () => {
        let response = await fetch(`/findDonorByEmail/${orgEmail}`, {
          headers: {
              'Authorization': `Bearer ${user.token}`
          }
      })
          .then((data) => data.json())
          .then((data) => setDons(data[0]))
          .catch((error) => console.log(error))
      const json = await response.json()
      if (response.ok) {
          dispatch({ type: 'SET_DONATIONS', payload: json })
          console.log(`request/Org/${requestData[0]}`)
      }
      }
      if (user) {
          fetchResDonation()
      }
    
    }, [dispatch, user])
  

    return (
      <>
        <Nav />
        <section id="service">
        <div className="container py-3 pr-3">
            <div className="row">     
       </div>
       </div>
          <div className="container py-5 pr-5">
            <div className="row">
              
              <div className="col-md-6">
                
              {dons.Instant && dons.Instant.length > 0 ? (
  dons.Instant.map((don, index) => (
   
    <Card
      bg="warning"
      text="white"
      style={{ width: '90%' }}
      className="m-3"
    >
      
      <Card.Header>Instant Donation Schedule</Card.Header>
      
      <Card.Body>
        <Card.Title>Donor Name : {don.donorName}</Card.Title>
        <Card.Text>
          <strong>
          Date : {don.date}
          </strong>
        </Card.Text> 
        <Card.Text> 
          Meal Type : {don.mealType}
        </Card.Text>
        <Card.Text>
          Contact Number : {don.phone}
        </Card.Text>
      </Card.Body>
    </Card>
  ))
) : (
  <Card
    bg="danger"
    text="white"
    style={{ width: '90%' }}
    className="m-3"
  >
    <Card.Header>No Instant Donations</Card.Header>
    <Card.Body>
      <Card.Text>
        There are currently no instant donations scheduled.
      </Card.Text>
    </Card.Body>
  </Card>
)}


              </div>
              <div className="col-md-6">
              {dons.Reserved && dons.Reserved.length > 0 ? (
  dons.Reserved.map((don, index) => (
    <Card
      bg="info"
      text="white"
      style={{ width: '90%' }}
      className="m-3"
    >
      <Card.Header>Reserved Donation Schedule</Card.Header>
      <Card.Body>
        <Card.Title>Donor Name : {don.donorName}</Card.Title>
        <Card.Text>
          <strong>
          Date : {don.date}
          </strong>
        </Card.Text> 
        <Card.Text> 
          Meal Type : {don.mealType}
        </Card.Text>
        <Card.Text>
          Contact Number : {don.phone}
        </Card.Text>
      </Card.Body>
    </Card>
  ))
) : (
  <Card
    bg="danger"
    text="white"
    style={{ width: '90%' }}
    className="m-3"
  >
    <Card.Header>No Reserved Donations</Card.Header>
    <Card.Body>
      <Card.Text>
        There are currently no reserved donations scheduled.
      </Card.Text>
    </Card.Body>
  </Card>
)}
              </div> 
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }
  
  

export default DonationShedule;