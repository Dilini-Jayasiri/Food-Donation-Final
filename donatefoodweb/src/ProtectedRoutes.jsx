import React from 'react';
import {Navigate, Route,Outlet} from 'react-router-dom'

 const ProtectedRoutes =({auth, component: Component,...rest}) => {
  return (
    
       
        <Route {...rest} render={(props)=>{
            if(auth) return <Component {...props}/>
            if(!auth) return <Outlet/>; <Navigate to={{path : '/login/', state : {from : 
            props.location}}}/>

        }} />
  );
}

export default ProtectedRoutes;

// / const useAuth=()=>{
//   //   const user = localStorage.getItem('user')
//   //   if(user){
//   //     return true
//   //   }else{
//   //     return false
//   //   }
//   // }