import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function ListContacts({contacts,handleRemove}){
    const [query,setQuery]=useState('');
    const updateQuery=(e)=>{
        setQuery(e.target.value.trim());
    }

const showingContacts=query===" "
?contacts
: contacts.filter((c)=>c.name.toLowerCase().includes(query.toLowerCase()));

const handleShow= ()=>{
    setQuery("");
}
    return(
        <>
        <div className="list-contacts">
        {/* {JSON.stringify(query)} */}

            <div className="list-contacts-top">
                <input className='search-contacts'
                    type="text"
                    placeholder='Search contacts'
                    value={query}
                    onChange={updateQuery}

                 />
                <Link
                    to='/create'
                    className='add-contact'
                >Add Contact</Link>
            </div>
            {showingContacts.length !==contacts.length && (
            <div className='showing-contacts'>
            <span> showing {showingContacts.length} of {contacts.length} </span>
            <button onClick={handleShow}>Show All</button>
            </div>
            )}
        <ol className="contact-list">
        {showingContacts.map(contact=>(
        <li className="contact-list-item"  key={contact.id}>
            <div className="contact-avatar"
                 style={{
                    backgroundImage:`url(${contact.avatarURL})`
                 }}
            
            ></div>

            <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
            </div>
            <button 
            className="contact-remove"
            onClick={()=>{handleRemove(contact)}}
             >
            remove
            </button>
        </li>
        ))}
        </ol>
        </div>
        </>
    );
}
ListContacts.propTypes={
    contacts:PropTypes.array.isRequired,
    handleRemove:PropTypes.func.isRequired,
};
export default ListContacts;