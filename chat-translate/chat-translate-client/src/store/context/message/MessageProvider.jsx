import { useReducer } from "react"

import MessageReducer from "../../reducer/MessageReducer"
import { MessageContext, MessageDispatchContext } from "./MessageContext"

const Messages = { loaded_messages_room: [], messages: [] }
const MessageProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(MessageReducer, Messages)

    return(
        <MessageContext.Provider value={state}>
            <MessageDispatchContext.Provider value={dispatch}>
                { children }
            </MessageDispatchContext.Provider>
        </MessageContext.Provider>
    )
}

export default MessageProvider