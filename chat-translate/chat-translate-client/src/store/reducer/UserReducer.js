import types from "../types"

const UserReducer = (state, action) => {
    switch(action.types) {
        
        case types.AUTH_LOGIN:
            return({
                isLogged: true,
                user_data: action.data
            })

        case types.AUTH_LOGOUT:
            return({
                isLogged: false,
                user_data: null
            })
        default:
            return state
    }
}

export default UserReducer