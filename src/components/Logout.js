import React from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {actions} from '../state/index';
const Logout = () =>{
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const {logout} = bindActionCreators(actions,dispatch);
    const handleLogout = () => {
        localStorage.removeItem("movie-db");
        logout();

    }
    return (
        <div>
            
            <div>   
                <span>Logged in as: {user.username}</span>
                <div onClick={handleLogout}>
                    <Link to="/">
                        Log Out
                    </Link>
                </div>
            </div>
            
        </div>
        
        
    )
}

export default Logout;