import React from 'react';
import {Navigate,Outlet} from 'react-router-dom'

 const ProtectedRoutes =() => {
  let auth = {'token':true}

  return (
    // <div>
       
    //     <Route {...rest} render={(props)=>{
    //         if(auth) return <Component {...props}/>
    //         if(!auth) return <Outlet/>:<Navigate to={{path : '/login/', state : {from : 
    //         props.location}}}/>

    //     }} />
    //     </div>
    
    auth.token?<Outlet/>:<Navigate to="/login"/>
  );
}

export default ProtectedRoutes;