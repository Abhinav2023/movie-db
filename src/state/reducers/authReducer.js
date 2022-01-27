const initialState = {
    username: '',
    sessionId: ''
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case "login":
            return state;
        case "logout":
            return state;
        case "loginFromLocal":
            return state;
        default:
            return state;
    }
}

export default reducer;