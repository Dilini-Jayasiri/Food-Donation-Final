import { Navigate } from "react-router-dom";
import {auth} from '../ProtectedRoutes';

export const RequireAuth = ({children})=>{
    const auth = auth()

    if(!auth.user){
        return <Navigate to='/login'/>
    }
}