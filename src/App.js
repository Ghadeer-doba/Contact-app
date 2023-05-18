import { useState,useEffect } from 'react';
import CreateContact from './CreateContact';
import ListContacts from './ListContacts';
import * as ContactsAPI from "./utils/ContactsAPI";
import { Route,Routes,useNavigate  } from 'react-router-dom';



function App() {
  const [contacts,setContacts]= useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    ContactsAPI.getAll()
      .then((contacts) => {
        setContacts(contacts);
      });
  }, []);

  const handleRemove=(contact)=>{
    // const newContacts = contacts.filter(contact=>contact.id!==id);
    setContacts((currentContacts)=>currentContacts.filter(c=>c.id!==contact.id));
    ContactsAPI.remove(contact);
  }

  const createContact = (contact) => {
    ContactsAPI.create(contact)
      .then((contact) => {
        setContacts((currentContacts) => currentContacts.concat([contact]));
        navigate('/');

      })
  }
  return (
    <>
    <Routes >
      <Route  path='/' 
      element={<ListContacts contacts={contacts} handleRemove={handleRemove}/>} />
      <Route  path='/create' 
      element={<CreateContact onCreateContact={(contact)=>createContact(contact)} />} />
    </Routes>
    </>
  );
}

export default App;
