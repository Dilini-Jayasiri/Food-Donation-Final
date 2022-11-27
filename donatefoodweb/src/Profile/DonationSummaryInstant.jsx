import React,{useState,useEffect} from 'react'
import axios from 'axios'

function DonationSummaryInstant() {
    const [dons,setDons] = useState([])
    const [nic,setNic] = useState()

    useEffect(() => {
      const fetchDonation = async () => {
        const response = await fetch('/instantDon');
        const json = await response.json()
  
        if (response.ok) {
          setDons(json)
          console.log(json);
        }
      }
      fetchDonation()
    }, [])

    // useEffect(() => {
    //     const fetchRequests = async () => {
    //       const response = await fetch('/instantDon');
    //      // const json = await response.json()
    
    //       if (response.ok) {
    //         //setDons(json)
    //         console.log(response)
    //       }
    //     }
    //     fetchRequests()
    //   }, [])
  return (
    <div>

      {/* <input type="text" value={nic} onChange={e => setNic(e.target.value)} />
      <div>{dons.donorName}</div> */}
      {/* <ul>
        {
            dons.map(don => <li key={don.nic}>{don.donorName}</li>)
        }
      </ul> */}
        {/* <center>
            <div className="container py-5">
            <div className="col-md-5">
                <center>
                <div class="card p-2">
                <h1>Donation Confirmation</h1>
                     <div class="card-body text-center">
                      <h4>RESERVED  DONATION</h4>
                        {/* <i className='fa fa-cogs fa-4x mb-4 text-primary'></i> */}
                        {/* <h5 class="card-title mb-3 fs-4 fw-bold">Children's Home</h5> */}
                        {/* <input type="text" value={id} onChange={e => setId(e.target.value)} />
      <div>{donations.donorName}</div>  */}
                        {/* <div className='sumP'>
                          
                        {dons.map(post => {
      <div key={post._id}>
        <h5>{post.donorName}</h5>
        <p>{post.phone}</p>
        <p>{post.donEmail}</p>
        </div>
    })}
     </div>
                       

     </div> */}
                     
                     {/* </div>
                     
                     </center>
                     </div>
            
         </div> */}
     
        {/* </center> */} 
        {dons.map(post => {
          <div key={post._id}>
            <h5>{post.donorName}</h5>
            <h5>{post.phone}</h5>
            <h5>{post.donorName}</h5>
            <h5>{post.donorName}</h5>
            <h5>{post.donorName}</h5>
          </div>
        })}
    </div>
  )
}
export default DonationSummaryInstant
