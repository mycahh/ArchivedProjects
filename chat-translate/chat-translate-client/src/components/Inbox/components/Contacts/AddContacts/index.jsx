import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../../../store/context/user/UserContext';
import axios from 'axios'
import socket from '../../../../../helpers/socket';

import "../Contacts.css"

import { InboxDispatchContext } from '../../../../../store/context/inbox/inboxContext';

function AddContacts({ isAddContactsOpen, toggleAddContacts, toggleContacts }) {

  const { user_data: {id} } = useContext(UserContext);
  const [searchUser, setSearchUser] = useState("")
  const [userInfo, setUserInfo] = useState({})
  const [enableAdd, setEnableAdd] = useState(false)
  
  const InboxDispatch = useContext(InboxDispatchContext)
  
  useEffect(() => {

  if (!searchUser) return


  fetch(`https://chat-translate.azurewebsites.net/users/${searchUser}`)
  .then(response => response.json())
  .then(body => {

    if (body.status === "ok") {
      setUserInfo(body.data)
      setEnableAdd(true)
      
    }
    
    if (body.status === "error") {
      setUserInfo({})
      setEnableAdd(false)
    }
  })

  }, [searchUser])

  useEffect(() => {

    setSearchUser("")
    setUserInfo({})
  
    }, [toggleAddContacts])

  const onSearchValueChange = (event) => {
    setSearchUser(event.target.value);
  }

  const renderUserInfo = (userInfo) => {
    if(Object.entries(userInfo).length !== 0){
      return (
        <div className='user-info'>
            <img className='user-avatar' src={userInfo.photo_url} alt="Avatar" />
            <p className='contact-name'>{userInfo.displayName}</p>
        </div>
      )
    } 
      return (
        <div className='user-info'>
            <img className='user-avatar' src={"https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="Avatar" />
            <p className='contact-name'></p>
        </div>
      )
    
  }

  const handleAdd = () => {
    if (Object.entries(userInfo).length === 0) return
    
    const participants = {
      id_user_adding: id,  
      id_user_added: userInfo.id
    }
    
    axios.post("https://chat-translate.azurewebsites.net/contacts", participants)
    .then(res => {
      if(res.data.status_code === "error") return
      const { id_room, isFirstCreated } = res.data
      const new_socket_room = { participants, id_room }
      socket.emit('contact:added', new_socket_room)
      if(isFirstCreated) socket.emit("socket:new_room", new_socket_room)
      toggleContacts()
    })
    
    toggleAddContacts()
  }

  return (
    <div className={`contacts ${isAddContactsOpen ? 'open' : ''}`}>
      <div className="menu-background" onClick={toggleAddContacts}></div>
      <div className="menu-content">
        <div className="contacts-header">
          <div className="contacts-title">Nuevo contacto</div>
        </div>
        <div>
            <input 
            className="contacts-search Search"
            id='search-user' 
            placeholder="@usuario" 
            value= {searchUser}
            onChange = {onSearchValueChange}
            />
        </div>
        {renderUserInfo(userInfo)}
        <div className="contacts-options">
          <div className='contacts-option cerrar hvr-skew-forward' onClick={toggleAddContacts}>
            <span className="material-symbols-outlined MenuIcon">
              close
            </span>
            <span className='MenuText'>Cerrar</span>
          </div>
        <div className="add-contact-button hvr-skew-forward" onClick={handleAdd}>
            <span className="material-symbols-outlined MenuIcon">
              person_add
            </span>
            <span className={"MenuText"} >Añadir</span>
        </div>
        </div>
      </div>
    </div>
  );
}

export { AddContacts };
