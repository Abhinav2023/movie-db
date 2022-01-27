import { useState,useEffect } from "react";

import {API_URL, API_KEY} from '../config';
//helpers
import {isPersistedState} from '../helpers'

const handlefetchMovie = async (movieId) => {
    const response = await fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}`);
    const json = await response.json();
    return json;
}

const handlefetchCredits = async (movieId) => {
    const response = await fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`);
    const json = await response.json();
    return json;
}

export const useMovieFetch= movieId => {
    const [state,setState]=useState({});
    const [loading,setLoading] = useState(true);
    const [error,setError]=useState(false);

    useEffect(() => {
        const fetchMovie = async()=> {   
            try{
                setLoading(true);
                setError(false);
                const movie = await handlefetchMovie(movieId);
                const credits = await handlefetchCredits(movieId);
                // getDirectors only
                const directors = credits.crew.filter(
                    member => member.job === 'Director'
                );
                setState({
                    ...movie,
                    actors: credits.cast,
                    directors
                })
                setLoading(false);
            }catch(error){
                setError(true);
            }
        };
        const sessionState= isPersistedState(movieId);
        if(sessionState){
            setState(sessionState);
            setLoading(false);
            return;
        }
        fetchMovie();
    },[movieId]);

    useEffect(() => {
        sessionStorage.setItem(movieId,JSON.stringify(state));
    },[movieId,state])
    return {state,loading,error};
}