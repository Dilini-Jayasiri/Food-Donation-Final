const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    status:{
        type : String,
        required: true,
    },
    user_id:{
        type:String,
       required:true
    }
},{timestamps:true});

//Create Model
const DonationStatus = new mongoose.model("DONATIONSTATUS", statusSchema);

module.exports = DonationStatus;
