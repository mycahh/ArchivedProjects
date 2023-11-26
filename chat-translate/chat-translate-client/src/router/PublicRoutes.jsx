import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { UserContext } from '../store/context/user/UserContext'

function PublicRoute ({ children }) {
    const { isLogged } = useContext(UserContext)
    
    return (!isLogged) ? children : <Navigate to="/" />
}

export default PublicRoute