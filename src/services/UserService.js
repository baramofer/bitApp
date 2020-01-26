import UtilsService from './UtilsService'
import ContactService from './ContactService'
import UserActions from '../store/user/UserActions'

const USER_KEY = 'user'

export default {
    getLoggedUser,
    signUp,
    signout,
    addMove,
    movesByContact,
    // getMoves
}

function signUp(userName){
    const user = { 
        name: userName,
        coins: 100,
        moves: [{toId: 'dgdrghd5r3', to: 'Holder Bean', at: 1577562128480, amount: 10},
        {toId: 'dgdrghd5r3', to: 'Parsons Norris', at: 1577562128480, amount: 21},
        {toId: 'dgdrghd5r3', to: 'Dominique Soto', at: 1577562128480, amount: 9}],
        _id: UtilsService._makeId()
    }
    UtilsService.saveToStorage(USER_KEY, user);
    return user;
}
function signout(){
        ContactService.resetContacts()
        UserActions.getLoggedUser()//todo remove user from state
        return Promise.resolve(console.log('signout successfully'))
}
function addMove(contact, amount){
    const user = UtilsService.loadFromStorage(USER_KEY) 
    const newMove = {
        toId: contact._id,
        to: contact.name,
        at: new Date(),
        amount
    }
    user.moves.unshift(newMove)
    user.coins -= amount
    UtilsService.saveToStorage(USER_KEY, user);
    return user;
}

function getLoggedUser() { 
    const user = UtilsService.loadFromStorage(USER_KEY) 
    return (!user)? null : user;
}

function movesByContact(id){
    const user = UtilsService.loadFromStorage(USER_KEY) 
    const moves = user.moves.filter(move => move.toId ===id)
    return moves;
}

// function getMoves(){
//     const user = UtilsService.loadFromStorage(USER_KEY) 
//     return user.moves
// }