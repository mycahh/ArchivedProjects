import React, { useContext, useState, useEffect } from 'react';
import { ContactsContainer } from '../Contacts/ContactsContainer/ContactsContainer';
import { UserContext } from '../../../../store/context/user/UserContext'

import "../Contacts/Contacts.css"
import "./CreateGroup.css"

const initialFormState = {
  name: '',
  search: '',
};

function CreateGroup({ toggleCreateGroup, isCreateGroupOpen }) {
  const { user_data } = useContext(UserContext);
  const [formData, setFormData] = useState(initialFormState);
  const [contactsToAdd, setContactsToAdd] = useState([]);
  console.log("contacts to ad: " + contactsToAdd)

    console.log(formData.search)

  useEffect(() => {
    if (!isCreateGroupOpen) {
      setFormData(initialFormState);
    }
  }, [isCreateGroupOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  

  return (
    <div className={`contacts ${isCreateGroupOpen ? 'open' : ''}`}>
      <div className="menu-background" onClick={toggleCreateGroup}></div>
      <div className="menu-content">
        <div className="contacts-header">
          <div className="contacts-title">Crear grupo</div>
        </div>
        <input
          className="contacts-search Search"
          placeholder="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label className='etiqueta-add'>Añadir participantes</label>
        <input
          className="contacts-search Search"
          placeholder="Buscar"
          name="search"
          value={formData.search}
          onChange={handleChange}
        />
        <ContactsContainer type={"group"} contactsToAdd={contactsToAdd} setContactsToAdd={setContactsToAdd} toggleCreateGroup={toggleCreateGroup} formData={formData}/>
        <div className="contacts-options">
          <div className='contacts-option hvr-skew-forward' onClick={toggleCreateGroup}>
            <span className="material-symbols-outlined MenuIcon">
              group_add
            </span>
            <span className='MenuText'>Crear grupo</span>
          </div>
          <div className='contacts-option cerrar hvr-skew-forward' onClick={toggleCreateGroup}>
            <span className="material-symbols-outlined MenuIcon">
              close
            </span>
            <span className='MenuText'>Cerrar</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CreateGroup };
