const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
    orgEmail : {
        type : String
    },
    orgName : {
        type : String
    },
    donorName : {
        type : String       
    },
    date : {
        type : Date
    },
    user_Id : {
        type : String
    }
   
},{timestamps:true})

//Create Model
const Calendar = new mongoose.model("CALENDAR", calendarSchema);

module.exports = Calendar;

