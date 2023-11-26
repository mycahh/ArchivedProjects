import "./Contact.css"

import { useContext, useState, useEffect } from "react";
import socket from "../../../../../helpers/socket"

import { UserContext } from "../../../../../store/context/user/UserContext"
import { InboxContext, InboxDispatchContext } from "../../../../../store/context/inbox/inboxContext";

import { selectedInbox } from "../../../../../store/dispatch/InboxDispatch";

export default function Contact(props) {

  const { id, displayName, username, photo_url, id_room, toggleContacts, type, contactsToAdd, setContactsToAdd, toggleCreateGroup, toggleChatOpen } = props

  const { current_id_room } = useContext(InboxContext)
//  const { user_data: { id }} = useContext(UserContext)
  
  const InboxDispatch = useContext(InboxDispatchContext)

  
  function handleClick() {
    toggleChatOpen()

    if(!(current_id_room === id_room)) {
      selectedInbox(InboxDispatch, props)
    }
    
    toggleContacts()
  }
  
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    return () => {
      setIsChecked(false);
      if (typeof setContactsToAdd === "function") {
        setContactsToAdd([]);
      }
    };
  }, [toggleCreateGroup]);

  function handleClickGroup() {
    setIsChecked(!isChecked);
    setContactsToAdd(contactsToAdd.filter((u) => u !== id))

    if(!isChecked){
      if (!contactsToAdd.includes(id)){
        setContactsToAdd([...contactsToAdd, id])
      }
    }
  }
  
  if(type === "contacts"){
    
    return (
        <li className="contact-card chat-card" onClick={handleClick}>
          <img src={photo_url} alt="Avatar" className="avatar" />
          <div className="chat-info">
            <h3 className="chat-name">{displayName}</h3>
            <p className="chat-summary">@{username}</p>
          </div>
        </li>
    );

  }

  if(type === "group"){
    return (
      <li className={`contact-card chat-card ${isChecked ? 'selected' : ''}`} onClick={handleClickGroup}>
        <img src={photo_url} alt="Avatar" className="avatar" />
        <div className="chat-info">
          <h3 className="chat-name">{displayName}</h3>
          <p className="chat-summary">@{username}</p>
        </div>
        <input type="checkbox" checked={isChecked} readOnly />
      </li>
  );
  }

  }
