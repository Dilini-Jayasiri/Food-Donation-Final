import React,{useEffect} from 'react';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { Row, Col } from 'react-bootstrap'
import Controls from '../components/controls/Controls'
import { useForm, Form } from '../components/useForm';
import '../assets/partials/instantDonation.scss';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';

const navLinkStyles = () => {
    return {
        textDecoration: 'none',
    }
}


const mealType = [
    { id: 'breakfast', title: 'Breakfast' },
    { id: 'lunch', title: 'Lunch' },
    { id: 'dinner', title: 'Dinner' }
]

const initialValues = {
    id: '',
    donorName: '',
    phone: '',
    donEmail:'',
    mealType: '',
    quantity: '',
    oldFood: '',
    address: '',
    area: '',
    orgName: '',
    date:'',
    foodName:'',
    foodType:''
    
}

export default function InstantDonation(props) {
    const { addOrEdit } = props

const [organizationName,setOrganizationName]=useState("");
const [orgs,setOrgs] = React.useState([{'orgName':'','_id':''}]);

useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('/requests');
    const newData = await response.json();
    setOrgs(newData);
    console.log(newData);
  };
  fetchData();
},[]);


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('donorName' in fieldValues)
            temp.donorName = fieldValues.donorName ? "" : "This field is required."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone.length > 9 ? "" : "Minimum 10 numbers required."
        if ('donEmail' in fieldValues)
            temp.donEmail = (/$^|.+@.+..+/).test(values.donEmail) ? "" : "Email is not valid."
        if ('mealType' in fieldValues)
            temp.mealType = fieldValues.mealType ? "" : "This field is required."
        if ('quantity' in fieldValues)
            temp.quantity = fieldValues.quantity ? "" : "This field is required."
        if ('oldFood' in fieldValues)
            temp.oldFood = fieldValues.oldFood ? "" : "This field is required."
        if ('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "This field is required."
        if ('organizationName' in fieldValues)
            temp.organizationName = fieldValues.organizationName ? "" : "This field is required."
        if ('area' in fieldValues)
            temp.area = fieldValues.area ? "" : "This field is required."
        if ('date' in fieldValues)
            temp.date = fieldValues.date ? "" : "This field is required."
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
        const {donorName, phone,donEmail, mealType, quantity, oldFood, address, area, orgName,date,foodName,foodType} = values;

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
                 donorName, phone,donEmail, mealType, quantity, oldFood, address, area,orgName,date,foodName,foodType
                })
            })
            if (res.status === 400 || !res) {
                window.alert("Message Not Sent. Try Again Later")
            } else {
                window.alert("Message Sent Successfully");
                setValues({

                   // donorType: '',
                    donorName: '',
                    phone: '',
                    donEmail:'',
                    mealType: '',
                    quantity: '',
                    oldFood: '',
                    address: '',
                    area: '',
                    orgName: '',
                    date: '',
                    foodName:'',
                    foodType:''

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
                                                    name="donEmail"
                                                    value={values.donEmail}
                                                    onChange={handleInputChange}
                                                    error={errors.donEmail}
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
                                                    label="address"
                                                    name="address"
                                                    value={values.address}
                                                    onChange={handleInputChange}
                                                    error={errors.address}
                                                />
                                            </Box>



                                            <Box my={4} mx={4}>
                                                <Controls.Input
                                                    label="Preffered Area"
                                                    name="area"
                                                    value={values.area}
                                                    onChange={handleInputChange}
                                                    error={errors.area}
                                                />
                                            </Box>

                                            <Box my={4} mx={4}>
                                            <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Organization Type</InputLabel>
      <Select
      name="organizationName"
        labelId="demo-select-small"
        id="demo-select-small"
        value={values.organizationName}
        label="Organization Name"
        onChange={handleInputChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {orgs.map(org => (
          <MenuItem value={org.orgName} key={org._id}>{org.orgName}</MenuItem>
        ))}
        
        
      </Select>
    </FormControl>
                                                

                                            </Box>
                                            <Box my={4} mx={4} className='timePickerA'>
                                            <Controls.DatePicker1
                                    name="date"
                                    label="Date"
                                    value={values.date}
                                    onChange={handleInputChange}
                                    error={errors.date}
                                />

                                                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DateTimePicker
                                                        style={{ width: '50%' }}
                                                        renderInput={(props) => <TextField {...props} />}
                                                        label="Confirm Date and Time"
                                                        value={values.date}
                                                        onChange={(handleInputChange) => {
                                                            setValues(handleInputChange);
                                                        }}
                                                    />
                                                </LocalizationProvider> */}
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
