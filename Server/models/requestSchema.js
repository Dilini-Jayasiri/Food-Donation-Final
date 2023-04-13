const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    id : {
        type: String
    },
    orgName : {
        type : String,
        
    },
    orgEmail : {
        type : String,
        
    },
    orgSize : {
        type : String,
        
    },
    phone : {
        type : String,
        
    },
    city : {
        type : String,
        
    },
    quantity : {
        type : String,
        
    },
    orgType : {
        type : String,
        
    },
    reason: {
        type: String
    },
    mealType : {
        type : String,
        
    },
    confirmedDate : {
        type : String,
        
    },
    status : {
        type : String
    },
    user_id:{
        type:String,
        
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

