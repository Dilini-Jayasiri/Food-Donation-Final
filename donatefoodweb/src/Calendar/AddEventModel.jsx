import { SettingsOutlined } from "@mui/icons-material";
import React,{useState} from "react";
import Modal from "react-modal"
import Datetime from 'react-datetime';

export default function ({isOpen,onClose,onEventAdded}) {

    const [description,setDescription] = useState("");
    const [confirmDate,setConfirmDate] = useState(new Date());

    const onSubmit = (event) => {
        event.preventDefault();

        onEventAdded({
            description,
            confirmDate
        })
        console.log(description)
        console.log(confirmDate)
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={onSubmit}>
               <input placeholder="Description" value={description} onChange={e =>setDescription(e.target.value)}/>

               <div>
                 <label>Confirmed Date</label>
                 <Datetime value={confirmDate} onChange={date => setConfirmDate(date._d)}/>
               </div>

               <button>Add Event</button>
            </form>

        </Modal>
    )
}