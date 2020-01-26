import React from 'react';
import { Link } from 'react-router-dom'
import ContactPreview from './ContactPreview'


const ContactList = ({contacts}) => {
    return (<ul className="contact-list-container">
        {contacts.map((contact, idx) => {
            return (               
                <Link to={`/contact/${contact._id}`} key={idx}>
                    <ContactPreview contact={contact} />
                </Link>
            )
        })}
    </ul>)
}
export default ContactList;