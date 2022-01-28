import React,{useEffect, useState} from "react";
import PropTypes from 'prop-types'
import Thumb from "../Thumb";
import Rate from "../Rate";
import { API_KEY,API_URL, IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
import Spinner from '../Spinner';
//Image
import NoImage from '../../images/no_image.jpg';
import { FaBookmark, FaRegBookmark,FaCheckCircle} from 'react-icons/fa';
import { Wrapper,Content,Text } from "./MovieInfo.styles";
import useMovieWatchListFetch from "../../hooks/useMovieWatchListFetch";
import {useSelector } from "react-redux";
const handleRateMovie = async (sessionId, movieId,value) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({value})
    }
    const response = await fetch(`${API_URL}movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`, requestOptions);
    const rating = await response.json();
    return rating;
} 

const handleAddToWatchList = async(username,sessionId, mediaType, mediaId, watchlist) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    };
    const bodyData = {
        media_type: mediaType,
        media_id: mediaId,
        watchlist: true
    };
    const data = await fetch(`${API_URL}account/${username}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`,{
        ...requestOptions,
        body: JSON.stringify(bodyData)
    })
    const json = data.json();
    return json;
}



const MovieInfo = ({movie}) => {
    const user = useSelector((state) => state.auth);
    const movies = useMovieWatchListFetch();
    const [isAdddingWatchList, setIsAddingWatchList]= useState(false);
    const [isAddedInWatchList, setIsAddedInWatchList]= useState(false);
    const handleRating = async value =>{
        const rate = await handleRateMovie(user.sessionId,movie.id,value);
    }
    const handleWatchList = async (mediaType) => {
        setIsAddingWatchList(true);
        const data = await handleAddToWatchList(user.username,user.sessionId, mediaType,movie.id,true);
        setIsAddingWatchList(false);
    }
    useEffect(() => {
        movies.map(currentMovie => {
            if(movie.id===currentMovie.movie.id){

                setIsAddedInWatchList(true);
                return;
            }
        })
    })
    return (
        <Wrapper backdrop={movie.backdrop_path}>
            <Content>
                <Thumb 
                    image={
                        movie.poster_path 
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                        : NoImage
                    }
                    clickable={false}
                    />
                <Text>
                    <h1>{movie.title}</h1>
                    <h3>PLOT</h3>
                    <p>{movie.overview}</p>

                    <div className="rating-directors">
                        <div>
                            <h3>RATING</h3>
                            <div className="score">{movie.vote_average}</div>
                        </div>
                        <div className="director">
                            <h3>DIRECTOR{ movie.directors.length > 1 ? 'S' : '' }</h3>
                            {movie.directors.map((director) => (
                                <p key={director.credit_id}>{director.name}</p>
                            ))}
                        </div>
                    </div>
                    {user.username!=='' && (
                        
                        <div>
                            <div>
                                <p>Rate Movie</p>
                                <Rate callback={handleRating} />
                                {/* <p>Watchlist</p> */}
                                <div className="watchlist">
                                    { !isAddedInWatchList ?
                                        <FaRegBookmark onClick={() => handleWatchList('movie')} />
                                        : isAdddingWatchList ?
                                            <Spinner />
                                            : <FaBookmark />
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </Text>
            </Content>

        </Wrapper>
    )
}

MovieInfo.propTypes = {
    movie: PropTypes.object
}

export default MovieInfo;