import React, { useState, useEffect } from 'react'

import { Box, Grid } from '@mui/material';
import Controls from '../../components/controls/Controls'

import { useForm, Form } from '../../components/useForm';

import DatePicker1 from '../../components/controls/DatePicker1';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as orgType from '../../organizations/orgType'


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
    id: 0,
    orgName: '',
   orgType: '',
   orgTypeId: '',
    orgEmail: '',
    orgSize: '',
    phone: '',
    city: '',
    mealType: '',
    quantity: '',
    reason: '',
    confirmedDate: new Date(),
}
export default function RequestForm(props) {
    const { addOrEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('orgName' in fieldValues)
            temp.orgName = fieldValues.orgName ? "" : "This field is required."
        if ('orgTypeId' in fieldValues)
            temp.orgTypeId = fieldValues.orgTypeId.length != 0 ? "" : "This field is required."
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
        handleInputChange,
        resetForm
    } = useForm(initialValues, true, validate);


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm)
        }
        //Object Destructuring
        //Store object data into variables
        const { orgName, orgType, orgTypeId, orgEmail, orgSize, phone, city, mealType, quantity, confirmedDate } = values;
        try {
            //It is submitted on port 3000 by default 
            //which is front end but we need to submit it on
            //backend which is on port 3001. so we need proxy
            const res = await fetch('/request', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orgName, orgType, orgTypeId, orgEmail, orgSize, phone, city, mealType, quantity, confirmedDate
                })
            })
            if (res.status === 400 || !res) {
                window.alert("Message Not Sent. Try Again Later")
            } else {
                window.alert("Message Sent Successfully");
                setValues({
                    orgName: '',
                    orgType: '',
                    orgTypeId: '',
                    orgEmail: '',
                    orgSize: '',
                    phone: '',
                    city: '',
                    mealType: '',
                    quantity: '',
                    confirmedDate: '',
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        // <Grid container  alignItems="center" justify="center">
        <Form onSubmit={handleSubmit} method={'POST'}>
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

                        <Box my={4} mx={4}>

                            <Controls.Selects
                                name="orgTypeId"
                                label="Organization Type"
                                value={values.orgTypeId}
                                onChange={handleInputChange}
                                options={orgType.getOrgCollection()}
                                error={errors.orgTypeId}
                            />
                        </Box>

                        <Box my={4} mx={4}>
                            <Controls.TextArea

                                label="Reason for Request"
                                name="reason"
                                value={values.reason}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box my={4} mx={4}>
                            <Controls.RadioGroups
                                name="mealType"
                                label="Meal Type"
                                value={values.mealType}
                                onChange={handleInputChange}
                                items={mealTypeItems}
                            />
                        </Box>


                        <Box my={4} mx={4}>
                            <Controls.DatePicker1
                                name="confirmedDate"
                                label="Confirmed Date"
                                value={values.confirmedDate}
                                onChange={handleInputChange}
                            />
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
        </Form>
        // </Grid>

    )
}


