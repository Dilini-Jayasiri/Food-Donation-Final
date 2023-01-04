import { useEffect,useState } from "react";
import DonationDetails from "./DonationDetails";
import { useDonationContext } from "../components/hoooks/useDonationContext"
import { useAuthContext } from '../components/hoooks/useAuthContext'
//import summary from '../summary'
 

const DonationSummary = () => {
    const { donations, dispatch } = useDonationContext()
    const { user } = useAuthContext()
    const [resdonation,setResDonation] = useState([])
    const [insdonation,setInsDonation] = useState([])
    const [column1, setColumn1] = useState([]);
  const [column2, setColumn2] = useState([]);

    const [status,setStatus] = useState([])
    const [requests,setRequests] = useState("")

    // useEffect(() => {
    //     const fetchData = async () => {
          
    
    //       const data1 = await fetch('/api/reservedDonation/last').find({orgName: 'value1'}).toArray();
    //       const data2 = await fetch('/api/user').find({email: 'value2'}).toArray();
    //       setColumn1(data1);
    //       setColumn2(data2);
    
          
    //     };
    
    //     fetchData();
    //   }, []);
    //   if (column1 > column2) {
    //     console.log('Column 1 is greater than column 2');
    //   } else if (column1 < column2) {
    //     console.log('Column 1 is less than column 2');
    //   } else {
    //     console.log('Column 1 is equal to column 2');
    //   }
    // useEffect(() => {
    //     const fetchResDonation = async () => {
    //         const response = await fetch('/lastDon')
    //         const json = await response.json()

    //         if(response.ok){
    //             setResDonation(json)
    //         } 
    //     }
    //     fetchResDonation()
    // },[])

    useEffect(() => {
        const fetchResDonation = async () => {
            const response = await fetch('/lastDon', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
               // .then((data) => data.json())
               .then((data) => data.json())
               .then((data) => setResDonation(data))
               const json = await response.json()
      
            if (response.ok) {
                dispatch({ type: 'SET_DONATIONS', payload: json })
                console.log(resdonation)
            }
        }
        if (user) {
            fetchResDonation()
        }
      
      }, [dispatch, user])

    // useEffect(() => {
    //     const fetchInsDonation = async () => {
    //         const response = await fetch('/api/instantDonation/last')
    //         const json = await response.json()

    //         if(response.ok){
    //             setInsDonation(json)
    //         } 
    //     }
    //     fetchInsDonation()
    // },[])

    

    useEffect(() => {
        const fetchStatus = async () => {
            const response = await fetch('/api/status')
            const json = await response.json()

            if(response.ok){
                setStatus(json)
            } 
        }
        fetchStatus()
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

    
    // if(column1 === column2){

    return(
        <center>
            <div className="container py-5">
            <div className="col-md-5">
                <center>
                <div class="card p-2">
                <h1>Donation Confirmation</h1>
                {[status] && [status].map((stat) => (
                    <h3 key={stat._id}>{stat.status} </h3>
                ))}
                <h3>Your Donation Is Not Accepted Yet
   </h3>
                     <div class="card-body text-center">
                
                {resdonation.map(don => (
                  <DonationDetails key={don._id} don={don}/>
                ))}
                  {/* {[insdonation] && [insdonation].map(don => (
                  <DonationDetails key={don._id} don={don}/>
                ))} */}
                </div>
                     
                     </div>
                     
                     
                     </center>
                     </div>
                     </div>
                     </center>
                     
        
    )
            // }else{
            //     return null
            // }
}

export default DonationSummary;