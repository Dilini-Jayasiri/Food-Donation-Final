const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    ConfirmDate:Date,
    description:String
})

const Event = mongoose.model("CalendarEvent",EventSchema);

module.exports = Event;