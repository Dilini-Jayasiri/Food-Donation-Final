
import { useEffect } from 'react'
import { useDonationContext } from '../components/hoooks/useDonationContext'


import DonationDetails from '../components/DonationDetails'

const DonationHistory = () => {
 const {donations,dispatch}  = useDonationContext()

    useEffect(() => {
      const fetchDonations = async () => {
        const response = await fetch('/api/reservedDonations')
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'SET_DONATIONS', payload : json})
        }
      }
      fetchDonations()
    },[dispatch])
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