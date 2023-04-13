import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Nav from '../components/Navbar/Navbar'
import Footer from '../components/Footer'
import { useDonationContext } from '../components/hoooks/useDonationContext'
import { useAuthContext } from '../components/hoooks/useAuthContext'
import { margin } from '@mui/system';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import GradientButton from 'react-linear-gradient-button/lib/GradientButton'

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

function DateCards() {
    const { donations, dispatch } = useDonationContext()
    const { user } = useAuthContext()
    const [requestData, setRequestData] = useState([]);
   
    const [dons, setDons] = useState([]);
    const [insDons,setInsDons] = useState([]);

    const GetDonnerData = async () => {
        let response = await fetch(`/request/Org/${requestData[0].orgEmail}`, {
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
            console.log(`request/Org/${requestData[0]}`)
        }
    }

    useEffect(() => {
      const fetchResDonation = async () => {
          const response = await fetch('/api/calendarView', {
              headers: {
                  'Authorization': `Bearer ${user.token}`
              }
          })
             // .then((data) => data.json())
             .then((data) => data.json())
             .then((data) => setInsDons(data))
             const json = await response.json()
    
          if (response.ok) {
              dispatch({ type: 'SET_DONATIONS', payload: json })
              console.log(insDons)
          }else{
              console.log("nott")
          }
      }
      if (user) {
          fetchResDonation()
      }
    
    }, [dispatch, user])
  

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


    return (
      <>
        <Nav />
        <section id="service">
        <div className="container py-3 pr-3">
            <div className="row">     
       <Box>
       <NavLink style={navLinkStyles} to="/calendarForm">
              <GradientButton style={{ backgroundImage: `linear-gradient(to right, #1abc9c 50%, #16a085 100%)`, }} >Add new Donation</GradientButton>
            </NavLink>
       </Box>
       
       </div>
       </div>
          <div className="container py-5 pr-5">
            <div className="row">
              <div className="col-md-6">
                
              {dons.map((don, index) => (
                <Card
                  bg="success"
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
                ))}
              </div>
              <div className="col-md-6">
              {insDons.map(insDon => (
                <Card
                  bg="warning"
                  text="white"
                  style={{ width:'90%' }}
                  className="m-3"
                >
                  <Card.Header>Instant Donation Shedule</Card.Header>
                  <Card.Body>
                  <Card.Title>Donor Name : {insDon.donorName}</Card.Title>
                    <Card.Text>
                      <strong>
                    Date : {insDon.confirmedDate}
                    </strong>
                    </Card.Text> 
                    <Card.Text> 
                    Meal Type : {insDon.mealType}
                    </Card.Text>
                    <Card.Text>
                    Contact Number : {insDon.phone}
                    </Card.Text>
                   
                  </Card.Body>
                </Card>
                 ))}
              </div>
             
              
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }
  
  

export default DateCards;