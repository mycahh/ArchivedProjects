import React, {useContext} from 'react';
import socket from '../../../../helpers/socket';
import "./SideMenu.css"

import { UserContext, UserDispatchContext } from '../../../../store/context/user/UserContext';

function SideMenu({ isMenuOpen, toggleMenu, toggleContacts, toggleCreateGroup }) {

  const { user_data } = useContext(UserContext)
  const setUser = useContext(UserDispatchContext)
  const { displayName, photo_url } = user_data;

  const handleLogout = () => {

    setUser({
      isLogged: false,
      user_data: null
     })

    localStorage.clear()
    socket.disconnect()
  };

  return (
    <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
      <div className="menu-background" onClick={toggleMenu}></div>
      <div className="menu-content">
        <div className="user-profile">
          <div className="user-photo hvr-grow" style={{ backgroundImage: `url(${photo_url})` }}></div>
          <div className="user-name">{displayName}</div>
        </div>
        <div className="menu-options">
          <div className='option hvr-skew-forward' onClick={() => {toggleContacts(); toggleMenu();}}>
            <span className="material-symbols-outlined MenuIcon">
              contacts
            </span>
            <span className='MenuText'>Contactos</span>
          </div>
          {/*<div className='option hvr-skew-forward' onClick={() => {toggleCreateGroup(); toggleMenu();}}>
            <span className="material-symbols-outlined MenuIcon">
              group_add
            </span>
            <span className='MenuText'>Crear grupo</span>
            </div> */}
          <div className='option logout hvr-skew-forward' onClick={handleLogout}>
            <span className="material-symbols-outlined MenuIcon">
            logout
            </span>
            <span className='MenuText'>Cerrar sesión</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SideMenu };
