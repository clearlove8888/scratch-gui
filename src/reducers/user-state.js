import Storage from '../playground/project/utils/Storage';
const storage = new Storage();

const USER_LOGIN= 'scratch-gui/user/login';

const isLoginState = ()=>{
    const user = storage.get("user");
    return user && user.id && user.loginName;
}

const getInitialState = ()=>{
    if (isLoginState()){
        return {
            error: null,
            userData: storage.get("user"),
            loginState: true
        }
    }else {
        return {
            error: null,
            userData: {},
            loginState: false
        }
    }
}

const initialState = getInitialState();

const login = (data)=>{
    return {
        type: USER_LOGIN,
        data: data
    };
}

const reducer = function (state, action) {
    if (typeof state === 'undefined')state = initialState;
    switch (action.type) {
        case USER_LOGIN:
            return Object.assign({}, state, {
                error: null,
                userData: action.data,
                loginState: true
            });
        default:
            return state;
    }
}

export {
    reducer as default,
    initialState as userStateInitialState,
    login
};
