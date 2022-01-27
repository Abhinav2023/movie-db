import React from "react";
import MiniThumb from "../MiniThumb";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
import NoImage from '../../images/no_image.jpg';
import WatchListMovieInfo from "../WatchListMovieInfo";
import { Wrapper,Content } from "./WatchListMovie.styles";
const WatchListMovie = ({movie, watched}) => {
    return (
        <Wrapper>
            <Content>
                <MiniThumb
                    key={movie.id}
                    clickable
                    image={
                        movie.poster_path
                            ? IMAGE_BASE_URL + POSTER_SIZE+ movie.poster_path
                            : NoImage
                    }
                    movieId={movie.id}
                />
            </Content>
            <WatchListMovieInfo movie={movie} watched={watched} />
        </Wrapper>
    )
}

export default WatchListMovie;