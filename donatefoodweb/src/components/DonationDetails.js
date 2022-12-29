import { useDonationContext } from "./hoooks/useDonationContext"
import {useAuthContext} from './hoooks/useAuthContext'
//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const DonationDetails = ({don}) =>{
   const {dispatch} = useDonationContext()
  const {user} = useAuthContext()
    // const handleClick = async () =>{
    //     if(!user){
    //         return
    //     }
    //     // const response = await fetch('/api/reservedDonations/' + donation._id,{
    //     //     method:'DELETE',
    //     //     headers: {
    //     //         'Authorization':`Bearer ${user.token}`
    //     //     }
    //     // })
    //     const json = await response.json()
        
    //     if(response.ok){
    //         dispatch({type:'DELETE_DONATIONS',payload:json})
    //     }
    // }
    return (
        <div className="home">
        <div className="work-Details">
            {/* <h4><strong>Your Donation Is Not Accepted Yet</strong></h4> */}
           <h4><strong>Organization Name: {don.orgName}</strong></h4>
           <p><strong>Quantity : </strong>{don.quantity}</p>
           <p><strong>Donation Sheduled Date : </strong>{don.date}</p>
           <p><strong>Created At: </strong>{formatDistanceToNow(new Date(don.date),{addSuffix:true})}</p>
           {/* <span class="material-symbols-outlined" onClick={handleClick}>
               delete
          </span> */}
        </div>
        </div>
)
    }

export default DonationDetails;