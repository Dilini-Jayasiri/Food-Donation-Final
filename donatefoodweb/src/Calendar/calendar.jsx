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
                datesSet={(date) => handleDateSet(date)}
             />
            </div>
          

         <AddEventModel isOpen={modelOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)}/>
        </section>
    )
}