import React from 'react';

const ContactFilter = ({onFilter}) => {
    return (
        <input 
        className="contact-filter"
        type="search"
        placeholder = "Enter name / number"
        onChange={(ev) => onFilter(ev.target.value)} />
    )
}

export default ContactFilter