import React from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {actions} from '../state/index';
import { useNavigate } from "react-router-dom";
const Logout = () =>{
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const {logout} = bindActionCreators(actions,dispatch);
    const navigate= useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("movie-db");
        logout();
        navigate('/');
        localStorage.removeItem("movie-db-watched");
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