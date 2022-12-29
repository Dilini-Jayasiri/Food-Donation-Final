import { useEffect,useState } from "react";
import DonationDetails from "./DonationDetails";

//import summary from '../summary'
 

const DonationSummary = () => {
    const [donation,setDonation] = useState([])
    const [requests,setRequests] = useState("")

    useEffect(() => {
        const fetchDonation = async () => {
            const response = await fetch('/api/reservedDonation/last')
            const json = await response.json()

            if(response.ok){
                setDonation(json)
            } 
        }
        fetchDonation()
    },[])

    // useEffect(() => {
    //     const fetchRequests = async () => {
    //         const response = await('/api/requests')
    //         const json = await response.json()

    //         if(response.ok){
    //            setRequests(json)
    //         }
    //     }
    //     fetchRequests()
    // },[])

    

    return(
        <center>
            <div className="container py-5">
            <div className="col-md-5">
                <center>
                <div class="card p-2">
                <h1>Donation Confirmation</h1>
                <h3>Your Donation Is Not Accepted Yet
   </h3>
                     <div class="card-body text-center">
                
                {[donation] && [donation].map(don => (
                  <DonationDetails key={don._id} don={don}/>
                ))}
                </div>
                     
                     </div>
                     
                     
                     </center>
                     </div>
                     </div>
                     </center>
                     
        
    )
}

export default DonationSummary;