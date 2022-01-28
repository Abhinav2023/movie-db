import React from "react";
import {Link} from "react-router-dom";
import RMDBLogo from '../../images/react-movie-logo.svg'

import TMDBLogo from '../../images/tmdb_logo.svg';

import { Wrapper,Content,LogoImg,TMDBLogoImg,Card } from "./Header.styles";
import Logout from "../Logout";
import { useSelector } from "react-redux";
const Header =()=>{
    const user = useSelector((state) => state.auth);
    return (
        <Wrapper>
            <Content>
                <Card>
                    <Link to="/">
                        <LogoImg src={RMDBLogo} alt="rmdb-logo" />
                    </Link>
                    {   user.username!=='' && <Link to="/watchlist">
                                    <span>Watchlist</span>
                                </Link>
                    }
                </Card>
                <Card>
                    { user.username!=='' ? (
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