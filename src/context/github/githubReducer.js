import {
    SEARCH_USERS,
    SET_LOADING,
    INITIAL_USERS,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types'

export default (state, action)=>{
    console.log("zzzzzzzzzzzz",action, state)
    switch(action.type){
        case INITIAL_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                laoding: true
            }
            default:
                return state;
    }
}