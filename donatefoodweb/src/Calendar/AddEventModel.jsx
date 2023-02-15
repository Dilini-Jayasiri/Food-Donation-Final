import { SettingsOutlined } from "@mui/icons-material";
import React,{useState} from "react";
import Modal from "react-modal"
import Datetime from 'react-datetime';

export default function ({isOpen,onClose,onEventAdded}) {

    const [donorName,setDonorName] = useState("");
    const [confirmDate,setConfirmDate] = useState(new Date());

    const onSubmit = (event) => {
        event.preventDefault();

        onEventAdded({
            donorName,
            confirmDate
        })
        console.log(donorName)
        console.log(confirmDate)
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={onSubmit}>
               <input placeholder="Donor Name" value={donorName} onChange={e =>setDonorName(e.target.value)}/>
               <div>
                 <label>Confirmed Date</label>
                 <Datetime value={confirmDate} onChange={date => setConfirmDate(date._d)}/>
               </div>

               <button>Add Event</button>
            </form>

        </Modal>
    )
}