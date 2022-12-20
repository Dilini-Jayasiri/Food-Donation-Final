import { useDonationContext } from "./hoooks/useDonationContext"
import {useAuthContext} from './hoooks/useAuthContext'
//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const DonationDetails = ({donation}) =>{
  const {dispatch} = useDonationContext()
  const {user} = useAuthContext()
    const handleClick = async () =>{
        if(!user){
            return
        }
        const response = await fetch('/api/requests/' + donation._id,{
            method:'DELETE',
            headers: {
                'Authorization':`Bearer ${user.token}`
            }
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
           <p><strong>Email : </strong>{donation.orgEmail}</p>
           <p><strong>Size of the Organization : </strong>{donation.orgSize}</p>
           <p><strong>Contact number : </strong>{donation.phone}</p>
           <p><strong>Size of the Organization : </strong>{donation.city}</p>
           <p><strong>Size of the Organization : </strong>{donation.mealType}</p>
           <p><strong>Requested Date : </strong>{donation.confirmedDate}</p>
           {/* <p><strong>Created At: </strong>{formatDistanceToNow(new Date(donation.date),{addSuffix:true})}</p> */}
           <span class="material-symbols-outlined" onClick={handleClick}>
               delete
          </span>
        </div>
        </div>
)
    }

export default DonationDetails;