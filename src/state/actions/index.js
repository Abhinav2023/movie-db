export const login = (loginDetails) => {
    return (dispatch) => {
        dispatch({
            type: "login",
            payload: loginDetails
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: "logout"
        })
    }
}