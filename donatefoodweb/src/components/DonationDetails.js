import { useDonationContext } from "./hoooks/useDonationContext"

//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const DonationDetails = ({donation}) =>{
  const {dispatch} = useDonationContext()

    const handleClick = async () =>{
        const response = await fetch('/api/reservedDonations/' + donation._id,{
            method:'DELETE'
        })
        const json = await response.json()
        
        if(response.ok){
            dispatch({type:'DELETE_DONATIONS',payload:json})
        }
    }
    return (
        <div className="home">
        <div className="work-Details">
           <h4><strong>{donation.orgName}</strong></h4>
           <p><strong>Quantity : </strong>{donation.quantity}</p>
           <p><strong>Donation Sheduled Date : </strong>{donation.date}</p>
           <p><strong>Created At: </strong>{formatDistanceToNow(new Date(donation.date),{addSuffix:true})}</p>
           <span class="material-symbols-outlined" onClick={handleClick}>
delete
</span>
        </div>
        </div>
    )
}

export default DonationDetails;