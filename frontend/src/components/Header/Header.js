import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/img/argentBankLogo.webp";

import "./Header.css";

const Header = () => {
    // get url of the page
    const location = useLocation();
    const profilePage = location.pathname === "/profile";

    return (
        <header>
            <nav className="main-nav">
                <Link to="/" className="main-nav-logo">
                    <img
                        className="main-nav-logo-image"
                        src={logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    {profilePage ?
                        <>
                            <Link className="main-nav-item" to="/profile">
                                <i className="fa fa-user-circle"></i>
                                Tony
                            </Link>
                            <Link className="main-nav-item" to="/">
                                <i className="fa fa-sign-out"></i>
                                Sign Out
                            </Link>
                        </>
                        :
                        <Link to="/login" className="main-nav-item">
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </Link>
                    }
                </div>
            </nav>
        </header> 
    );
};

export default Header;