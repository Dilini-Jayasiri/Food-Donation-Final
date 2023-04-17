import React, { useEffect } from 'react';
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
import { useAuthContext } from '../components/hoooks/useAuthContext'
import Nav from '../components/Navbar/Navbar';
import Footer from '../components/Footer';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
    inputLabel: {
        color: 'white', // change the color to any desired value
    },
});


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
    donorName: '',
    phone: '',
    donEmail: '',
    district: '',
    address: '',
    orgName: '',
    date: '',
    quantity: '',
    oldFood: '',
    mealType: '',
    area: '',
    foodType: '',
    foodName: ''

}

//const inst = localStorage.setItem("donorname",values.donorName);

export default function InstantDonation(props) {
    //const { classes } = props;
    // const { addOrEdit } = props
    const { donations, dispatch } = useDonationContext()
    const { user } = useAuthContext()

    const [organizationName, setOrganizationName] = useState("");
    const [orgs, setOrgs] = React.useState([{ 'orgName': '', '_id': '' }]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const [district, setDistrict] = useState('');

    const classes = useStyles();


    useEffect(() => {
        const fetchDonations = async () => {
            const response = await fetch('/requests/all', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_DONATIONS', payload: json })
            }
        }

        if (user) {
            fetchDonations()
        }

    }, [dispatch, user])




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
        if ('district' in fieldValues)
            temp.district = fieldValues.district ? "" : "This field is required."
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

    }
    //Handle Submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user) {
            setFormErrors('You must be logged in')
            return
        }

        setFormErrors(validate(values));
        if (validate()) {
            setIsSubmit(true)
            navigate('/donationSummaryIns')
        }
        emailjs.send('service_4myyg6h', 'template_ms3zy5j', values, 'AGKmDLzp5SojZrssC')
            .then(response => {
                // console.log('Success', response);
                console.log('Failed...', response)
            }, error => {
                // console.log('Failed...', error)
                console.log('Success', error);
            })
        //Object Destructuring
        //Store object data into variables
        // if(validate()){
        //     addOrEdit(values, resetForm)
        // }
        //Object Destructuring
        //Store object data into variables
        const { donorName, phone, donEmail, district, address, orgName, date, quantity, oldFood, mealType, area, foodType, foodName } = values;

        const donation = { donorName, phone, donEmail, district, address, orgName, date, quantity, oldFood, mealType, area, foodType, foodName }

        const res = await fetch('/api/instantDonations', {
            method: "POST",
            body: JSON.stringify(donation),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await res.json()

        if (!res.ok) {
            setFormErrors(json.error)
            window.alert("Message Not Sent. Try Again Later")
        }
        if (res.ok) {
            console.log('new donation added', json)
            window.alert("Message Sent Successfully");
            setValues({
                donorName: '',
                phone: '',
                donEmail: '',
                district: '',
                address: '',
                orgName: '',
                date: '',
                quantity: '',
                oldFood: '',
                mealType: '',
                area: '',
                foodType: '',
                foodName: '',
            },
                dispatch({ type: 'CREATE_DONATIONS', payload: JSON })
            )
        }

    }
    useEffect(() => {
        console.log(formErrors)
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            // console.log(values)


        }
    }, [formErrors])


    return (
        <>
            <Nav />
            <div className='donation'>

                <MainContainer>
                    <DonationText>
                        Instant Donation
                    </DonationText>

                    <form onSubmit={handleSubmit} method={'POST'}>
                        <div>
                            <Grid container className=''>
                                <Grid item xs={12}>
                                    <center>

                                        <Box my={4} mx={4}>

                                            <Controls.Input
                                                className={classes.inputLabel}
                                                inputProps={{ style: { color: 'white' } }}
                                                labelProps={{ style: { color: 'white' } }}
                                                InputLabelProps={{ className: 'textField__label' }}
                                                name="donorName"
                                                label="Donor Name"
                                                value={values.donorName}
                                                onChange={handleChange}
                                                error={errors.donorName}
                                            />
                                        </Box>

                                        <Box my={4} mx={4}>
                                            <Controls.Input
                                                InputLabelProps={{ className: 'textField__label' }}
                                                inputProps={{ style: { color: 'white' } }}
                                                labelProps={{ style: { color: 'white' } }}
                                                label="Contact Number"
                                                name="phone"
                                                value={values.phone}
                                                onChange={handleChange}
                                                error={errors.phone}
                                            />
                                        </Box>

                                        <Box my={4} mx={4}>
                                            <Controls.Input
                                                InputLabelProps={{ className: 'textField__label' }}
                                                inputProps={{ style: { color: 'white' } }}
                                                labelProps={{ style: { color: 'white' } }}
                                                label="Email Address"
                                                name="donEmail"
                                                value={values.donEmail}
                                                onChange={handleChange}
                                                error={errors.donEmail}
                                            />
                                        </Box>
                                        <Box my={0} mx={4}>
                                            <FormControl sx={{ width: '100%' }}>
                                                <InputLabel id="demo-simple-select-autowidth-label" InputLabelProps={{ className: 'textField__label' }}>District</InputLabel>
                                                <Select
                                                    InputLabelProps={{ className: 'textField__label' }}
                                                    name="district"
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={values.district}
                                                    label="Organization Type"
                                                    onChange={handleChange}
                                                    error={errors.district}
                                                >
                                                    <MenuItem value={district}>
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value={"Ampara"}>Ampara</MenuItem>
                                                    <MenuItem value={"Anuradhapura"}>Anuradhapura</MenuItem>
                                                    <MenuItem value={"Badulla"}>Badulla</MenuItem>
                                                    <MenuItem value={"Batticaloa"}>Batticaloa</MenuItem>
                                                    <MenuItem value={"Colombo"}>Colombo</MenuItem>
                                                    <MenuItem value={"Galle"}>Galle</MenuItem>
                                                    <MenuItem value={"Gampaha"}>Gampaha</MenuItem>
                                                    <MenuItem value={"Hambantota"}>Hambantota</MenuItem>
                                                    <MenuItem value={"Jaffna"}>Jaffna</MenuItem>
                                                    <MenuItem value={"Kalutara"}>Kalutara</MenuItem>
                                                    <MenuItem value={"Kandy"}>Kandy</MenuItem>
                                                    <MenuItem value={"Kegalle"}>Kegalle</MenuItem>
                                                    <MenuItem value={"Kilinochchi"}>Kilinochchi</MenuItem>
                                                    <MenuItem value={"Kurunegala"}>Kurunegala</MenuItem>
                                                    <MenuItem value={"Mannar"}>Mannar</MenuItem>
                                                    <MenuItem value={"Matale"}>Matale</MenuItem>
                                                    <MenuItem value={"Matara"}>Matara</MenuItem>
                                                    <MenuItem value={"Monaragala"}>Monaragala</MenuItem>
                                                    <MenuItem value={"Mullaitivu"}>Mullaitivu</MenuItem>
                                                    <MenuItem value={"Nuwara Eliya"}>Nuwara Eliya</MenuItem>
                                                    <MenuItem value={"Polonnaruwa"}>Polonnaruwa</MenuItem>
                                                    <MenuItem value={"Puttalam"}>Puttalam</MenuItem>
                                                    <MenuItem value={"Ratnapura"}>Ratnapura</MenuItem>
                                                    <MenuItem value={"Trincomalee"}>Trincomalee</MenuItem>
                                                    <MenuItem value={"Vavuniya"}>Vavuniya</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box my={4} mx={4}>
                                            <Controls.Input
                                                InputLabelProps={{ className: 'textField__label' }}
                                                inputProps={{ style: { color: 'white' } }}
                                                labelProps={{ style: { color: 'white' } }}
                                                label="address"
                                                name="address"
                                                value={values.address}
                                                onChange={handleChange}
                                                error={errors.address}
                                            />
                                        </Box>

                                        <Box my={2} mx={4}>
                                            <FormControl sx={{ width: '100%' }}>
                                                <InputLabel id="demo-simple-select-autowidth-label" InputLabelProps={{ className: 'textField__label' }}>Organization Name</InputLabel>
                                                <Select
                                                    InputLabelProps={{ className: 'textField__label' }}
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
                                                    {donations && donations.map((org) => (
                                                        <MenuItem value={org.orgEmail} key={org._id}>{org.orgName}</MenuItem>
                                                    ))}


                                                </Select>
                                            </FormControl>
                                        </Box>

                                        <Box my={4} mx={4}>
                                            <Controls.Input
                                                InputLabelProps={{ className: 'textField__label' }}
                                                inputProps={{ style: { color: 'white' } }}
                                                labelProps={{ style: { color: 'white' } }}
                                                label="Quantity"
                                                name="quantity"
                                                value={values.quantity}
                                                onChange={handleChange}
                                                error={errors.quantity}
                                            />
                                        </Box>

                                        <Box my={4} mx={4}>
                                            <Controls.Input
                                                InputLabelProps={{ className: 'textField__label' }}
                                                inputProps={{ style: { color: 'white' } }}
                                                labelProps={{ style: { color: 'white' } }}
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
                                                InputLabelProps={{ className: 'textField__label' }}
                                                name="mealType"
                                                value={values.mealType}
                                                onChange={handleChange}
                                                items={mealType}
                                            />
                                        </Box>

                                        <Box my={4} mx={4}>
                                            <Controls.Input
                                                InputLabelProps={{ className: 'textField__label' }}
                                                inputProps={{ style: { color: 'white' } }}
                                                labelProps={{ style: { color: 'white' } }}
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
                                                InputLabelProps={{ className: 'textField__label' }}
                                                inputProps={{ style: { color: 'white' } }}
                                                labelProps={{ style: { color: 'white' } }}
                                                name="foodType"
                                                value={values.foodType}
                                                onChange={handleChange}
                                                items={foodType}
                                            />
                                        </Box>

                                        <Box my={4} mx={4}>
                                            <Controls.Input
                                            InputProps={{
                                                style: { borderColor: 'red' }
                                              }}
                                                InputLabelProps={{ className: 'textField__label' }}
                                                inputProps={{ style: { color: 'white' } }}
                                                labelProps={{ style: { color: 'white' } }}
                                                label="Food Name"
                                                name="foodName"
                                                value={values.foodName}
                                                onChange={handleChange}
                                                error={errors.foodName}
                                            />
                                        </Box>



                                        <Box my={4} mx={4}>
                                            <FormControl sx={{ width: '100%' }}>
                                                <Controls.DatePicker1
                                                    InputLabelProps={{ className: 'textField__label' }}
                                                    inputProps={{ style: { color: 'white' } }}
                                                    labelProps={{ style: { color: 'white' } }}
                                                    name="date"
                                                    label="Date"
                                                    value={values.date}
                                                    onChange={handleChange}

                                                />
                                            </FormControl>



                                        </Box>




                                        <div >
                                            <Box my={4} mx={4}>
                                                <Box my={4} mx={4}>
                                                    <NavLink style={navLinkStyles} to="/donationSummaryIns">
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


            </div>
            <Footer />
        </>

    )

}

const MainContainer = styled.div`
display:flex;
align-items:center;
flex-direction:column;
height:50%;
width:60%;
font-color:white;
font-weight:bold;
background:rgba(255,255,255,0.4);
box-shadow:0 8px 32px 0 rgba(31,38,135,0.37);
// backdrop-filter:blur(4px)
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
color:"#fff";
font-weight:600;
`

