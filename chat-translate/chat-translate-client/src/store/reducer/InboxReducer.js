import types from "../types"

const InboxReducer = (state, action) => {
    
    switch(action.type) {
        case types.INITIAL_LOADING_INBOX:
            return {...state, listInbox: action.data}
        
        case types.SELECTED_INBOX:
            return {...state, 
                isPointed: true, 
                Pointer: action.data, 
                current_id_room: action.data.id_room
            }
        
        case types.INBOX_UPDATE_BY_MESSAGE:
            return {...state, listInbox: state.listInbox.map(i => i.id_room === action.data.id_room ? 
                ({...i, message: action.data.message, created_at: action.data.created_at, id_message: action.data.id }) : i )}
        
        case types.INBOX_UPDATE_COUNTER:
            return {...state, listInbox: state.listInbox.map(i => i.id_room === action.data ? ({...i, counter: i.counter + 1}) : i )}
        
        case types.INBOX_UPDATE_COUNTER_BY_READ:
            return {...state, listInbox: state.listInbox.map(i => i.id_room === action.data ? ({...i, counter: 0}): i)}
        
        case types.INBOX_NEW:
            return {...state, listInbox: [...state.listInbox, action.data]}

        default:
            return state
    }
}

export default InboxReducer