import React,{useRef, useState} from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AddEventModel from "./AddEventModel";
import axios from "axios";
import moment from "moment";

export default function () {
    const [modelOpen,setModalOpen]= useState(false);
    const [events,setEvents] = useState([]);
    const calendarRef = useRef(null);

    const onEventAdded = (event) => {
      let calendarApi = calendarRef.current.getApi();
      calendarApi.addEvent({
        confirmDate:moment(event.confirmDate).toDate(),
        description:event.description
    });
    };

    async function handleEventAdd(data){
     await  axios.post("/api/calendar/create-event",data.event);
    }

    async function handleDateSet(data){
       const response = await axios.get("/api/calendar/get-events?confirmDate"+moment(data.confirmDate).toISOString());
       setEvents(response.data);
    }
//calendarRef = React.createRef()
    return (
        <section>
            <button onClick={() => setModalOpen(true)}>Add Event</button>

            <div style={{position:"relative",zIndex:0}}>
            <FullCalendar
                ref = {calendarRef}
                events={events}
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                eventAdd={event => handleEventAdd(event)}
                datesSet={(date) => handleDateSet(date._d)}  
             />
            </div>
         <AddEventModel isOpen={modelOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)}/>
        </section>
    )
}

// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
//  // or another calendar library of your choice
// import { MongoClient } from 'mongodb';

// function EditableCalendar() {
//   const [events, setEvents] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   useEffect(() => {
//     // Connect to the MongoDB database
//     const client = new MongoClient(MONGODB_URI);
//     client.connect((err) => {
//       if (err) {
//         console.error(err);
//         return;
//       }

//       // Load the events from the database
//       const db = client.db(DB_NAME);
//       const collection = db.collection('events');
//       collection.find().toArray((err, docs) => {
//         if (err) {
//           console.error(err);
//           return;
//         }

//         setEvents(docs);
//       });
//     });

//     return () => client.close();
//   }, []);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const handleEventAdd = (event) => {
//     // Add the new event to the database
//     const client = new MongoClient(MONGODB_URI);
//     client.connect((err) => {
//       if (err) {
//         console.error(err);
//         return;
//       }

//       const db = client.db(DB_NAME);
//       const collection = db.collection('events');
//       collection.insertOne(event, (err) => {
//         if (err) {
//           console.error(err);
//           return;
//         }

//         // Add the event to the local state
//         setEvents([...events, event]);
//       });
//     });

//     client.close();
//   };

//   const handleEventEdit = (event) => {
//     // Update the event in the database
//     const client = new MongoClient(MONGODB_URI);
//     client.connect((err) => {
//       if (err) {
//         console.error(err);
//         return;
//       }

//       const db = client.db(DB_NAME);
//       const collection = db.collection('events');
//       collection.updateOne({ _id: event._id }, { $set: event }, (err) => {
//         if (err) {
//           console.error(err);
//           return;
//         }

//         // Update the event in the local state
//         const updatedEvents = events.map((e) => (e._id === event._id ? event : e));
//         setEvents(updatedEvents);
//       });
//     });

//     client.close();
//   };

//   const handleEventDelete = (event) => {
//     // Delete the event from the database
//     const client = new MongoClient(MONGODB_URI);
//     client.connect((err) => {
//       if (err) {
//         console.error(err);
//         return;
//       }})

//       const db = client.db(DB_NAME);
//       const collection = db.collection('events');
//       collection.delete
//     }
// }
