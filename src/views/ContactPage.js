import React, {Component} from 'react';
import ContactActions from '../store/contact/ContactActions'
import UserActions from '../store/user/UserActions'
import ContactList from '../cmps/ContactList'
import ContactFilter from '../cmps/ContactFilter'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import Scroll from '../cmps/Scroll'
import ContactService from '../services/ContactService';

class ContactPage extends Component {
    state = {
        contacts: [],
        filter:null
    }
    async componentDidMount() {
        await this.props.getLoggedUser()
        await this.props.loadContacts()
        if (!this.props.user) this.props.history.push('/signup')
    }
    onFilter = async (ev) => {
        let filter = {};
        filter.term = ev;
        this.setState({filter:filter.term})
    }
    render() {
        const { filter } = this.state
        const { contacts } = this.props
        let contactsToShow = (!filter)? contacts: ContactService.filter(this.state.filter)
        return (
            contacts && <section className="contact-page container">
                <div className="btns-nav-container">
                    <Link to={'/'}>
                    <div className="link"><i className="fas fa-arrow-left"></i></div></Link>
                </div>
                <h1>Contacts</h1>
                <span>Search in contacts</span>
                <ContactFilter onFilter={this.onFilter} />
                <hr className="user-name-line"/>
                <Scroll height={'380px'}>
                    <ContactList contacts={contactsToShow}/>
                </Scroll>
                <Link className="add-contact-btn" to={'/contact/edit'}><i className="far fa-plus-square"></i></Link>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contact.contacts,
        user: state.user.currUser
    }
}

const mapDispatchToProps = {
    loadContacts: ContactActions.loadContacts,
    getLoggedUser: UserActions.getLoggedUser,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactPage)