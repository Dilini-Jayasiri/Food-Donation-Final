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
import GradientButton from 'react-linear-gradient-button'
import { Link,useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

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
const foodType = [
    { id: 'veg', title: 'Vegetarian' },
    { id: 'nonveg', title: 'Non-Vegetarian' },
    { id: 'both', title: 'Both' }
]


const initialValues = {
    id: '',
    Nic:'',
    donorName: '',
    phone: '',
    donEmail:'',
    address: '',
    orgName: '',
    date:'',
    quantity: '',
    oldFood: '',
    mealType: '',
    area: '',
    foodType:'',
    foodName:''
    
    }

//const inst = localStorage.setItem("donorname",values.donorName);

export default function InstantDonation(props) {
   // const { addOrEdit } = props

const [organizationName,setOrganizationName]=useState("");
const [orgs,setOrgs] = React.useState([{'orgName':'','_id':''}]);
const [isSubmit,setIsSubmit] = useState(false);
const [formErrors,setFormErrors] = useState({});
const navigate = useNavigate();

useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('/requests');
    const newData = await response.json();
    setOrgs(newData);
    //console.log(newData);
  };
  fetchData();
},[]);




    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('donorName' in fieldValues)
            temp.donorName = fieldValues.donorName ? "" : "This field is required."
        if ('nic' in fieldValues)
            temp.nic = fieldValues.nic ? "" : "This field is required."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone.length > 9 ? "" : "Minimum 10 numbers required."
        if ('donEmail' in fieldValues)
            temp.donEmail = (/$^|.+@.+..+/).test(values.donEmail) ? "" : "Email is not valid."
        if ('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "This field is required."
        if ('orgName' in fieldValues)
            temp.orgName = fieldValues.orgName ? "" : "This field is required."
        if ('date' in fieldValues)
            temp.date = fieldValues.date ? "" : "This field is required."
        if ('quantity' in fieldValues)
            temp.quantity = fieldValues.quantity ? "" : "This field is required."
        if ('oldFood' in fieldValues)
            temp.oldFood = fieldValues.oldFood ? "" : "This field is required."
        if ('mealType' in fieldValues)
            temp.mealType = fieldValues.mealType ? "" : "This field is required."
        if ('area' in fieldValues)
            temp.area = fieldValues.area ? "" : "This field is required."
        // if ('foodType' in fieldValues)
        //     temp.foodType = fieldValues.area ? "" : "This field is required."
        // if ('area' in fieldValues)
        //     temp.area = fieldValues.area ? "" : "This field is required."
        
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
    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setValues({ ...values, [name]: value });
       // console.log(values);
      // localStorage.setItem('Name',);
    }
    //Handle Submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormErrors(validate(values));
        if (validate()) {
            setIsSubmit(true)
            // navigate('/donationSummary')
            }
            emailjs.send('service_4myyg6h', 'template_ms3zy5j', values, 'AGKmDLzp5SojZrssC')
            .then(response => {
                console.log('Success',response);
            },error => {
                console.log('Failed...',error)
            })
        //Object Destructuring
        //Store object data into variables
        // if(validate()){
        //     addOrEdit(values, resetForm)
        // }
        //Object Destructuring
        //Store object data into variables
        const {nic,donorName, phone,donEmail,address,orgName,date,quantity,oldFood,mealType,area,foodType,foodName} = values;

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
                    nic,donorName, phone,donEmail,address,orgName,date,quantity,oldFood,mealType,area,foodType,foodName
                })
            })
            if (res.status === 400 || !res) {
                window.alert("Message Not Sent. Try Again Later")
            } else {
                window.alert("Message Sent Successfully");
                setValues({

                   // donorType: '',
                   nic:'',
                    donorName: '',
                    phone: '',
                    donEmail:'',
                    address: '',
                    orgName: '',
                    date: '',
                    quantity: '',
                    oldFood: '',
                    mealType: '',
                    area: '',
                    foodType:'',
                    foodName:''
                    
                    

                })
               const donname= localStorage.setItem("donorname",res.values.donorName);
                navigate("/donationSummary");

            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        console.log(formErrors)
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(values)
        }
    },[formErrors])
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
                    <h2 className="topic">Instant Donation</h2>
                </Col>
                {/* </center> */}
               
                <center>

                    <MainContainer>
                        <form onSubmit={handleSubmit} method={'POST'}>
                            <div>
                                <Grid container className='donationCon'>
                                    <Grid item xs={12}>
                                        <center>
                                        <Box my={4} mx={4}>
                                                <Controls.Input
                                                    name="nic"
                                                    label="Donor NIC"
                                                    value={values.nic}
                                                    onChange={handleChange}
                                                    error={errors.nic}
                                                />
                                            </Box>
                                            <Box my={4} mx={4}>
                                                <Controls.Input
                                                    name="donorName"
                                                    label="Donor Name"
                                                    value={values.donorName}
                                                    onChange={handleChange}
                                                    error={errors.donorName}
                                                />
                                            </Box>

                                            <Box my={4} mx={4}>
                                                <Controls.Input
                                                    label="Contact Number"
                                                    name="phone"
                                                    value={values.phone}
                                                    onChange={handleChange}
                                                    error={errors.phone}
                                                />
                                            </Box>

                                            <Box my={4} mx={4}>
                                                <Controls.Input

                                                    label="Email Address"
                                                    name="donEmail"
                                                    value={values.donEmail}
                                                    onChange={handleChange}
                                                    error={errors.donEmail}
                                                />
                                            </Box>

                                            <Box my={4} mx={4}>
                                                <Controls.Input
                                                    label="address"
                                                    name="address"
                                                    value={values.address}
                                                    onChange={handleChange}
                                                    error={errors.address}
                                                />
                                            </Box>

                                            <Box my={2} mx={4}>
                                        <FormControl sx={{width: 850 }}> 
        <InputLabel id="demo-simple-select-autowidth-label">Organization Type</InputLabel>
      <Select
      name="orgName"
        labelId="demo-select-small"
        id="demo-select-small"
        value={values.orgEmail}
        label="Organization Name"
        onChange={handleChange}
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

                                         <Box my={4} mx={4}>
                                                <Controls.Input
                                                    label="Quantity"
                                                    name="quantity"
                                                    value={values.quantity}
                                                    onChange={handleChange}
                                                    error={errors.quantity}
                                                />
                                            </Box>

                                            <Box my={4} mx={4}>
                                                <Controls.Input

                                                    label="How much time passes after prepare food"
                                                    name="oldFood"
                                                    value={values.oldFood}
                                                    onChange={handleChange}
                                                    error={errors.oldFood}
                                                />
                                            </Box>

                                            <Box my={4} mx={4}>
                                                <label className='labelA'>Meal Type</label>
                                                <Controls.RadioGroups
                                                    name="mealType"
                                                    value={values.mealType}
                                                    onChange={handleChange}
                                                    items={mealType}
                                                />
                                            </Box>

                                            <Box my={4} mx={4}>
                                                <Controls.Input
                                                    label="Preffered Area"
                                                    name="area"
                                                    value={values.area}
                                                    onChange={handleChange}
                                                    error={errors.area}
                                                />
                                            </Box>

                                            <Box my={4} mx={4}>
                                                <label className='labelA'>Food Type</label>
                                                <Controls.RadioGroups
                                                    name="foodType"
                                                    value={values.foodType}
                                                    onChange={handleChange}
                                                    items={foodType}
                                                />
                                            </Box>

                                            <Box my={4} mx={4}>
                                                <Controls.Input
                                                    label="Food Name"
                                                    name="foodName"
                                                    value={values.foodName}
                                                    onChange={handleChange}
                                                    error={errors.foodName}
                                                />
                                            </Box>


                                           
                                            <Box my={4} mx={4}>
                            <FormControl sx={{width: 852 }}> 
                                <Controls.DatePicker1 
                                    name="date"
                                    label="Date"
                                    value={values.date}
                                    onChange={handleChange}
                                    
                                />
                                </FormControl>
                            

                                                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DateTimePicker
                                                        style={{ width: '50%' }}
                                                        renderInput={(props) => <TextField {...props} />}
                                                        label="Confirm Date and Time"
                                                        value={values.date}
                                                        onChange={(handleChange) => {
                                                            setValues(handleChange);
                                                        }}
                                                    />
                                                </LocalizationProvider> */}
                                            </Box>




                                            <div >
                                                <Box my={4} mx={4}>
                                                    <Box my={4} mx={4}>
                                                        <Link to={"/donationSummary"}>
                                                        <GradientButton
                                        style={{ width: '50%' }}
                                        onClick={handleSubmit}
                                        type="submit"
                                        text="Submit">
                                        Submit
                                        <i className="fa fa-paper-plane ms-2"></i>
                                    </GradientButton>
                                    </Link>
                                                    </Box>
                                                </Box>
                                            </div>
                                        </center>
                                    </Grid>
                                </Grid>
                            </div>
                        </form>
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
