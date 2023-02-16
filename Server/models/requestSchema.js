const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    id : {
        type: String
    },
    orgName : {
        type : String,
        required: true,
    },
    orgEmail : {
        type : String,
        required : true
    },
    orgSize : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    quantity : {
        type : String,
        required : true
    },
    orgType : {
        type : String,
        required : true,
    },
    reason: {
        type: String
    },
    mealType : {
        type : String,
        required : true
    },
    confirmedDate : {
        type : String,
        required : true
    },
    user_id:{
        type:String,
        required: true
    },
    donors:{
        donorName: {
            type: String
        },
        phone: {
            type: String
        },
        donEmail: {
            type: String
        },
        address: {
            type: String
        },
        orgName: {
            type: String
        },
        date: {
            type: String
        },
        foodName: {
            type: String
        },
        quantity: {
            type: Number
        },
        mealType: {
            type: String
        },
        foodType: {
            type: String
        }
    } 
},{timestamps:true})


//Create Model
const Request = new mongoose.model("REQUEST", requestSchema);

module.exports = Request;

