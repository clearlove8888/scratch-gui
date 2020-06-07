const initialState = {
    error: null,
    userData: null,
    loginState: 'notLogin'
};

const reducer = function (state, action) {
    if (typeof state === 'undefined')state = initialState
    return state;
}

export {
    reducer as default,
    initialState as userStateInitialState
};
