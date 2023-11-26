import { useState } from 'react';

import { SearchChat } from "./components/SearchChat";
import { InboxHeader } from "./components/InboxHeader";
import { MenuButton } from "./components/MenuButton";
import ListInbox from "./components/ListInbox";
import { SideMenu } from './components/SideMenu';
import { Contacts } from "./components/Contacts";
import { AddContacts } from "./components/Contacts/AddContacts";
import { CreateGroup } from './components/CreateGroup';

import "../Display/Display.css"

function Inbox({toggleChatOpen}) {
  const [searchValue, setSearchValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isAddContactsOpen, setIsAddContactsOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleContacts = () => setIsContactsOpen(!isContactsOpen)
  const toggleCreateGroup = () => setIsCreateGroupOpen(!isCreateGroupOpen)
  const toggleAddContacts = () => {

    setIsAddContactsOpen(!isAddContactsOpen)
    setIsContactsOpen(false)  
  }

  const searchChatByTitle = (items) => {
    return items.filter((item) => item.displayName.toLowerCase().includes(searchValue.toLowerCase()))
  }
  
  return (
    <section className='inbox'>
      <SideMenu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} toggleContacts={toggleContacts} toggleCreateGroup={toggleCreateGroup}/>
      <Contacts toggleContacts={toggleContacts} isContactsOpen={isContactsOpen} toggleAddContacts={toggleAddContacts} toggleChatOpen={toggleChatOpen}/>
      <AddContacts toggleAddContacts={toggleAddContacts} toggleContacts={toggleContacts} isAddContactsOpen={isAddContactsOpen}/>
      <CreateGroup toggleCreateGroup={toggleCreateGroup} isCreateGroupOpen={isCreateGroupOpen}/>
      <InboxHeader>
        <MenuButton toggleMenu={toggleMenu}/>
        <SearchChat searchValue={searchValue} setSearchValue={setSearchValue}/>
      </InboxHeader>
      <ListInbox searchChatByTitle={searchChatByTitle} searchValue={searchValue} toggleChatOpen={toggleChatOpen}/>
    </section>
  );
}

export { Inbox };