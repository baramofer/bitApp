import React, { Component } from 'react';
import ContactService from '../services/ContactService'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import ContactActions from '../store/contact/ContactActions'

class ContactDetailsPage extends Component {
    state = {
        contact: {
            name:'',
            phone:'',
            email:''
        }
    }
    async componentDidMount() {
        const { id } = this.props.match.params
        if (id) {
            await this.props.loadCurrContact(id)
            this.setState({contact: this.props.contact})
        } else this.onResetInputs()
        await this.props.loadContacts()//survive refresh for new contacts
    }
    onRemoveContact = async () =>{
        await this.props.removeContact(this.props.match.params)
        this.props.history.push('/contact')
    }
    onResetInputs = () => {
        this.setState({contact: ContactService.getEmptyContact()})
    }
    onInputChange = (ev) => {
        const contact = this.state.contact;
        contact[ev.name] = ev.value;
        this.setState({contact});
    }
    onSaveContact = async (ev) => {
        ev.preventDefault()
        await this.props.saveContact(this.state.contact)
        this.props.history.push('/contact')
    }
    render() {
        const {contact} = this.state;
        return (
            <section className="contact-edit-container">
                <form onSubmit={this.onSaveContact}>
                <div className="btns-nav-container">
                    <Link to={(!contact._id)?'/contact':`/contact/${contact._id}`}>
                    <div className="link"><i className="fas fa-arrow-left"></i></div></Link>
                </div>
                <img src={`https://robohash.org/${contact._id}`} alt="" />
                <input type="text" 
                placeholder="Name"
                value={contact.name}
                name='name'
                onChange = {ev => this.onInputChange(ev.target)}
                required/>
                <input type="number" 
                placeholder="Phone"
                value={contact.phone}
                name='phone'
                onChange = {ev => this.onInputChange(ev.target)}
                required/>
                <input type="email" 
                placeholder="E-mail"
                value={contact.email}
                name='email'
                onChange = {ev => this.onInputChange(ev.target)}
                required/>
                <div className="btns-edit-container">
                    <button type="button" onClick={contact._id? this.onRemoveContact:this.onResetInputs}>
                    {contact._id? 'Delete':'Reset'}</button>
                    <button type="submit" >Save</button>
                </div>
                </form>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contact: state.contact.currContact
    }
}

const mapDispatchToProps = {
    loadCurrContact : ContactActions.loadCurrContact,
    loadContacts : ContactActions.loadContacts,
    removeContact: ContactActions.removeContact,
    saveContact: ContactActions.saveContact
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactDetailsPage)