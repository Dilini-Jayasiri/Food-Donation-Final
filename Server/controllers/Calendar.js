const router = require("express").Router();
const Event = require("../models/CalendarEvent");
const moment = require('moment');
const { events } = require("../models/CalendarEvent");

router.post("/create-event",async(req,res)=>{
  const event = Event(req.body);
  await event.save();
  res.sendStatus(201);
})

router.get("/get-events",async(req,res)=>{
    const events = await Event.find({start:{$gte:moment(req.query.start).toDate()}});

    res.send(events);

});


module.exports = router;