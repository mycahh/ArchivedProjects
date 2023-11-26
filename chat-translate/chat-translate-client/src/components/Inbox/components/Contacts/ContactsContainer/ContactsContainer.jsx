import Contact from '../Contact/index.jsx';
import useListContacts from '../hooks/useListContacts';

import './ContactsContainer.css';

function ContactsContainer(props) {

  const { toggleContacts, type, contactsToAdd, setContactsToAdd, toggleCreateGroup, searchContactValue, formData, toggleChatOpen } = props

  const { listContacts } = useListContacts()  

  let searchValue = ""; 

  if (type === "contacts"){
    searchValue = searchContactValue
  }

  if (type === "group"){
    searchValue = formData.search
  }

  if(!searchValue){
    return (
      <section className='contactsContainer chatsContainer'>
        <ul>
          {listContacts.map( c => <Contact type={type} toggleChatOpen={toggleChatOpen} toggleContacts={toggleContacts} contactsToAdd={contactsToAdd} setContactsToAdd={setContactsToAdd} toggleCreateGroup={toggleCreateGroup} key={c.id} {...c}/>)}
        </ul>
      </section>
    );
  }

  return (
    <section className='contactsContainer chatsContainer'>
      <ul>
        {listContacts.filter((item) => item.displayName.toLowerCase().includes(searchValue.toLowerCase())).map( c => <Contact type={type} toggleChatOpen={toggleChatOpen} toggleContacts={toggleContacts} contactsToAdd={contactsToAdd} setContactsToAdd={setContactsToAdd} toggleCreateGroup={toggleCreateGroup} key={c.id} {...c}/>)}
      </ul>
    </section>
  );

}

export { ContactsContainer };