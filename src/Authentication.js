import React,{useState, useEffect} from "react";
import { Route,Routes } from "react-router-dom";
import { isPersistedStateLocal } from './helpers';
import { API_KEY,API_URL } from './config';
import Header from './components/Header';

import Home from './components/Home';
import Movie from './components/Movie';
import NotFound from './components/NotFound';
import Login from './components/Login';
import WatchList from "./components/WatchList";
import { useSelector,useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {actions} from './state/index';

const handleAccountLogin = async (sessionId) => {
    const response = await fetch(`${API_URL}account?api_key=${API_KEY}&session_id=${sessionId}`);
    const json = await response.json();
    return json;
}

const Authentication = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const {login} = bindActionCreators(actions,dispatch);
    useEffect(async() => {
        if(user.username!==''){
            setIsLoggingIn(false);
            return ;
        }
        setIsLoggingIn(true);
        try{
            const localState = isPersistedStateLocal("movie-db");
            if(localState){
                const sessionId =await handleAccountLogin(localState.sessionId);
                login(localState);
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