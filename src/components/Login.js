import React, {useState,  useEffect} from "react";

import  {useNavigate} from 'react-router-dom';

import Button from './Button';

import { Wrapper } from "./Login.styles";

import { LOGIN_URL, REQUEST_TOKEN_URL,SESSION_ID_URL} from "../config";

import { useSelector, useDispatch} from "react-redux";
import { bindActionCreators} from "redux";
import {actions} from '../state/index';
const handleGetRequestToken = async () => {
    const response = await fetch(REQUEST_TOKEN_URL);
    const json = await response.json();
    return json.request_token;
}

const handleAuthenticate = async (requestToken, username, password) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    };
    const bodyData = {
        username,
        password,
        request_token: requestToken
    };
    const data = await (
        await fetch(LOGIN_URL, {
            ...requestOptions,
            body: JSON.stringify(bodyData)
        })
    ).json();
    if(data.success){
        console.log("Data Success");
        const response = await fetch(SESSION_ID_URL,{
            ...requestOptions,
            body: JSON.stringify({request_token: requestToken})
        });
        const json = await response.json();
        return json;
    }
}

const Login = () => {
    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState(false);
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const {login} = bindActionCreators(actions, dispatch)
    const navigate = useNavigate();
    const handleSubmit = async () => {
        setError(false);
        try{
            const requestToken = await handleGetRequestToken();
            const sessionId = await handleAuthenticate(
                requestToken,
                username,
                password
            );
            login({username: username, sessionId: sessionId.session_id});

        }catch(error){
            setError(true);
        }
    };
    const handleInput = e => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        if(name==='username') setUsername(value);
        if(name==='password') setPassword(value);
    }
    useEffect(() => {
        if(user.username!==''){
            localStorage.setItem("movie-db", JSON.stringify(user));
            navigate('/');
        }
        
    },[user]);
    return (
        <Wrapper>
            {error && <div className="error">There was an error.</div>}
            <label>Username:</label>
            <input 
                type='text'
                value = {username}
                name = 'username'
                onChange= {handleInput}
            />
            <input
                type='password'
                value={password}
                name='password'
                onChange = {handleInput}
            />
            <Button text= 'Login' callback={handleSubmit} />
        </Wrapper>
    )
}

export default Login;