
import {useEffect, useState } from "react";
import { API_KEY, API_URL } from "../config";
import {isPersistedStateLocal} from '../helpers';
import { useSelector } from "react-redux";
const handleMovieWatchList = async(username,sessionId) => {
    const response = await fetch(`${API_URL}account/${username}/watchlist/movies?api_key=${API_KEY}&language=en-US&sort_by=created_at.asc&session_id=${sessionId}&page=1`);
    const json = await response.json();
    return json;
}

const useMovieWatchListFetch = () => {
    const [movieWatchList, setMovieWatchList]= useState([]);
    const user = useSelector((state) => state.auth);
    const fetchMovieWatchList = async () => {
        if(user.username==='') return;
        try{
            const movies = await handleMovieWatchList(user.username, user.sessionId);
            const watchedMovies = isPersistedStateLocal("movie-db-watched");
            let updatedWatchList=[];
            if(watchedMovies){
                movies.results.map(movie => {
                    let isWatched = false;
                    watchedMovies.map(watchedMovie => {
                        if(watchedMovie.movie.id === movie.id){
                            isWatched=true;
                        }
                    })
                    if(isWatched) updatedWatchList.push({movie: movie, watched: true})
                    else updatedWatchList.push({movie: movie, watched: false})
                })
            }else{
                movies.results.map(movie => {
                    updatedWatchList.push({movie: movie, watched: false})
                })
            }
            setMovieWatchList(updatedWatchList);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMovieWatchList();
    })
    return movieWatchList;
}

export default useMovieWatchListFetch;