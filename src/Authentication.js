import React,{useState, useEffect, useContext} from "react";
import { Route,Routes } from "react-router-dom";
import { Context } from './context';
import { isPersistedStateLocal } from './helpers';
import { API_KEY,API_URL } from './config';
import Header from './components/Header';

import Home from './components/Home';
import Movie from './components/Movie';
import NotFound from './components/NotFound';
import Login from './components/Login';
import WatchList from "./components/WatchList";


const handleAccountLogin = async (sessionId) => {
    const response = await fetch(`${API_URL}account?api_key=${API_KEY}&session_id=${sessionId}`);
    const json = await response.json();
    return json;
}

const Authentication = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [_user,setUser] = useContext(Context);
    useEffect(async() => {
        if(_user){
            setIsLoggingIn(false);
            return ;
        }
        setIsLoggingIn(true);
        try{
            const localState = isPersistedStateLocal("movie-db");
            if(localState){
                const sessionId =await handleAccountLogin(localState.sessionId);
                setUser(localState);
            }
            setIsLoggingIn(false);
        }catch(error){
            console.log(error);
        }
    })
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/watchlist' element= {<WatchList />} />
                <Route path='/:movieId' element={<Movie />} />
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </>
    )
}
export default Authentication;