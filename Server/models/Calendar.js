const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
    donorName : {
        type : String
    },
    donorEmail : {
        type : String
    },
    mealType : {
        type : String       
    },
    phone : {
        type : String       
    },
    confirmedDate : {
        type : Date
    },
    user_id : {
        type : String
    }
   
},{timestamps:true})

//Create Model
const Calendar = new mongoose.model("CALENDAR", calendarSchema);

module.exports = Calendar;

