const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    
    id : {
        type : String,
        
        
    },donorType : {
        type : String,
        required: true,
        
    },
    donorName : {
        type : String,
        required : true,
        
    },
    mealType : {
        type : String,
        required : true
    },
    quantity : {
        type : String,
        required : true
    },
    oldFood : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    prefferedArea : {
        type : String,
        required : true
    }
   
},{timestamps:true})

//Create Model
const Donation = new mongoose.model("DONATION", donationSchema);

module.exports = Donation;

