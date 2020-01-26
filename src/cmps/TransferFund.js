import React, {Component} from 'react';

export default class TransferFund extends Component {
    state = {
         amount : [],
         msg:null
    }
    onInputChange = (value) => {
        if(value > this.props.maxCoins){
            this.setState({msg:'Your max coins to transfer: '+this.props.maxCoins})
            this.setState({amount:value});
        } else{
            this.setState({msg:null})
            this.setState({amount:value});
        }
    }
    onUserSend = (ev) => {
        ev.preventDefault()
        const {amount} = this.state
        if (amount <= this.props.maxCoins &&
            amount.length !== 0 &&
            +amount !== 0){
            this.props.onTransferCoins(this.props.contact, amount)
            this.setState({msg:`Transfer succeed!. You have ${this.props.maxCoins-amount} coins left`})
            setTimeout(()=> this.setState({msg:''}) ,2500)
        } else {
            this.setState({msg:'Transfer failed! Enter a valid number'})
            setTimeout(()=> this.setState({msg:''}),2200)
        }
        setTimeout(()=>this.inputAmount.value = "",1000)
    }
    render(){
        const {contact} = this.props
        const {msg} = this.state
        return(
            <section className="transfer-fund">
                <form ref="form" onSubmit = {this.onUserSend}>
                    <h4>Transfer coins to <span className="trans-to-name">{contact.name}</span></h4>
                    {msg && <div className="msg">{this.state.msg}</div>}
                    <div className="input-container">
                    <input type="number"
                    className="trans-input" 
                    placeholder="Enter amount you want"
                    onChange = {ev => this.onInputChange(ev.target.value)}
                    ref={el => this.inputAmount = el}/>
                    <button type="submit">Transfer</button>
                </div>
                </form>
            </section>
        )
    }
}