import { useContext, useEffect } from 'react'
import socket from '../../../../../helpers/socket'

import { InboxContext, InboxDispatchContext } from '../../../../../store/context/inbox/inboxContext'
import { UserContext } from '../../../../../store/context/user/UserContext'
import { MessageDispatchContext } from '../../../../../store/context/message/MessageContext'

import { initialLoadInbox, updatedInboxNewMessage, updatedInboxCounter, updatedInboxCounterByRead, newInbox } from '../../../../../store/dispatch/InboxDispatch'
import { addMessage } from '../../../../../store/dispatch/MessageDispatch'


function useListInbox() {
    const { listInbox, current_id_room } = useContext(InboxContext)
    const dispatch = useContext(InboxDispatchContext)
    const messageDispatch = useContext(MessageDispatchContext)
    const { user_data: { id, id_idioma }} = useContext(UserContext)
    
    useEffect(() => {
        socket.emit('inbox:initial_load', ({id, id_idioma}))
        socket.on('inbox:initial_load', listInbox => initialLoadInbox(dispatch, listInbox))
        socket.on("messages:clientSendMessage", new_msg => {
            updatedInboxNewMessage(dispatch, new_msg)
            addMessage(messageDispatch, new_msg)

            if(new_msg.id_user !== id && current_id_room !== new_msg.id_room ) updatedInboxCounter(dispatch, new_msg.id_room)
        })
        socket.on("messages:readInbox", id_room => {
            updatedInboxCounterByRead(dispatch, id_room)
        })
        socket.on("socket:new_room", res => {
            const { id_room, inbox } = res
            newInbox(dispatch, inbox)

            socket.emit("socket:new_listen", id_room)
        })


        return () => {
            socket.off("inbox:initial_load")
            socket.off("messages:clientSendMessage")
            socket.off("messages:readInbox")
            socket.off("socket:new_room")
        }
    }, [])

    return { listInbox }
}

export default useListInbox
