const initialState = {
    username: '',
    sessionId: ''
}

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case "login":
            return state = {
                username: action.payload.username,
                sessionId: action.payload.sessionId
            }
        case "logout":
            return state=initialState;
        default:
            return state;
    }
}

export default authReducer;