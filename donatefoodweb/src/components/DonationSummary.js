import { useEffect,useState } from "react";

//import summary from '../summary'
 

const DonationSummary = () => {
    const [donation,setDonation] = useState("")

    useEffect(() => {
        const fetchDonation = async () => {
            const response = await fetch('api/reservedDonations/')
            const json = await response.json()

            if(response.ok){
                setDonation(json)
            }
        }
        fetchDonation()
    },[])

    return(
        <div className="summary">
            <div className="donation">
                {donation && donation.map((don) => (
                   <p key={don._id}>{don.donorName}</p>
                ))}
               
            </div>    
        </div>
    )
}

export default DonationSummary;