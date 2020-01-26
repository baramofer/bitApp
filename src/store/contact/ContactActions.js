import ContactService from '../../services/ContactService'

const loadContacts = () => {
    return async (dispatch) => {
        const contacts = await ContactService.getContacts()
        return dispatch(setContacts(contacts))
    }
}

const loadCurrContact = (id) => {
    return async (dispatch) => {
        const contact = await ContactService.getContactById(id)
        return dispatch(setCurrContact(contact))
    }
}

const removeContact = (id) => {
    return async (dispatch) => {
        await ContactService.removeContact(id)
        return dispatch(removeCurrContact())
    }
}

const saveContact = (contact) => {
    return async (dispatch) => {
        const savedContact = await ContactService.saveContact(contact)
        return dispatch(updateContacts(savedContact))
    }
}

const setContacts = contacts => {
    return { type: 'SET_CONTACTS', contacts }
}

const setCurrContact = currContact => {
    return { type: 'SET_CURR_CONTACT', currContact }
}

const removeCurrContact = () => {
    return { type: 'REMOVE_CONTACT'}
}

const updateContacts = (contact) => {
    return { type: 'UPDATE_CONTACTS',contact}
}

export default {
    loadContacts,
    loadCurrContact,
    removeContact,
    saveContact,
}