import React from "react";
import Thumb from "../Thumb";
import WatchListMovie from "../WatchListMovie";
import { useSelector } from "react-redux";

import useMovieWatchListFetch from "../../hooks/useMovieWatchListFetch";
const WatchList = () => {
    const movieWatchList = useMovieWatchListFetch();
    const user = useSelector((state) => state.auth);
    return (
        <>
            {user.username==='' ?
                <div>WatchList</div>
                : 
                <div>
                    <p>Yours WatchList</p>
                    {movieWatchList.map(movie => (
                        <WatchListMovie key={movie.movie.id} movie={movie.movie} watched={movie.watched} />
                    ))}
                </div>
            }
        </>
    )
    
}

export default WatchList;