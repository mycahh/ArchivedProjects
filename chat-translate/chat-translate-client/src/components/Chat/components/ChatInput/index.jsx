import { useState, useContext, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize"

import socket from "../../../../helpers/socket"
import { InboxContext } from "../../../../store/context/inbox/inboxContext"
import { UserContext } from "../../../../store/context/user/UserContext"

import "./ChatInput.css"

function ChatInput() {

  const initialValue = ''
  const [message, setMessage] = useState(initialValue)

  const { current_id_room, Pointer } = useContext(InboxContext)
  const { user_data: { id, id_idioma } } = useContext(UserContext)

  const handleChange = e => setMessage(e.target.value) 
  const inputRef = useRef(null)
  
  function handleSubmit() {
    const body = {
      id_room: current_id_room,
      message,
      id_user: id,
      id_idioma,
      other_lang: Pointer.id_idioma,
      id_target: Pointer.id
    }

    socket.emit("messages:clientSendMessage", body)
    setMessage(initialValue)
    inputRef.current.focus(); 
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && e.ctrlKey) {
      setMessage(message + '\n');
      e.preventDefault();
    } else if (e.key === 'Enter' && !e.ctrlKey) {
      e.preventDefault()
      handleSubmit()
    }
  };

  return (
    <div className="message-input">
      <TextareaAutosize maxRows={10} value={message} onChange={handleChange} onKeyDown={handleKeyDown} ref={inputRef}/>
      <button className="hvr-shrink" onClick={handleSubmit}>
        <span className="material-symbols-outlined material-symbols-outlined-send">
        send
        </span>
      </button>
    </div>
  )
}

export { ChatInput };
