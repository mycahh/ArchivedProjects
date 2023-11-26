import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { UserContext } from '../store/context/user/UserContext'

function PrivateRoute({ children }) {
    const { isLogged } = useContext(UserContext)

    return (isLogged) ? children : <Navigate to="/auth" />
}

export default PrivateRoute