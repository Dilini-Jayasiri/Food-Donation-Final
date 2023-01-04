import React, { useState, useEffect } from 'react'
import { Box, Grid } from '@mui/material';
import Controls from '../../components/controls/Controls'
import { useForm, Form } from '../../components/useForm';
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components';
import "../../assets/partials/requestForm.scss";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router';
import { useDonationContext } from '../../components/hoooks/useDonationContext';
import { useAuthContext } from '../../components/hoooks/useAuthContext'

const mealTypeItems = [
    { id: 'breakfast', title: 'Breakfast' },
    { id: 'lunch', title: 'Lunch' },
    { id: 'dinner', title: 'Dinner' },
]

// const theme = createTheme({
//     palette: {
//     //   primary: {
//     //     // Purple and green play nicely together.
//     //     main: purple[500],
//     //   }
//       secondary: {
//         // This is green.A700 as hex.
//         main: '#11cb5f',
//       },
//     },
//   });

const initialValues = {
    // id: '',
    orgName: '',
    orgEmail: '',
    orgSize: '',
    phone: '',
    city: '',

    quantity: '',
    orgType: '',
    reason: '',
    mealType: '',
    confirmedDate: new Date(),
}
export default function RequestForm(props) {
    //const { addOrEdit } = props
    const navigate = useNavigate();
    const { dispatch } = useDonationContext()
    const { user } = useAuthContext()
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('orgName' in fieldValues)
            temp.orgName = fieldValues.orgName ? "" : "This field is required."
        // if ('orgTypeId' in fieldValues)
        //     temp.orgTypeId = fieldValues.orgTypeId.length != 0 ? "" : "This field is required."
        if ('orgType' in fieldValues)
            temp.orgType = fieldValues.orgType ? "" : "This field is required."
        if ('orgEmail' in fieldValues)
            temp.orgEmail = (/$^|.+@.+..+/).test(values.orgEmail) ? "" : "Email is not valid."
        if ('orgSize' in fieldValues)
            temp.orgSize = fieldValues.orgSize ? "" : "This field is required."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone.length > 9 ? "" : "Minimum 10 numbers required."
        if ('city' in fieldValues)
            temp.city = fieldValues.city ? "" : "This field is required."
        if ('mealType' in fieldValues)
            temp.mealType = fieldValues.mealType ? "" : "This field is required."
        if ('quantity' in fieldValues)
            temp.quantity = fieldValues.quantity ? "" : "This field is required."
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
        //handleInputChange,
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
        // if (validate()) {
        //     addOrEdit(values, resetForm)
        // }
        //Object Destructuring
        //Store object data into variables
        const { orgName, orgEmail, orgSize, phone, city, quantity, orgType, reason, mealType, confirmedDate } = values;
        try {
            //It is submitted on port 3000 by default 
            //which is front end but we need to submit it on
            //backend which is on port 3001. so we need proxy
            const res = await fetch('/requests', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    orgName, orgEmail, orgSize, phone, city, quantity, orgType, reason, mealType, confirmedDate
                })
            })
            if (res.status === 400 || !res) {
                window.alert("Message Not Sent. Try Again Later")
            } else {
                window.alert("Message Sent Successfully");
                setValues({
                    orgName: '',
                    orgEmail: '',
                    orgSize: '',
                    phone: '',
                    city: '',
                    quantity: '',
                    orgType: '',
                    reason: '',
                    mealType: '',
                    confirmedDate: '',
                }, dispatch({ type: 'CREATE_DONATIONS', payload: JSON }))
                console.log(values);


                //  window.location.reload();
                if (validate) {
                    navigate('/tableNew')
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
    // const MainContainer = styled.div`

    // align-items:center;
    // flex-direction:column;
    // width:60vw;
    // background:rgba(255,255,255,0.15);
    // backdrop-filter:blur(8.5px);
    // margin-bottom:4%;
    // `;

    return (
        // <Grid container  alignItems="center" justify="center">
        <Row className='request'>
            <div className='reqDiv'>

                <center>
                    <Col xs={12} className='md-5 mt-4 mb-4 align-middle'>
                        <h2 className='topic2'>Request Form</h2>
                    </Col>
                </center>

                <center>

                    <MainContainer>
                        <form onSubmit={handleSubmit} method={'POST'}>
                            <div>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Box my={4} mx={4}>
                                            <Controls.Input
                                                name="orgName"
                                                label="Organization Name"
                                                value={values.orgName}
                                                onChange={handleInputChange}
                                                error={errors.orgName}
                                            />
                                        </Box>

                                        <Box my={4} mx={4}>
                                            <Controls.Input

                                                label="Email Address"
                                                name="orgEmail"
                                                value={values.orgEmail}
                                                onChange={handleInputChange}
                                                error={errors.orgEmail}
                                            />
                                        </Box>

                                        <Box my={4} mx={4}>
                                            <Controls.Input

                                                label="Size of the Organization"
                                                name="orgSize"
                                                value={values.orgSize}
                                                onChange={handleInputChange}
                                                error={errors.orgSize}
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

                                                label="City"
                                                name="city"
                                                value={values.city}
                                                onChange={handleInputChange}
                                                error={errors.city}
                                            />
                                        </Box>

                                    </Grid>

                                    <Grid item xs={6}>
                                        <Box my={4} mx={4}>
                                            <Controls.Input

                                                label="Quantity"
                                                name="quantity"
                                                value={values.quantity}
                                                onChange={handleInputChange}
                                                error={errors.quantity}
                                            />
                                        </Box>

                                        {/* <Box my={4} mx={4}>

                                            <Controls.Selects
                                                name="orgTypeId"
                                                label="Organization Type"
                                                value={values.orgTypeId}
                                                onChange={handleInputChange}
                                                options={orgType.getOrgCollection()}
                                                error={errors.orgTypeId}
                                            />
                                        </Box> */}
                                        <Box my={4} mx={4}>
                                            <FormControl sx={{ width: 400 }}>
                                                <InputLabel id="demo-simple-select-autowidth-label">Organization Type</InputLabel>
                                                <Select
                                                    name="orgType"
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={values.orgType}
                                                    label="Organization Type"
                                                    onChange={handleInputChange}
                                                >
                                                    <MenuItem value={values.orgType}>
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value={"Childrens Home"}>Childrens Home</MenuItem>
                                                    <MenuItem value={"Elders Home"}>Elders Home</MenuItem>
                                                    <MenuItem value={"Nursing Home"}>Nursing Home</MenuItem>
                                                </Select>
                                            </FormControl>
                                            {/* <Controls.Input

label="cfvgb"
name="orgType"
value={values.orgType}
onChange={handleInputChange}
error={errors.orgType}
/> */}
                                        </Box>

                                        <Box my={4} mx={4}>
                                            <Controls.TextArea

                                                label="Reason for Request"
                                                name="reason"
                                                value={values.reason}
                                                onChange={handleInputChange}
                                            />
                                        </Box>
                                        {/* <Box my={4} mx={4}>
                            <Controls.RadioGroups
                                name="mealType"
                                label="Meal Type"
                                value={values.mealType}
                                onChange={handleInputChange}
                                items={mealTypeItems}
                            />
                        </Box> */}
                                        {/* <div class="form-check form-check-inline"> */}
                                        <Box my={3} mx={4}>

                                            <Controls.RadioGroups
                                                row
                                                name="mealType"
                                                label="Meal Type"
                                                value={values.mealType}
                                                onChange={handleInputChange}
                                                items={mealTypeItems}
                                            //error={errors.mealType}
                                            />
                                        </Box>

                                        {/* </div> */}


                                        {/* <Box my={4} mx={4}> */}
                                        <Box my={2} mx={4}>
                                            <FormControl sx={{ width: 400 }}>
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
                                            <Box my={4} mx={4}>

                                                <Controls.Button
                                                    // variant="contained"
                                                    // color="primary"
                                                    // size="large"
                                                    onClick={handleSubmit}
                                                    type="submit"
                                                    text="Submit"


                                                />


                                                {/* <ThemeProvider theme={theme}>
                               <Controls.Button color="neutral" variant="contained" onClick={resetForm}>
    Reset
    </Controls.Button>
</ThemeProvider> */}

                                                {/* // variant="contained"
                                // 
                                // size="large"
                                //type="Reset"
                               // color="info"
                                //text="Reset" */}


                                            </Box>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </form>
                    </MainContainer>
                </center>


            </div>
        </Row>
        // </Grid>

    )
}

const MainContainer = styled.div`
    //   display:flex;
    //   align-items:center;
    //   flex-direction:column;
    //   height:50%;
    //   width:60%;
    //   opacity:2.8;
    //   font-weight:bold;
    //    background:rgba(255,255,255,0.4);
    //    box-shadow:0 8px 32px 0 rgba(31,38,135,0.37);
    //  backdrop-filter:blur(8.5px)
    //   border-radius:10px;
    //   color:#ffffff;
    //  // text-transform:uppercase;
    //   letter-spacing:0.4rem;
      
      align-items:center;
    flex-direction:column;
    width:60vw;
    background:rgba(255,255,255,0.15);
    backdrop-filter:blur(8.5px);
    margin-bottom:4%;
    background:rgba(255,255,255,0.4);
    box-shadow:0 8px 32px 0 rgba(31,38,135,0.37);`;


