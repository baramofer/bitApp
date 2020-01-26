import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    state = {
        isOnline: false
    }

    componentDidMount() {
        this.handleConnectionChange();
        window.addEventListener('online', this.handleConnectionChange);
        window.addEventListener('offline', this.handleConnectionChange);
    }

    componentWillUnmount() {
        window.removeEventListener('online', this.handleConnectionChange);
        window.removeEventListener('offline', this.handleConnectionChange);
    }

    handleConnectionChange = () => {
        this.setState({ isOnline: navigator.onLine });
    }

    render() {
        return (
            <section className="header">
                <Link to="/"><h1>MR. BitCoin</h1></Link>
                <ul className="nav-bar">
                    {!this.state.isOnline ? <li className="offline-icon "><i className="  fas fa-globe"></i>
                        <span className="live-txt red"> OffLine</span></li>
                        :
                        <li className="online-icon "><i className=" fas fa-globe icon-txt"></i>
                            <span className="live-txt"> OnLine</span></li>
                    }
                    <li><Link to="/contact"><i className="fas fa-users icon"></i> </Link></li>
                    <li><Link to="/statistic"><i className="far fa-chart-bar icon"></i> </Link></li>
                </ul>
            </section>)
    }

}
export default Header;