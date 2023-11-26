import { useContext } from "react"

import socket from "../../../../helpers/socket"

import { UserContext } from "../../../../store/context/user/UserContext"
import { InboxDispatchContext, InboxContext } from "../../../../store/context/inbox/inboxContext"

import { selectedInbox } from "../../../../store/dispatch/InboxDispatch"


import "./Chats.css"

export default function InboxItem(props) {
    const { displayName, photo_url, id_room, message, counter, id_message, toggleChatOpen } = props
    
    const { current_id_room } = useContext(InboxContext)
    const { user_data: { id }} = useContext(UserContext)
    
    const InboxDispatch = useContext(InboxDispatchContext)

    const summary = message.length > 20 ? message.substring(0, 20) + "..." : message;
    
    function handleClick() {
      toggleChatOpen()

      if(counter) {
        const body = { id_room, id_message, id_user: id }
        socket.emit('messages:readInbox', body)
      }

      if(!(current_id_room === id_room)) {
        selectedInbox(InboxDispatch, props)
      }
    }

    return (
        <li className="chat-card" onClick={handleClick}>
          <img src={photo_url} alt="Avatar" className="avatar" />
          <div className="chat-info">
            <h3 className="chat-name">{displayName}</h3>
            <p className="chat-summary">{summary}</p>
          </div>
          {counter === 0 ? null : (<div className="unread-count">{counter}</div>)}
        </li>
    );
  }
