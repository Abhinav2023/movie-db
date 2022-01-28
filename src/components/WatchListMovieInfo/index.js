import React, { useState } from "react";
import { Content } from "../WatchListMovieInfo/WatchListMovieInfo.styles";
import { Wrapper,Text } from "../WatchListMovieInfo/WatchListMovieInfo.styles";
import {isPersistedStateLocal } from '../../helpers';
import {FaBookmark, FaCheckCircle, FaRegCheckCircle, FaBan} from 'react-icons/fa';
const WatchListMovieInfo = ({movie, watched}) => {
    const [isWatched, setIsWatched] = useState(watched);
    const handleMovieWatched = () => {
        let localStorageWatchedMovies = isPersistedStateLocal("movie-db-watched");
        if(localStorageWatchedMovies){
            localStorageWatchedMovies.push({movie: movie, watched: true});
            localStorage.setItem("movie-db-watched",JSON.stringify(localStorageWatchedMovies))
        }else{
            let item=[];
            item[0]={movie: movie, watched: true};
            localStorage.setItem("movie-db-watched",JSON.stringify(item))
        }
        
        setIsWatched(true);
        console.log(isWatched);
    }
    return (
        <Wrapper>
            <Text>{movie.title}</Text>
            <Content>
                {isWatched ? 
                    <div>
                        <FaCheckCircle /> Watched
                    </div>
                : 
                    <div>
                        <button onClick={handleMovieWatched}>Watch</button>
                    </div>
                }
                <div>{movie.overview}</div>
            </Content>
        </Wrapper>
    )
}

export default WatchListMovieInfo;