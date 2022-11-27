
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import DonateDash from './components/DonateDash';
import {Routes,Route,Router} from 'react-router';
import DonationForm from './pages/DonationForm';
import DonationType from './components/DonationType';
import Services from './components/Services';
import Contact from './components/Contact';
import Logout from './components/Logout';
import OrgList from './pages/OrgList';
import DonationSummary from '../src/Profile/DonationSummary';
import ReceiverAccount from '../src/pages/ReciverAccount';
import DonationSummaryInstant from './Profile/DonationSummaryInstant';
import ProtectedRoutes from './ProtectedRoutes';
import Requests from './pages/Requests/TableNew';
import RequestForm from './pages/Requests/RequestForm';
import { useEffect, useState } from 'react';
import InstantDonation from './pages/InstantDonation';
import ReservedDonation from './pages/ReservedDonation';
import DonorAccount from './pages/DonorAccount';
import TableNew from './pages/Requests/TableNew';
import Inst from './pages/InstantDon';
import AcceptPage from './AcceptPage';
import Calendar from './Calendar/calendar';
import Modal from 'react-modal';

Modal.setAppElement('#root');


function App() {

  const [auth,setauth] = useState(false);
  const [auth1,setauth1] = useState(true);

  const isLoggedIn = async () => {
    try {
      const res = await fetch('/auth', {
        method : "GET",
        headers : {
          Accept : "application/json",
          "Content-Type" : "application/json"
        },
        credentials :"include"
      });

      if(res.status === 200){
         setauth(true)
         setauth1(false)
      }
      if(res.status === 401){
        setauth(false)
        setauth1(true)
     }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    isLoggedIn();
  },[]);

  return (
   <>
   <NavBar auth={auth1}/>
   
   <Routes>
     <Route  path="/" element={<Home/>}/>
     <Route  path="/about" element={<About/>}/>
     <Route path="/services" element={<Services/>}/>
     <Route path="/contact" element={<Contact/>}/>    
     <Route  path="/register" element={<Register/>} auth={auth}/>
     <Route  path="/login" element={<Login/>} auth={auth}/>
         {/* <Route element={<ProtectedRoutes/>}>
            
            <Route  path="/donateDash" element={<DonateDash/>} auth={auth}/>
            <Route  path="/donationForm" element={<DonationForm/>} auth={auth}/>
            <Route  path="/instantDonation" element={<InstantDonation/>} auth={auth}/>
            <Route  path="/reservedDonation" element={<ReservedDonation/>} auth={auth}/>
            <Route path="/donationType" element={<DonationType/>} auth={auth}/>
            <Route path="/requests" element={<Requests/>} auth={auth}/>
            <Route path="/requestForm" element={<RequestForm/>} auth={auth}/>
            <Route path="/donorAccount" element={<DonorAccount/>} auth={auth}/>
            <Route  path="/logout" element={<Logout/>} auth={auth}/>
            <Route path="/orgList" element={<OrgList/>} auth={auth}/>
            </Route> */}
           
     
     
     
     <Route  path="/donateDash" element={<DonateDash/>} auth={auth1}/>
     <Route  path="/donationForm" element={<DonationForm/>} auth={auth1}/>
     <Route  path="/instantDonation" element={<InstantDonation/>} auth={auth1}/>
     <Route  path="/reservedDonation" element={<ReservedDonation/>} auth={auth1}/>
     <Route path="/donationType" element={<DonationType/>} auth={auth1}/>
     <Route path="/tableNew" element={<TableNew/>} auth={auth1}/>
     <Route path="/requestForm" element={<RequestForm/>} auth={auth1}/>
     <Route path="/donorAccount" element={<DonorAccount/>} auth={auth1}/>
     <Route  path="/logout" element={<Logout/>} auth={auth1}/>
     <Route path="/orgList" element={<OrgList/>}/>
     <Route path="/donationSummary" element={<DonationSummary/>}/>
     <Route path="/inst" element={<Inst/>}/>
     <Route path="/acceptPage" element={<AcceptPage/>}/>
     <Route path="/receiverAccount" element={<ReceiverAccount/>}/>
     <Route path="/instantDonSummary" element={<DonationSummaryInstant/>}/>
     <Route path="/calendar" element={<Calendar/>}/>
     </Routes>
     
     


     {/* <ProtectedRoute> */}
     {/* <Route exact path='/' element={<ProtectedRoute/>}>
      
     <Route  path="/donateDash" element={<DonateDash/>} auth={auth}/>

     </Route> */}

     {/* <Route exact path='/' element={<ProtectedRoute/>}> */}
     {/* <Route  path="/donationForm" element={<DonationForm/>} auth={auth}/>
     </Route>
     <Route exact path='/' element={<ProtectedRoute/>}>
     <Route  path="/instantDonation" element={<InstantDonation/>} auth={auth}/>
     </Route>
     <Route exact path='/' element={<ProtectedRoute/>}>
     <Route  path="/reservedDonation" element={<ReservedDonation/>} auth={auth}/>
     </Route>
     <Route exact path='/' element={<ProtectedRoute/>}>
     <Route path="/donationType" element={<DonationType/>} auth={auth}/>
     </Route>
     <Route exact path='/' element={<ProtectedRoute/>}>
     <Route path="/requests" element={<Requests/>} auth={auth}/>
     </Route>
     <Route exact path='/' element={<ProtectedRoute/>}>
     <Route path="/requestForm" element={<RequestForm/>} auth={auth}/>
     </Route>
     <Route exact path='/' element={<ProtectedRoute/>}>
     <Route path="/donorAccount" element={<DonorAccount/>} auth={auth}/>
     </Route>
     <Route exact path='/' element={<ProtectedRoute/>}>
     <Route  path="/logout" element={<Logout/>} auth={auth}/>
     </Route>
     <Route exact path='/' element={<ProtectedRoute/>}>
     <Route path="/orgList" element={<OrgList/>} auth={auth}/> 
     </Route> */}
     
     
     {/* <ProtectedRoute  path="/register" element={<Register/>} auth={auth1}/> */}
     
     {/* <ProtectedRoute  path="/donateDash" element={<DonateDash/>} auth={auth}/>
     <ProtectedRoute  path="/donationForm" element={<DonationForm/>} auth={auth}/>
     <ProtectedRoute  path="/instantDonation" element={<InstantDonation/>} auth={auth}/>
     <ProtectedRoute  path="/reservedDonation" element={<ReservedDonation/>} auth={auth}/>
     <ProtectedRoute path="/donationType" element={<DonationType/>} auth={auth}/>
     <ProtectedRoute path="/requests" element={<Requests/>} auth={auth}/>
     <ProtectedRoute path="/requestForm" element={<RequestForm/>} auth={auth}/>
     <ProtectedRoute path="/donorAccount" element={<DonorAccount/>} auth={auth}/>
     <ProtectedRoute  path="/logout" element={<Logout/>} auth={auth}/>
     <ProtectedRoute path="/orgList" element={<OrgList/>} auth={auth}/>
      */}
     
   
   {/* <Home/>
   <About/> */}
{/* </ProtectedRoute> */}
  {/* <Footer/>  */}
  </>   
  );
}

export default App;
