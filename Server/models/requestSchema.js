const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    id : {
        type: String
    },
    orgName : {
        type : String,
        required: true,
        
    },
    orgType : {
        type : String,
       // required : true,
        
    },
    orgTypeId : {
        type : String,
        
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
    mealType : {
        type : String,
        required : true
    },
    quantity : {
        type : String,
        required : true
    },
    confirmedDate : {
        type : String,
        required : true
    },
    reason: {
        type: String
    }

   
})


//Create Model
const Request = new mongoose.model("REQUEST", requestSchema);

module.exports = Request;

