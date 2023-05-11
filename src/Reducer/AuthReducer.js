import * as Actions from '../actions/ActionTypes';
const user = {
    data:'',
    isLogin: false,
}
const AuthReducer = (state = user, action) => {
    switch (action.type) {
        case Actions.SIGNIN:
            return { ...state, data: action.payload, isLogin: true };
        case Actions.LOGOUT:
            return { ...state, data: '', isLogin: false };
        default:
            return state;
    }
}
export default AuthReducer;