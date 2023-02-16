
import './App.css';
import NavBar from './components/NavBar';
import Nav from './components/Navbar/Navbar'
import Navbarmenu from './components/NavbarMenu';
import Home from './components/Home';
import About from './components/About';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import DonateDash from './components/DonateDash';
import { Routes, Route, Router, Navigate } from 'react-router';
import DonationForm from './pages/DonationForm';
import DonationType from './components/DonationType';
import Services from './components/Services';
import Contact from './components/Contact';
import Logout from './components/Logout';
import OrgList from './pages/OrgList';
import DonationSummaryReserved from './pages/DonorAccount/DonationSummaryReserved';
import DonationSummaryInstant from './pages/DonorAccount/DonationSummaryReserved';
import DonationSummaryCommon from './pages/DonorAccount/DonationSummaryCommon';
import ReceiverAccount from '../src/pages/ReciverAccount';
// import DonationSummaryInstant from './Profile/DonationSummaryInstant';
import ProtectedRoutes from './ProtectedRoutes';
import Requests from './pages/Requests/TableNew';
import RequestForm from './pages/Requests/RequestForm';
import { useEffect, useState } from 'react';
import InstantDonation from './pages/InstantDonation';
import ReservedDonation from './pages/ReservedDonation';
import ReservedDonationNew from './pages/ReservedDonationNew';
import DonorAccount from './pages/DonorAccount/DonorAccount';
import TableNew from './pages/Requests/TableNew';
import Inst from './pages/InstantDon';
import AcceptPage from './AcceptPage';
//import Calendar from './Calendar/calendar';
import Modal from 'react-modal';
import DonationRequestAccept from './components/DonationRequestAccept/donationRequestAccept';
import RequestSummary from './components/DonationRequestAccept/RequestSummary';
import Dashboard from './adminSide/pages/Dashboard/dashboard';
import Dash2 from './adminSide/pages/Dashboard/dash2';
//import Calendar2 from './Calendar/cal';
import requestActions from '../src/pages/Requests/RequestActions';
//import CalendarForDonor from '../src/pages/Requests/CalendarForDonor';
import OrgAccount from '../src/OrgProfile/OrgAccount';
import TableNewDonor from '../src/pages/Requests/TableNewDonor';
//import Alart from '../src/components/DonationRequestAccept/alart';
import DonationSummaryDonor from '../src/OrgProfile/DonationSummaryDonor';
import DonationHistory from '../src/Profile/DonationHistory';
import { useAuthContext } from './components/hoooks/useAuthContext';
//import HomeAdmin from '../src/adminSide/pages/HomePage';
import PieDonationType from './adminSide/pages/Dashboard/main/PieDonationType';
import AdminResDon from './adminSide/pages/Dashboard/ReservedDonors/ReservedDonors';
import AdminInsDon from './adminSide/pages/Dashboard/instantdonors/InstantDonors';
import Orgs from './adminSide/pages/Dashboard/Organizations/Organizations';
import DateForm from './Calendar/DateForm';
///import Calender from '../src/Calendar/calendar';
import PopUp from '../src/pages/Requests/TableNewDonor';
import CalendarNew from '../src/pages/Calendar/Calendar';
Modal.setAppElement('#root');


function App() {
  const {user} = useAuthContext()
  const [roleType,setRoleType] = useState('');
  const [auth, setauth] = useState(false);
  const [auth1, setauth1] = useState(true);

  // const isLoggedIn = async () => {
  //   try {
  //     const res = await fetch('/auth', {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       credentials: "include"
  //     });

  //     if (res.status === 200) {
  //       setauth(true)
  //       setauth1(false)
  //     }
  //     if (res.status === 401) {
  //       setauth(false)
  //       setauth1(true)
  //     }

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   isLoggedIn();
  // }, []);
  useEffect(() => {
    fetch('/api/user/login')
       .then(res => res.json())
       .then(data => setRoleType(data.role));
       console.log(data => setRoleType(data.role));
  },[]);
//   useEffect(() => {
//     const fetchUser = async () => {
//         const response = await fetch('/api/user/login')
//         const json = await response.json()

//         if(response.ok){
//             setDonation(json)
//         } 
//     }
//     fetchUser()
// },[])
const [refresh,setRefresh] = useState(false);

useEffect(()=>{
  setRefresh(!refresh)
},[refresh]);

  if (roleType === 'admin') {
    return (
      <div>
        
      </div>
    );
  }else{
  return (
    <>
    
      {/* <NavBar auth={auth1} /> */}
      {/* <Nav/> */}
      <Routes>
      <Route path="/login" element= {!user ? <Login/> : <Navigate to="/home"/>}/>
     <Route path="/register" element={!user ?<Register/> :<Navigate to="/login"/> }/>
     </Routes>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/contact" element={<Contact/>} />
                
        { /* <Route element={<ProtectedRoutes/>}>
            
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
            </Route>  */}




        <Route path="/donateDash" element={<DonateDash/>}/>
        <Route path="/donationForm" element={<DonationForm/>} />
        <Route path="/instantDonation" element={user ? <InstantDonation/>: <Navigate to="/login"/>}/>
        <Route path="/reservedDonation" element={user ? <ReservedDonation/> : <Navigate to="/login"/>} />
        <Route path="/reservedDonationNew" element={<ReservedDonationNew/>}/>
        <Route path="/donationType" element={<DonationType/>}/>
        <Route path="/tableNew" element={user ? <TableNew/> : <Navigate to="/login"/>}/>
        <Route path="/requestForm" element={<RequestForm/>}/>
        <Route path="/donorAccount" element={<DonorAccount/>}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="/orgList" element={<OrgList />} />
        <Route path="/donationSummaryIns" element={<DonationSummaryInstant/>} />
        <Route path="/donationSummaryRes" element={<DonationSummaryReserved/>}/>
        <Route path="/donationSummaryComm" element={<DonationSummaryCommon/>}/>
        
        {/* <Route path="/donSum" element={<DonationSummary2/>} /> */}
        <Route path="/inst" element={<Inst/>} />
        <Route path="/acceptPage" element={user ? <AcceptPage/> : <Navigate to="/login"/>} />
        <Route path="/receiverAccount" element={user ? <ReceiverAccount/> : <Navigate to="/login"/>} />
        {/* <Route path="/instantDonSummary/:id" element={<DonationSummaryInstant />} /> */}
        {/* <Route path="/calendar" element={user ? <Calendar /> : <Navigate to="/login"/>} /> */}
        {/* <Route path="/cal" element={user ? <Calendar2/> : <Navigate to="/login"/>} />
        <Route path="/calForDon" element={user ? <CalendarForDonor/>: <Navigate to="/login"/>}/> */}
        <Route path="/donationReqAcc" element={<DonationRequestAccept/>} />
       
        <Route path="/dash2" element={<Dash2/>}/>
        <Route path="/orgAccount" element={<OrgAccount/>}/>
        <Route path="" element={<Home/>}/>
        <Route path="/tableNewDonor" element={<TableNewDonor/>}/>
        <Route path="/donationSummaryDonor" element={user ? <DonationSummaryDonor/> : <Navigate to="/login"/>}/>
        <Route path="/donationHistory" element={user ? <DonationHistory/> : <Navigate to="/login"/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
        {/* <Route path="/homeAdmin" element={<HomeAdmin />} /> */}
        <Route path="/requestSummary" element={user ? <RequestSummary/> : <Navigate to="/login"/>} /> 
        <Route path="/pieDonationType" element={<PieDonationType/>}/>
        <Route path="/adminResDon" element={<AdminResDon/>}/>
        <Route path="/adminInsDon" element={<AdminInsDon/>}/>
        <Route path="/orgs" element={<Orgs/>}/>
        <Route path="/dateform" element={<DateForm/>}/>
        {/* <Route path="/calendar2" element={<Calender/>}/> */}
        <Route path="/popup" element={<PopUp/>}/>
        {/* <Route path="/calendarNew" element={<CalendarNew  availableSessions={[
            {
              Id: 290149,
              TimeStart: "2023-02-13T07:00:00",
              TimeEnd: "2023-02-13T10:00:00",
              Type: 2,
            },]} setRefreshCalendar={setRefresh}/>}/>
        CalendarNew  */}
        {/* <Route path="/homeAdmin" element={<HomeAdmin/>}/> */}
        
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
}

export default App;
