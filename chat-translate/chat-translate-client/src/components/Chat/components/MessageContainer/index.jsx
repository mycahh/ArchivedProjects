import { useContext, useEffect, useRef } from 'react'
import { OtherMessage, OwnMessage } from "../Message";

import { InboxContext } from '../../../../store/context/inbox/inboxContext';
import { UserContext } from '../../../../store/context/user/UserContext';
import { MessageContext, MessageDispatchContext } from '../../../../store/context/message/MessageContext';

import { getMessagesByIdRoom } from '../../../../store/dispatch/MessageDispatch';

import socket from '../../../../helpers/socket';

import './MessageContainer.css'

function MessageContainer() {
  const { isPointed, current_id_room, Pointer} = useContext(InboxContext)
  const { user_data: {id, id_idioma} } = useContext(UserContext)
  const MessageDispatch = useContext(MessageDispatchContext)
  const { messages, loaded_messages_room } = useContext(MessageContext)

  const isCachedMessages = loaded_messages_room.includes(current_id_room)

  const MessageRef = messages.find(lm => lm.id_room === current_id_room)
  const messageContainerRef = useRef(null)
  

  useEffect(() => {

    if(isPointed && !isCachedMessages) {
      socket.emit('messages:getMessagesByIdRoom', ({id_room: current_id_room, id_idioma  }))
      socket.on('messages:getMessagesByIdRoom', messages => {
        const data = { current_id_room, messages }
        getMessagesByIdRoom(MessageDispatch, data)
      })
    }

    if (messageContainerRef.current) messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight

    return () => {
      socket.off('messages:getMessagesByIdRoom')
    }
  }, [current_id_room, MessageRef?.Listmessages])

  return (
    <section className='messageContainer'>
      <ul ref={messageContainerRef}>
        { isCachedMessages && MessageRef.Listmessages.map((message) => {

          if(message.id_user === id){
            return <OwnMessage key={message.id} {...message} />
          }
          else return <OtherMessage key={message.id} {...message}/>
          
        })} 
      </ul>
    </section>
  )
}

export { MessageContainer };