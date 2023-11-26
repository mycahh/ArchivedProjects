import types from "../types"

const MessageReducer = (state, action) => {

    switch(action.type) {
        case types.LOAD_MESSAGES:
            return ({ 
                loaded_messages_room: [...state.loaded_messages_room, action.data.current_id_room],
                messages: [...state.messages, { id_room: action.data.current_id_room, Listmessages: action.data.messages } ]
            })

        case types.MESSAGE_ADDED:
            return ({
                ...state, 
                messages: state.messages.map(msg => {
                    return msg.id_room === action.data.id_room ? 
                    {...msg, Listmessages: [...msg.Listmessages, action.data]} : msg
                })
            })
        

        default:
            return state
    }
}

export default MessageReducer