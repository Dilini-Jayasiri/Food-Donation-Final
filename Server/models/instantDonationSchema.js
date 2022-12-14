const mongoose = require('mongoose');

const instantDonationSchema = new mongoose.Schema({
    id : {
        type : String,
    },
    nic : {
        type : String,
        required : true,
        
    },
    donorName : {
        type : String,
        required : true,
        
    },
    phone : {
        type : String,
        required : true,
        
    },
    donEmail : {
        type : String,
        required : true,
        
    },
    address : {
        type : String,
        required : true
    },
    orgName : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    // prefferedArea : {
    //     type : String,
    //     required : true
    // },
    quantity : {
        type : String,
        required : true
    },
    oldFood:{
        type:String,
        required:true
    },

    mealType : {
        type : String,
        required : true
    },
    area :{
        type:String,
        required:true
    },
    foodType : {
        type : String,
        required : true
    },
    foodName : {
        type : String,
        required : true
    },  
    user_id:{
        type:String,
        required:true
    }
},{timestamps:true})

//Create Model
const InstantDonation = new mongoose.model("INSTANTDONATION", instantDonationSchema);

module.exports = InstantDonation;

