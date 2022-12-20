import { useAuthContext } from "./useAuthContext"
import { useDonationContext } from "./useDonationContext"

export const useLogout = () =>{
    const {dispatch} = useAuthContext()
    const {dispatch : donation} = useDonationContext()

    const logout = () => {
        //remove user from local storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type : 'LOGOUT'})
        donation({type: 'SET_DONATIONS',payload:null})
    }

    return {logout}
}