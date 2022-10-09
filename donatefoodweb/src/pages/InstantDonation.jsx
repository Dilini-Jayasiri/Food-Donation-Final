import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
// import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import { Row, Col } from 'react-bootstrap'
import Controls from '../components/controls/Controls'
import { useForm, Form } from '../components/useForm';
import * as orgType from '../organizations/orgType'
import GradientButton from 'react-linear-gradient-button';
import { NavLink } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import '../assets/partials/instantDonation.scss';
import styled from 'styled-components';

const navLinkStyles = () => {
    return {
        textDecoration: 'none',
    }
}
const donorType = [
    { id: 'inidividual', title: 'Individual' },
    { id: 'group', title: 'Group or People' },
]

const mealType = [
    { id: 'breakfast', title: 'Breakfast' },
    { id: 'lunch', title: 'Lunch' },
    { id: 'dinner', title: 'Dinner' }
]

const initialValues = {
    id: '',
    donorType: '',
    donorName: '',
    phone: '',
    donorEmail:'',
    mealType: '',
    quantity: '',
    oldFood: '',
    location: '',
    org: '',
    prefferedArea: '',
    confirmTime: ''
}

export default function InstantDonation(props) {
    const { addOrEdit } = props



    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('donorType' in fieldValues)
            temp.donorType = fieldValues.donorType ? "" : "This field is required."
        if ('donorName' in fieldValues)
            temp.donorName = fieldValues.donorType ? "" : "This field is required."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone.length > 9 ? "" : "Minimum 10 numbers required."
        if ('donorEmail' in fieldValues)
            temp.donorEmail = (/$^|.+@.+..+/).test(values.donorEmail) ? "" : "Email is not valid."
        if ('mealType' in fieldValues)
            temp.mealType = fieldValues.mealType ? "" : "This field is required."
        if ('quantity' in fieldValues)
            temp.quantity = fieldValues.quantity ? "" : "This field is required."
        if ('oldFood' in fieldValues)
            temp.oldFood = fieldValues.oldFood ? "" : "This field is required."
        if ('location' in fieldValues)
            temp.location = fieldValues.location ? "" : "This field is required."
        if ('org' in fieldValues)
            temp.org = fieldValues.org ? "" : "This field is required."
        if ('prefferedArea' in fieldValues)
            temp.prefferedArea = fieldValues.prefferedArea ? "" : "This field is required."
        // if ('confirmTime' in fieldValues)
        //     temp.confirmTime = fieldValues.confirmTime ? "" : "This field is required."
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

    // const [value, setValue] = React.useState<Date | null>
    //     new Date('2022-01-01T00:00:00.000Z')
    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setValues({ ...values, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm)
        }
        //Object Destructuring
        //Store object data into variables
        const { donorType, donorName, phone,donorEmail, mealType, quantity, oldFood, location, prefferedArea, org, confirmTime } = values;

        try {
            //It is submitted on port 3000 by default 
            //which is front end but we need to submit it on
            //backend which is on port 3001. so we need proxy
            const res = await fetch('/instantDon', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    donorType, donorName, phone,donorEmail, mealType, quantity, oldFood, location, prefferedArea, org, confirmTime
                })
            })
            if (res.status === 400 || !res) {
                window.alert("Message Not Sent. Try Again Later")
            } else {
                window.alert("Message Sent Successfully");
                setValues({

                    donorType: '',
                    donorName: '',
                    phone: '',
                    donorEmail:'',
                    mealType: '',
                    quantity: '',
                    oldFood: '',
                    location: '',
                    prefferedArea: '',
                    org: '',
                    confirmTime: ''

                })

            }
        } catch (error) {
            console.log(error);
        }
    }
//     const MainContainer = styled.div`
  
//   align-items:center;
//   flex-direction:column;
//   width:60vw;
//   background:rgba(255,255,255,0.15);
//   backdrop-filter:blur(8.5px);
//   margin-bottom:4%;
//   `;

    return (

        <Row className='donation'>
            <div className='donDiv'>

                {/* <center> */}
                <Col xs={12} className='md-5 mt-4 mb-4 align-middle'>
                    <h2>Instant Donation</h2>
                </Col>
                {/* </center> */}
               
                <center>

                    <MainContainer>
                        <Form onSubmit={handleSubmit} method={'POST'}>
                            <div>
                                <Grid container className='donationCon'>
                                    <Grid item xs={12}>
                                        <center>
                                            <Box my={4} mx={4}>
                                                <Controls.Input
                                                    name="donorName"
                                                    label="Donor Name"
                                                    value={values.donorName}
                                                    onChange={handleInputChange}
                                                    error={errors.donorName}
                                                />
                                            </Box>

                                            <Box my={4} mx={4}>
                                                <Controls.Input
                                                    label="Contact Number"
                                                    name="phone"
                                                    value={values.phone}
                                                    onChange={handleInputChange}
                                                    error={errors.phone}
                                                />
                                            </Box>

                                            <Box my={4} mx={4}>
                                                <Controls.Input

                                                    label="Email Address"
                                                    name="donorEmail"
                                                    value={values.donorEmail}
                                                    onChange={handleInputChange}
                                                    error={errors.donorEmail}
                                                />
                                            </Box>

                                            <Box my={4} mx={4}>
                                                <label className='labelA'>Meal Type</label>
                                                <Controls.RadioGroups
                                                    name="mealType"
                                                    value={values.mealType}
                                                    onChange={handleInputChange}
                                                    items={mealType}
                                                />
                                            </Box>

                                            <Box my={4} mx={4}>
                                                <Controls.Input
                                                    label="Quantity"
                                                    name="quantity"
                                                    value={values.quantity}
                                                    onChange={handleInputChange}
                                                    error={errors.quantity}
                                                />
                                            </Box>

                                            <Box my={4} mx={4}>
                                                <Controls.Input

                                                    label="How much time passes after prepare food"
                                                    name="oldFood"
                                                    value={values.oldFood}
                                                    onChange={handleInputChange}
                                                    error={errors.oldFood}
                                                />
                                            </Box>

                                            <Box my={4} mx={4}>
                                                <Controls.Input
                                                    label="Location"
                                                    name="location"
                                                    value={values.location}
                                                    onChange={handleInputChange}
                                                    error={errors.location}
                                                />
                                            </Box>



                                            <Box my={4} mx={4}>
                                                <Controls.Input
                                                    label="Preffered Area"
                                                    name="prefferedArea"
                                                    value={values.prefferedArea}
                                                    onChange={handleInputChange}
                                                    error={errors.prefferedArea}
                                                />
                                            </Box>

                                            <Box my={4} mx={4}>
                                                <Controls.Input
                                                    label="Organization"
                                                    name="org"
                                                    value={values.org}
                                                    onChange={handleInputChange}
                                                    error={errors.org}

                                                />
                                                <NavLink style={navLinkStyles} to="/tableNew"><GradientButton className='sm' >Search Organization</GradientButton></NavLink>

                                            </Box>
                                            <Box my={4} mx={4} className='timePickerA'>


                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DateTimePicker
                                                        style={{ width: '50%' }}
                                                        renderInput={(props) => <TextField {...props} />}
                                                        label="Confirm Date and Time"
                                                        value={values.confirmTime}
                                                        onChange={(handleInputChange) => {
                                                            setValues(handleInputChange);
                                                        }}
                                                    />
                                                </LocalizationProvider>
                                            </Box>




                                            <div >
                                                <Box my={4} mx={4}>
                                                    <Box my={4} mx={4}>
                                                        <Controls.Button
                                                            // variant="contained"
                                                            // color="primary"
                                                            // size="large"
                                                            onClick={handleSubmit}
                                                            type="submit"
                                                            text="Submit"
                                                        />
                                                    </Box>
                                                </Box>
                                            </div>
                                        </center>
                                    </Grid>
                                </Grid>
                            </div>
                        </Form>
                    </MainContainer>
                </center>


            </div>

        </Row>


    );

}

const MainContainer = styled.div`
  
align-items:center;
flex-direction:column;
width:60vw;
background:rgba(255,255,255,0.15);
backdrop-filter:blur(8.5px);
margin-bottom:4%;
`;
