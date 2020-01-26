const INITIAL_STATE = {
    currUser: null,
    moves:[]
}

export default function userReducer(state= INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_CURR_USER':
        return {
            ...state,
            currUser: action.user
        }
        case 'GET_MOVES':
        return {
            ...state,
            moves: action.moves
        }
        default:
            return state;
    }
}