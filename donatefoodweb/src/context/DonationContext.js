import { createContext, useReducer } from "react";

export const DonationContext = createContext()

export const donationReducer = (state,action) =>{
    switch (action.type){
        case 'SET_DONATIONS':
            return {
                donations: action.payload
            }
        case 'CREATE_DONATIONS':
            return {
                donations : [action.payload,...state.donations]
            }
        case 'DELETE_DONATIONS':
            return {
                donations: state.donations.filter((w) => w._id !== action.payload._id)
            }
            default:
                return state
    }
}

export const DonationContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(donationReducer,{
        donations:null
    })
    return (
        <DonationContext.Provider value={{...state,dispatch}}>
            {children}
        </DonationContext.Provider>
    )
}