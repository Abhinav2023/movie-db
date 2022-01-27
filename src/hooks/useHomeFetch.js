import React, {useState, useEffect, useRef} from "react";
import { isPersistedState } from "../helpers";
import { SEARCH_BASE_URL,POPULAR_BASE_URL} from "../config";
const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

const handlefetchMovies= async(searchTerm,page)=> {
    if(searchTerm){
        const response = await fetch(`${SEARCH_BASE_URL}${searchTerm}&page=${page}`);
        const json = await response.json();
        return json;
    }else{
        const response = await fetch(`${POPULAR_BASE_URL}$page=${page}`);
        const json = await response.json();
        return json;
        
    }
}

export const useHomeFetch = () =>{
    const [searchTerm,setSearchTerm]=useState('')
    const [state,setState]=useState(initialState),
          [loading,setLoading]=useState(false),
          [error,setError]=useState(false),
          [isLoadingMore,setIsLoadingMore]=useState(false);

    const fetchMovies= async (page, searchTerm = "" ) => {
        try{
            setError(false);
            setLoading(true);
            const movies = await handlefetchMovies(searchTerm, page);
            setState(prev => ({
                ...movies,
                results:
                    page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }))

        }catch(error){
            setError(true);
        }
        setLoading(false);
    };

    // Initial and search
    useEffect(() => {
        if(!searchTerm){
            const sessionState = isPersistedState('homeState');
            
            if(sessionState){
                console.log("Grabbing from SessionStorage")
                setState(sessionState);
                return;
            }
        }
        console.log('Grabbing from API');
        setState(initialState);
        fetchMovies(1,searchTerm);
    }, [searchTerm] )

    // Load More
    useEffect(() => {
        if(!isLoadingMore) return ;
        fetchMovies(state.page+1,searchTerm);
        setIsLoadingMore(false);
    },[isLoadingMore,searchTerm,state.page])

    //Write to sessionStorage

    useEffect(()=>{
        if(!searchTerm){
            sessionStorage.setItem('homeState',JSON.stringify(state));
        }
    },[searchTerm,state])

    return { state, loading, error,searchTerm,setSearchTerm,setIsLoadingMore};
}