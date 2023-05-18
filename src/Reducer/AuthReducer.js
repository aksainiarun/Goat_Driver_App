import * as Actions from '../actions/ActionTypes';
const user = {
    data:'',
    isLogin: false,
    orders:[],
}
const AuthReducer = (state = user, action) => {
    switch (action.type) {
        case Actions.SIGNIN:
            return { ...state, data: action.payload, isLogin: true };
        case Actions.LOGOUT:
            return { ...state, data: '', isLogin: false };
        case Actions.ORDERS:
            return {...state,orders:action.payload}
        default:
            return state;
    }
}
export default AuthReducer;