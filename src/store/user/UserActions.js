import UserService from '../../services/UserService'


const getLoggedUser = () => {
    return async (dispatch) => {
        const user = await UserService.getLoggedUser()
        return dispatch(_setUser(user))
    }
}

const loadMoves = (id=null) =>{
    return async (dispatch) => {
        const moves = (id)? await UserService.movesByContact(id) : await UserService.getMoves()
        return dispatch(_getMoves(moves))
    }
}

const addMove = (contact, amount) => {
    return async (dispatch) => {
        const user = await UserService.addMove(contact, amount)
        return dispatch(_setUser(user))
    }
}

const _setUser = (user) => {
    return { type: 'SET_CURR_USER', user }
}

const _getMoves = (moves) =>{
    return {type : 'GET_MOVES', moves }
}

const signUp = (userName) => {
    return async (dispatch) => {
        const user = await UserService.signUp(userName)
        return dispatch(_setUser(user))
    }
}

const signout = () => {
    return async (dispatch) => {
        await UserService.signout()
        return dispatch(_setUser(null))
    }
}
export default {
    getLoggedUser,
    signUp,
    addMove,
    loadMoves,
    signout
}