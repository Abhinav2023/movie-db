import React, { useContext } from "react";
import {Link} from "react-router-dom";
import RMDBLogo from '../../images/react-movie-logo.svg'

import TMDBLogo from '../../images/tmdb_logo.svg';

import { Wrapper,Content,LogoImg,TMDBLogoImg,Card } from "./Header.styles";
import { Context } from "../../context";
import WatchList from "../WatchList";
import Logout from "../Logout";
const Header =()=>{

    const [user] = useContext(Context);
    return (
        <Wrapper>
            <Content>
                <Card>
                    <Link to="/">
                        <LogoImg src={RMDBLogo} alt="rmdb-logo" />
                    </Link>
                    {   user && <Link to="/watchlist">
                                    <span>Watchlist</span>
                                </Link>
                    }
                </Card>
                <Card>
                    { user ? (
                        <div>
                            <Logout />
                        </div>
                    ) : (
                        <Link to='/login'>
                            <span>Login</span>
                        </Link>
                    )}
                    <TMDBLogoImg src={TMDBLogo} alt="tmdb-logo" />
                </Card>
                
            </Content>
        </Wrapper>
    )
}

export default Header;