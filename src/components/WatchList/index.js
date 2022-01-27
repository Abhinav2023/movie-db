import React, { useContext } from "react";
import { Wrapper,Content } from "./WatchList.styles";
import {Context} from '../../context';
import Thumb from "../Thumb";
import WatchListMovie from "../WatchListMovie";


import useMovieWatchListFetch from "../../hooks/useMovieWatchListFetch";
const WatchList = () => {
    const [user] = useContext(Context);
    const movieWatchList = useMovieWatchListFetch();
    return (
        <>
            {!user ?
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