import { useReducer, useState } from "react"
import { UserContext, UserDispatchContext } from "./UserContext"
import UserReducer from "../../reducer/UserReducer"


const initialState = {
    isLogged: Boolean(localStorage.getItem('isLogged')) || false,
    user_data: JSON.parse(localStorage.getItem('user_data')) || null
}

const UserProvider = ({ children }) => {
   
    const [user, setState] = useState(initialState)
    
    return(
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={setState}>
                { children }
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    )
}

export default UserProvider