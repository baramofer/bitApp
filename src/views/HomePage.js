import UserActions from '../store/user/UserActions'
import React, {Component} from 'react';
import MovesList from '../cmps/MovesList'
import BitcoinService from '../services/BitcoinService'
import {Link} from 'react-router-dom'
import { Sparklines, SparklinesLine, SparklinesBars, SparklinesSpots } from 'react-sparklines';
import { connect } from 'react-redux'

class HomePage extends Component {
    state = {
        btcToUsdRate: null,
        marketPrice: []
    }
    async componentDidMount(){
        await this.props.getLoggedUser()
        if (!this.props.user) this.props.history.push('/signup')
        else {
            try{
                const btcToUsdRate = await BitcoinService.btcToUsd()
                this.setState({btcToUsdRate})
            } catch (err) {console.log(err)}
            try{
                const marketPrice = await BitcoinService.getMarketPrice()
                this.setState({marketPrice})
            } catch (err) {console.log(err)}
        }
    }
    signout = async () =>{
        await this.props.signout()
        this.props.history.push('/signup')
    }
    itemsSlice = (items) => {
        return items.slice(0,3)
    }
    upperCaseFirstLetter = (name) =>{
        return name.charAt(0).toUpperCase()+name.substring(1,name.length)
    }
    render(){
        const {user} = this.props;
        const {btcToUsdRate} = this.state;
        const {marketPrice} = this.state;
        return( 
            <>
            {user && <section className="home-container container">
                <div className="name-container">
                    <h1>Hi, {this.upperCaseFirstLetter(user.name)}</h1>
                    <div className="logout-btn" onClick={this.signout}>< i className="fas fa-sign-out-alt"></i></div>
                </div>
                <hr className="user-name-line"/>
                <div className="balance-container">
                    <div className="curr-balance">
                        <div className="title">CURRENT BALANCE</div>
                        <h2>BIT: <span className="bit-amount">B {user.coins}</span></h2>
                        {btcToUsdRate && <h2>USD: <span className="usd-amount">${parseInt(user.coins*btcToUsdRate).toLocaleString('en')}</span></h2>}
                    </div>
                    <div className="curr-btc">
                        <div className="title">CURRENT BTC USD</div>
                         {btcToUsdRate && <h2 className="amount">$ {parseInt(btcToUsdRate).toLocaleString('en')}</h2>}
                         {!btcToUsdRate && <h2 className="amount">N/A</h2>}
                    </div>
                </div>
                {marketPrice && <Sparklines data={marketPrice}>
                    <SparklinesLine style={{ fill: "none" }} />
                    <SparklinesBars style={{ fill: 'slategray', fillOpacity: ".5" }} />
                    <SparklinesSpots />
                </Sparklines>}
                <Link to={`/statistic`} >
                    <h4 className="stat-btn">See full statistic</h4>
                </Link>
                <hr className="user-name-line"/>
                <MovesList title={'Last 3 moves'} moves={this.itemsSlice(user.moves)} btcToUsdRate={btcToUsdRate} />
                </section>}
                </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.currUser
    }
}

const mapDispatchToProps = {
    getLoggedUser: UserActions.getLoggedUser,
    signout: UserActions.signout,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)