// import ContactService from '../services/ContactService'
import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import TransferFund from '../cmps/TransferFund'
import MovesList from '../cmps/MovesList'
import BitCoinService from '../services/BitcoinService';
import { connect } from 'react-redux'
import UserService from '../services/UserService';
import ContactActions from '../store/contact/ContactActions'
import UserActions from '../store/user/UserActions'

class ContactDetailsPage extends Component {
    state = {
        // moves: [],
    }
    async componentDidMount() {
        const { id } = this.props.match.params
        await this.props.loadCurrContact(id)
        await this.props.getLoggedUser()//surviving refresh with new contacts
        if(!this.props.user || !this.props.currContact){
            this.props.history.push('/contact')
        } 
        try{
            this.setState({btcToUsdRate: await BitCoinService.btcToUsd()})
        } catch(err) {
            console.log('Err: bitcoin rate error '+ err);
        }
    }
    onTransferCoins = async (contact, amount) =>{
        await this.props.addMove(contact, amount)
    }
    moveListFilter = () => {
        return UserService.movesByContact(this.props.currContact._id)
    }
    render() {
        const contact = this.props.currContact
        const user = this.props.user
        return (
            user && contact && 
            <section className="contact-details-container container">
                <div className="btns-nav-container">
                    <Link to={'/contact'}>
                    <div className="link"><i className="fas fa-arrow-left"></i></div></Link>
                    <Link to={`edit/${contact._id}`}>
                    <div className="link"><i className="fas fa-user-edit"></i></div></Link>
                </div>
                <img src={`https://robohash.org/${contact._id}`} alt="" />
                <h1>{contact.name}</h1>
                <h3>{contact.phone}</h3>
                <h4>{contact.email}</h4>
                <TransferFund contact={contact} maxCoins={user.coins} onTransferCoins={this.onTransferCoins}/>
                <MovesList title={'Moves History'} moves={this.moveListFilter()} btcToUsdRate={this.state.btcToUsdRate} />
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.currUser,
        currContact: state.contact.currContact,
    }
}

const mapDispatchToProps = {
    getLoggedUser: UserActions.getLoggedUser,
    loadCurrContact: ContactActions.loadCurrContact,
    loadMoves : UserActions.loadMoves,
    addMove : UserActions.addMove
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactDetailsPage)