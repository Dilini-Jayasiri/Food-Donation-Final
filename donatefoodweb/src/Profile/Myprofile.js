import { useAuth } from "../components/auth"
import { useNavigate } from "react-router"

export const MyProfile = () =>{
    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout=()=>{
        auth.logout()
        navigate('/')
    }
    return (<div>Welcome {auth.user}
    <button onClick={handleLogout}>Logout</button>
    </div>
    )
}