import { useReducer } from "react"

import { InboxContext, InboxDispatchContext } from "./inboxContext"
import InboxReducer from "../../reducer/InboxReducer"

const initialState = {
    listInbox: [], 
    isPointed: false,
    Pointer: null,
    current_id_room: 0
}

export default function InboxProvider({ children }) {
    const [state, dispatch] = useReducer(InboxReducer, initialState)
    
    return(
        <InboxContext.Provider value={state}>
            <InboxDispatchContext.Provider value={dispatch}>
                { children }
            </InboxDispatchContext.Provider>
        </InboxContext.Provider>
    )
}