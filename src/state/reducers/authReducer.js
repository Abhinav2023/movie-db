const initialState = {
    username: '',
    sessionId: ''
}

const authReducer = (state=initialState, action) => {
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

export default authReducer;