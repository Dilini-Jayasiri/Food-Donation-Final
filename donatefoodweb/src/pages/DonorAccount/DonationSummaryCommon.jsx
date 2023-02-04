import { useEffect,useState } from "react";
import DonationDetails from '../../components/DonationDetails';
import { useDonationContext } from '../../components/hoooks/useDonationContext';
import { useAuthContext } from '../../components/hoooks/useAuthContext';
import Footer from '../../components/Footer';
import Nav from "../../components/Navbar/Navbar";
import { NavLink } from "react-router-dom";

const DonationSummaryCommon = () => {
    const { donations, dispatch } = useDonationContext()
    const { user } = useAuthContext()
    const [insdonation,setInsDonation] = useState([])
    const [resdonation,setResDonation] = useState([])
    const [status,setStatus] = useState([])

   
    useEffect(() => {
        const fetchResDonation = async () => {
            const response = await fetch('/insLastDon', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
               // .then((data) => data.json())
               .then((data) => data.json())
               .then((data) => setInsDonation(data))
               const json = await response.json()
      
            if (response.ok) {
                dispatch({ type: 'SET_DONATIONS', payload: json })
                console.log(insdonation)
            }else{
                console.log("nott")
            }
        }
        if (user) {
            fetchResDonation()
        }
      
      }, [dispatch, user])

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
            }else{
                console.log("nott")
            }
        }
        if (user) {
            fetchResDonation()
        }
      
      }, [dispatch, user])

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

        console.log(insdonation);
        console.log(resdonation);
        const redDon = localStorage.setItem(insdonation,"redDon");

// if(insdonation !== 0 && resdonation !==0){ 
//     return(
//         <>
//         <Nav/>
       
//             <div className="container py-5">
//             <div className="col-md-5">
//                 <center>
//                 <div class="card p-2">
//                 <h1> Donation Confirmation</h1>
//                 {[status] && [status].map((stat) => (
//                     <h3 key={stat._id}>{stat.status} </h3>
//                 ))}
//                 <h3>Your Donation Is Not Accepted Yet </h3>
//                      <div class="card-body text-center">
               
//                 {[insdonation] && [insdonation].map(don => (
//                   <DonationDetails key={don._id} don={don}/>
//                 ))}
                 
//                 </div>
                     
//                      </div>
                     
                     
//                      </center>
//                      </div>
//                      </div>
//                      <div className="container py-5">
//                      <div className="container py-5">
//             <div className="col-md-5">
//                 <center>
//                 <div class="card p-2">
//                 <h1>Donation Confirmation</h1>
//                 {[status] && [status].map((stat) => (
//                     <h3 key={stat._id}>{stat.status} </h3>
//                 ))}
//                 <h3>Your Donation Is Not Accepted Yet
//    </h3>
//                      <div class="card-body text-center">
               
//                 {[resdonation] && [resdonation].map((don) => (
//                   <DonationDetails key={don._id} don={don}/>
//                 ))}
//                   {/* {[insdonation] && [insdonation].map(don => (
//                   <DonationDetails key={don._id} don={don}/>
//                 ))} */}
//                 </div>
                     
//                      </div>
                     
                     
//                      </center>
//                      </div>
//                      </div>
//                      </div>
//                      <Footer/>
//                      </>
        
//     )
//             // }else{
//             //     return null
//             // }
// } else if(insdonation === 0 && resdonation !== 0 ){
//     return (
//     <>
//              <Nav/>
//              <center>
//        <div className="container py-5">
//        <div className="col-md-5">
//            <center>
//            <div class="card p-2">
//            <h1> Donation Confirmation</h1>
//            {[status] && [status].map((stat) => (
//                <h3 key={stat._id}>{stat.status} </h3>
//            ))}
//            <h3>Your Donation Is Not Accepted Yet </h3>
//                 <div class="card-body text-center">
          
//            {[resdonation] && [resdonation].map(don => (
//              <DonationDetails key={don._id} don={don}/>
//            ))}
            
//            </div>
                
//                 </div>
                
                
//                 </center>
//                 </div>
//                 </div>
//                 </center>
//              <Footer/>
    
//     </>
//     )
// }

// else if(resdonation === 0 && insdonation !== 0 ){
//     return (
//     <>
//              <Nav/>
//              <center>
//        <div className="container py-5">
//        <div className="col-md-5">
//            <center>
//            <div class="card p-2">
//            <h1> Donation Confirmation</h1>
//            {[status] && [status].map((stat) => (
//                <h3 key={stat._id}>{stat.status} </h3>
//            ))}
//            <h3>Your Donation Is Not Accepted Yet </h3>
//                 <div class="card-body text-center">
          
//            {[insdonation] && [insdonation].map(don => (
//              <DonationDetails key={don._id} don={don}/>
//            ))}
            
//            </div>
                
//                 </div>
                
                
//                 </center>
//                 </div>
//                 </div>
//                 </center>
//              <Footer/>
    
//     </>
//     )
// }

// else if(insdonation === 0 && resdonation === 0) {
    
//         return(
//             <>
//              {/* <Nav/> */}
//              <center>
//              <div className="container py-5">
//                 <div className="col-lg-5">
//                     <center>
//                     <div class="card p-5">
//                     <h1>Donation Status</h1>
//                 <h3>You didn't make any donation yet</h3>
//                 <br/>
//                 <h5>Go into make a Donation</h5>
//                 <br/>
//                <center><NavLink to="/donationType" className="btn btn-outline-dark rounded-pill pb-2 w-50">Donate Here</NavLink></center>
                
//                 </div>
                
//              </center>
//              </div>
//              </div>
//              </center>
//              <Footer/>
//             </>
//         )
    
// }
return (
    <>
<Nav/>
       
       <div className="container py-5">
       <div className="col-md-5">
           <center>
           <div class="card p-2">
           <h1> Donation Confirmation</h1>
           {[status] && [status].map((stat) => (
               <h3 key={stat._id}>{stat.status} </h3>
           ))}
           <h3>Your Donation Is Not Accepted Yet </h3>
                <div class="card-body text-center">
          
           {[insdonation] && [insdonation].map(don => (
             <DonationDetails key={don._id} don={don}/>
           ))}
            
           </div>
                
                </div>
                
                
                </center>
                </div>
                </div>
                <div className="container py-5">
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
          
           {[resdonation] && [resdonation].map((don) => (
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
                </div>
                <Footer/>
                </>
   
)

 }


export default DonationSummaryCommon;