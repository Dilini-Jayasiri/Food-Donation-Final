const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    ConfirmDate:Date,
    description:String
},{timestamps:true})

const Event = mongoose.model("CalendarEvent",EventSchema);

module.exports = Event;