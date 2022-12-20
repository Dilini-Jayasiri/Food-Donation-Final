import React,{useEffect} from 'react';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Controls from '../components/controls/Controls'
import { useForm } from '../components/useForm';
import '../assets/partials/instantDonation.scss';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import GradientButton from 'react-linear-gradient-button'
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { NavLink } from 'react-router-dom';
import { useDonationContext } from '../components/hoooks/useDonationContext'
import {useAuthContext} from '../components/hoooks/useAuthContext'

const navLinkStyles = () => {
    return {
        textDecoration: 'none',
        width: '100%'
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
   const {donations,dispatch}  = useDonationContext()
   const {user} = useAuthContext()
  
const [organizationName,setOrganizationName]=useState("");
const [orgs,setOrgs] = React.useState([{'orgName':'','_id':''}]);
const [isSubmit,setIsSubmit] = useState(false);
const [formErrors,setFormErrors] = useState({});
const navigate = useNavigate();

// useEffect(() => {
//   const fetchData = async () => {
//     const response = await fetch('/api/requests');
//     const newData = await response.json();
//     setOrgs(newData);
//     //console.log(newData);
//   };
//   fetchData();
// },[]);

useEffect(() => {
    const fetchDonations = async () => {
      const response = await fetch('/api/requests',{
          headers: {
              'Authorization':`Bearer ${user.token}`
          }
      })
      const json = await response.json()

      if(response.ok){
          dispatch({type: 'SET_DONATIONS', payload : json})
      }
    }

    if(user){
      fetchDonations()
    }
    
  },[dispatch,user])





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
    //   var insertDocument = function(db, callback) {
    //     db.collection('instantdonations').insertOne( {
    //           "donorName" : values.donorName,
    //           "phone" : values.phone,
    //           "donEmail" :  values.donEmail,
    //           "address" :  values.address,
    //        }, function(err, result) {
    //            console.log("Record added as "+result.insertedId);
    //             assert.equal(err, null);
    //             callback();
    //       });
    // };
    // console.log("record inserted >>"+JSON.stringify(result.ops[0]));
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
                // localStorage.setItem("donorId",res.values.nic);
                // localStorage.setItem("donorname",res.values.donorName);
                // localStorage.setItem("email",res.values.donEmail);
                navigate("/donationSummary");
               // console.log(localStorage.getItem("donorname"))
               if (typeof window !== 'undefined') {
                localStorage.setItem("newAddress",values.donEmail);
                var email = localStorage.getItem("newAddress");
               console.log(email);
               }else{
                console.log('we are running on the server');
               }

               
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        console.log(formErrors)
        if(Object.keys(formErrors).length === 0 && isSubmit){
           // console.log(values)
            
           
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

        <div className='donation'>
            {/* <div className='donDiv'> */}
           {/* <Col> <center><img src={require("../assets/donationform.jpg")} alt="image" /></center></Col>  */}
                {/* <center> */}
                <MainContainer>
                <DonationText>
                    Instant Donation
                </DonationText>

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
        value={values.orgName}
        label="Organization Name"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {donations && donations.map((org)=>(
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
                                                <label>Meal Type</label>
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
                                                <label>Food Type</label>
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
                                                    <NavLink style={navLinkStyles} to="/donationSummary">
              <GradientButton style={{ backgroundImage: `linear-gradient(to right, #1abc9c 50%, #16a085 100%)`, }}
              onClick={handleSubmit}
              type="submit"
              text="Submit"
              > Submit <i className="fa fa-paper-plane ms-2"></i></GradientButton>
            </NavLink>
                                                        
                                       
                                        
                                                    </Box>
                                                </Box>
                                            </div>
                                        </center>
                                    </Grid>
                                </Grid>
                            </div>
                        </form>
                    </MainContainer>
                {/* </center> */}
                {/* </center>
                </Col>

            {/* </div> */}
            {/* </Row> */} 

        </div>
      
        

    )

}

const MainContainer = styled.div`
display:flex;
align-items:center;
flex-direction:column;
height:50%;
width:60%;
opacity:2.8;
font-weight:bold;
 background:rgba(255,255,255,0.4);
 box-shadow:0 8px 32px 0 rgba(31,38,135,0.37);
backdrop-filter:blur(8.5px)
border-radius:10px;
color:#ffffff;
// text-transform:uppercase;
letter-spacing:0.4rem;`;


const InputContainer = styled.div`
display:flex;
flex-direction:column;
height:80%;
width:100%;
justify-content:space-around;
align-items:center;

`
const DonationText = styled.h2`
margin:3rem 0 2rem 0;
`

