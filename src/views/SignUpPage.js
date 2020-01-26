import React, {Component} from 'react';
import UserActions from '../store/user/UserActions'
import { connect } from 'react-redux'


class signUpPage extends Component {
    state = {
        user: ''
    }
    saveUser = async (ev) => {
        ev.preventDefault()
        await this.props.signUp(Object.values(this.state.user)[0])
        this.props.history.push('/')
    }
    updateUser = (ev, field) => {
        const {value} = ev.target
        this.setState(prevState => {
            return {
                user: {
                    ...prevState.user,
                    [field]: value
                }
            }
        })
    }
    render(){
        return (
            <section className="signup-container container">
                <h1><span className="welcome-txt">Welcome</span> MR. BitCoin</h1>
                <form onSubmit= {this.saveUser} className="form-container">
                    <label> <h3>Enter your name</h3>
                        <br/>
                    <input type="text" onChange ={this.updateUser} required/>
                    </label>
                    <button>Sign Up</button>
                </form>
            </section>
        )
    }
}
const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = {
    signUp: UserActions.signUp,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(signUpPage)