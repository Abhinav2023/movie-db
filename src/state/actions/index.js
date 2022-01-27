export const loginUser = ({username, password}) => {
    return (dispatch) => {
        dispatch({
            type: "login",
            username,
            password
        })
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: "logout"
        })
    }
}

export const loginFromLocalUser = ({sessionId}) => {
    return (dispatch) => {
        dispatch({
            type: "loginFromLocal",
            sessionId
        })
    }
}