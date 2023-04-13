// import React, { useState, useEffect } from 'react'
// import { Box, Grid } from '@mui/material';
// import Controls from '../components/controls/Controls'
// import { useForm, Form } from '../components/useForm';
// import { Row, Col } from 'react-bootstrap'
// import styled from 'styled-components';
// import "../assets/partials/requestForm.scss";
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import { useNavigate } from 'react-router';
// import { useDonationContext } from '../components/hoooks/useDonationContext';
// import { useAuthContext } from '../components/hoooks/useAuthContext'
// import Nav from '../components/Navbar/Navbar';
// import Footer from '../components/Footer';

// const mealTypeItems = [
//     { id: 'breakfast', title: 'Breakfast' },
//     { id: 'lunch', title: 'Lunch' },
//     { id: 'dinner', title: 'Dinner' },
// ]

// const initialValues = {
//     orgName: '',
//     orgEmail: '',
//     donorName: '',
//     date: new Date(),
// }
// export default function UpdateCalendar(props) {
//     //const { addOrEdit } = props
//     const navigate = useNavigate();
//     const { dispatch } = useDonationContext()
//     const { user } = useAuthContext()
//     const [isSubmit, setIsSubmit] = useState(false);
//     const [formErrors, setFormErrors] = useState({});
//     const validate = (fieldValues = values) => {
//         let temp = { ...errors }
//         if ('orgName' in fieldValues)
//             temp.orgName = fieldValues.orgName ? "" : "This field is required."
//         if ('orgEmail' in fieldValues)
//             temp.orgEmail = (/$^|.+@.+..+/).test(values.orgEmail) ? "" : "Email is not valid."
//         if ('donorName' in fieldValues)
//             temp.orgSize = fieldValues.orgSize ? "" : "This field is required."
//         if ('confirmedDate' in fieldValues)
//             temp.confirmedDate = fieldValues.confirmedDate ? "" : "This field is required."
//         setErrors({
//             ...temp
//         })

//         if (fieldValues === values)
//             return Object.values(temp).every(x => x == "")
//     }

//     const {
//         values,
//         setValues,
//         errors,
//         setErrors,
//         resetForm
//     } = useForm(initialValues, true, validate);

//     const handleInputChange = (e) => {
//         let name = e.target.name;
//         let value = e.target.value;

//         setValues({ ...values, [name]: value });
//         //console.log(values);
//     }

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!user) {
//             setFormErrors('You must be logged in')
//             return
//         }
//         setFormErrors(validate(values));
//         if (validate()) {
//             setIsSubmit(true)
//         }
//         const { orgName, orgEmail, donorName,confirmedDate } = values;
//         const DateSet = {orgName, orgEmail, donorName,confirmedDate}
//         try {
//             //It is submitted on port 3000 by default 
//             //which is front end but we need to submit it on
//             //backend which is on port 3001. so we need proxy
//             const res = await fetch('/calendarView', {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${user.token}`
//                 },
//                 body: JSON.stringify({DateSet})
//             })
//             if (res.status === 400 || !res) {
//                 window.alert("Message Not Sent. Try Again Later")
//             } else {
//                 window.alert("Message Sent Successfully");
//                 setValues({
//                     orgName: '',
//                     orgEmail: '',
//                     donorName: '',
//                     confirmedDate: '',
//                 }, dispatch({ type: 'CREATE_DONATIONS', payload: JSON }))
//                 console.log(values);


//                 //  window.location.reload();
//                 if (validate) {
//                     navigate('/calendarNew')
//                 } else {
//                     window.alert("Message Not Sent. Try Again Later")
//                 }
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     useEffect(() => {
//         console.log(formErrors)
//         if (Object.keys(formErrors).length === 0 && isSubmit) {
//             console.log(values)
//         }
//     }, [formErrors])
//     return (
//         <>
//         <Nav/>
//         <section id="service">
//                 <div className="container py-5">
//                 <Row className='request'>
//             <div className='reqDiv'>

//                 <center>
//                     <Col xs={12} className='md-5 mt-4 mb-4 align-middle'>
//                         <h2 className='topic2'>Request Form</h2>
//                     </Col>
//                 </center>

//                 <center>
//                 <div className='row mt-5'>
//                         <div className="col-md-6">
//                             <div>

//                     <MainContainer>
//                         <form onSubmit={handleSubmit} method={'POST'}>
//                             <div>
//                                 <Grid container>
//                                     <Grid item xs={6}>
//                                         <Box my={4} mx={4}>
//                                             <Controls.Input
//                                                 name="orgName"
//                                                 label="Organization Name"
//                                                 value={values.orgName}
//                                                 onChange={handleInputChange}
//                                                 error={errors.orgName}
//                                             />
//                                         </Box>

//                                         <Box my={4} mx={4}>
//                                             <Controls.Input

//                                                 label="Email Address"
//                                                 name="orgEmail"
//                                                 value={values.orgEmail}
//                                                 onChange={handleInputChange}
//                                                 error={errors.orgEmail}
//                                             />
//                                         </Box>

//                                         <Box my={4} mx={4}>
//                                             <Controls.Input

//                                                 label="donorName"
//                                                 name="donorName"
//                                                 value={values.donorName}
//                                                 onChange={handleInputChange}
//                                                 error={errors.donorName}
//                                             />
//                                         </Box>
//                                         <Box my={2} mx={4}>
//                                             <FormControl sx={{ width: 400 }}>
//                                                 <Controls.DatePicker1
//                                                     name="confirmedDate"
//                                                     label="Confirmed Date"
//                                                     value={values.confirmedDate}
//                                                     onChange={handleInputChange}
//                                                 />
//                                             </FormControl>
//                                         </Box>
//                                         {/* <DatePicker1/> */}
//                                         <div >
//                                             <Box my={4} mx={4}>

//                                                 <Controls.Button
//                                                     // variant="contained"
//                                                     // color="primary"
//                                                     // size="large"
//                                                     onClick={handleSubmit}
//                                                     type="submit"
//                                                     text="Submit"


//                                                 />
//                                             </Box>
//                                         </div>
//                                     </Grid>
//                                 </Grid>
//                             </div>
//                         </form>
//                         <Col xs={12} className='md-5 mt-4 mb-4 align-right'>
                            
//                         </Col>
//                         <div className="col-md-6">
//                             <div class="p-3">
//                                 <img src={require('../assets/vol.jpg')} class="card-img-top" alt="oldagehome" height={'300px'} />

//                             </div>
//                         </div>
//                     </MainContainer>
//                     </div>
//                     </div>
//                     </div>
                
//                 </center>


//             </div>
//         </Row>
//         </div>
       
//         </section>
//         {/* // </Grid> */}
// <Footer/>
// </>
//     )
// }

// const MainContainer = styled.div`
//       align-items:center;
//     flex-direction:column;
//     width:60vw;
//     background:rgba(255,255,255,0.15);
//     backdrop-filter:blur(8.5px);
//     margin-bottom:4%;
//     background:rgba(255,255,255,0.4);
//     box-shadow:0 8px 32px 0 rgba(31,38,135,0.37);`;

import React, { useState, useEffect } from 'react'
import { Box, Grid } from '@mui/material';
import Controls from '../components/controls/Controls'
import { useForm, Form } from '../components/useForm';
import styled from 'styled-components';
import "../assets/partials/requestForm.scss";
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router';
import { useDonationContext } from '../components/hoooks/useDonationContext';
import { useAuthContext } from '../components/hoooks/useAuthContext'
import Nav from '../components/Navbar/Navbar';
import Footer from '../components/Footer';
    
    
    const initialValues = {
        donorName: '',
        donorEmail: '',
        mealType: '',
        phone:'',
        confirmedDate: new Date(),
    }


export default function UpdateCalendar(props) {
    //const { addOrEdit } = props
    const navigate = useNavigate();
    const { dispatch } = useDonationContext()
    const { user } = useAuthContext()
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('donorName' in fieldValues)
            temp.donorName = fieldValues.donorName ? "" : "This field is required."
        if ('donorEmail' in fieldValues)
            temp.donorEmail = (/$^|.+@.+..+/).test(values.donorEmail) ? "" : "Email is not valid."
        if ('mealType' in fieldValues)
            temp.mealType = fieldValues.mealType ? "" : "This field is required."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone ? "" : "This field is required."
        if ('confirmedDate' in fieldValues)
            temp.confirmedDate = fieldValues.confirmedDate ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        resetForm
    } = useForm(initialValues, true, validate);

    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setValues({ ...values, [name]: value });
        //console.log(values);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user) {
            setFormErrors('You must be logged in')
            return
        }
        setFormErrors(validate(values));
        if (validate()) {
            setIsSubmit(true)
        }
        const { donorName, donorEmail, mealType,phone,confirmedDate } = values;
       // const DateSet = {orgName, orgEmail, donorName,confirmedDate}
        try {
            //It is submitted on port 3000 by default 
            //which is front end but we need to submit it on
            //backend which is on port 3001. so we need proxy
            const res = await fetch('/api/calendarView', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    donorName, donorEmail, mealType,phone,confirmedDate
                })
            })
            if (res.status === 400 || !res) {
                window.alert("Message Not Sent. Try Again Later")
                console.log(errors)
            } else {
                window.alert("Message Sent Successfully");
                setValues({
                    donorName: '',
                    donorEmail: '',
                    mealType: '',
                    phone:'',
                    confirmedDate: '',
                }, dispatch({ type: 'CREATE_DONATIONS', payload: JSON }))
                console.log(values);


                 //window.location.reload();
                if (validate) {
                    navigate('/dataCards')
                } else {
                    window.alert("Message Not Sent. Try Again Later")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        console.log(formErrors)
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(values)
        }
    }, [formErrors])
    return (
        <>
            <Nav />
            <section id="service">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-12">
                            <h3 className='fs-5 text-center mb-0'>Update Calendar</h3>
                            {/* <h1 className='display-6 text-center mb-4'>You have a new Food Donation Request</h1> */}
                            <hr className='w-25 mx-auto' />
                        </div>
                    </div>
                    <center>
                    <MainContainer>
                    <div className='row mt-5'>
                   
                        <div className="col-md-6">
                            <div>

                                <div>

                                <form onSubmit={handleSubmit} method={'POST'}>
                            <div>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Box my={4} mx={4}>
                                            <FormControl sx={{ width: '200%' }}>
                                            <Controls.Input
                                                name="donorName"
                                                label="Donor Name"
                                                value={values.donorName}
                                                onChange={handleInputChange}
                                                error={errors.donorName}
                                            />
                                            </FormControl>
                                        </Box>

                                        <Box my={4} mx={4}>
                                        <FormControl sx={{ width: '200%' }}>
                                            <Controls.Input

                                                label="Donor Email Address"
                                                name="donorEmail"
                                                value={values.donorEmail}
                                                onChange={handleInputChange}
                                                error={errors.donorEmail}
                                            />
                                            </FormControl>
                                        </Box>

                                        <Box my={4} mx={4}>
                                        <FormControl sx={{ width: '200%' }}>
                                            <Controls.Input
                                                sx={{ width: '200%' }}
                                                label="Meal Type"
                                                name="mealType"
                                                value={values.mealType}
                                                onChange={handleInputChange}
                                                error={errors.mealType}
                                            />
                                            </FormControl>
                                        </Box>

                                        <Box my={4} mx={4}>
                                        <FormControl sx={{ width: '200%' }}>
                                            <Controls.Input
                                                sx={{ width: '200%' }}
                                                label="Contact Number"
                                                name="phone"
                                                value={values.phone}
                                                onChange={handleInputChange}
                                                error={errors.phone}
                                            />
                                            </FormControl>
                                        </Box>
                                        <Box my={2} mx={4}>
                                            <FormControl sx={{ width: '200%' }}>
                                                <Controls.DatePicker1
                                                    name="confirmedDate"
                                                    label="Confirmed Date"
                                                    value={values.confirmedDate}
                                                    onChange={handleInputChange}
                                                />
                                            </FormControl>
                                        </Box>
                                        {/* <DatePicker1/> */}
                                        <div >
                                            <center>
                                            <Box my={4} mx={5}>

                                                <Controls.Button
                                                    // variant="contained"
                                                    // color="primary"
                                                    // size="large"
                                                    onClick={handleSubmit}
                                                    type="submit"
                                                    text="Submit"


                                                />
                                            </Box>
                                            </center>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>

                        </form>
                                </div>

                            </div>
                            
                        </div>
                        
                        <div className="col-md-6">
                            <div class="p-3">
                                <img src={require('../assets/calendar.gif')} class="card-img-top" alt="oldagehome" height={'300px'} />

                            </div>
                        </div>
                        
                    </div>
                    </MainContainer>
                    </center>
                </div>

            </section>
            <Footer />
        </>
    )
}

const MainContainer = styled.div`
      align-items:center;
    flex-direction:column;
    width:60vw;
    background:rgba(255,255,255,0.15);
    backdrop-filter:blur(8.5px);
    margin-bottom:4%;
    background:rgba(255,255,255,0.4);
    box-shadow:0 8px 32px 0 rgba(31,38,135,0.37);`;



