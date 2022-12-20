
import { useEffect } from 'react'
import { useDonationContext } from '../components/hoooks/useDonationContext'
import {useAuthContext} from '../components/hoooks/useAuthContext'


import DonationDetails from '../components/DonationDetails'

const DonationHistory = () => {
 const {donations,dispatch}  = useDonationContext()
 const {user} = useAuthContext()

    useEffect(() => {
      const fetchDonations = async () => {
        const response = await fetch('/api/reservedDonations',{
            headers: {
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'SET_DONATIONS', payload : json})
        }
      }

      if(user){
        fetchDonations()
      }
      
    },[dispatch,user])
    return(
        <div className='home'>
            <h2>Donation History</h2>
            <div className="donations">
                {donations && donations.map((donation)=>(
                   <DonationDetails key={donation._id} donation={donation}/>
                     
                  
                ))}
            </div>
        </div>
    )
}
export default DonationHistory;