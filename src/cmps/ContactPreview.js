import React from 'react';

const ContactPreview = ({contact}) => {
    return (
        <div className="contact-preview">
            <img src={`https://robohash.org/${contact._id}`} alt=""/>
            <div className="contact-details">
                <h1 className="name">{contact.name}</h1>
                <div className="phone">{contact.phone}</div>
            </div>
        </div>
    )
}
export default ContactPreview;