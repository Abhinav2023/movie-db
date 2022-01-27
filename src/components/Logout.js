import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context";
const Logout = () =>{
    const [user,setUser]= useContext(Context);
    const handleLogout = () => {
        localStorage.removeItem("movie-db");
        setUser(undefined);

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