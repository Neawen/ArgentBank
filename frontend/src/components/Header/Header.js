import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../store/slices/authSlice";

import logo from "../../assets/img/argentBankLogo.webp";
import "./Header.css";


const Header = () => {
    // get data
    const { token, user } = useSelector((state) => state.auth);
    // send data
    const dispatch = useDispatch();
    const navigate =useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }

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
                    {token ?
                        <>
                            <Link className="main-nav-item" to="/profile">
                                <i className="fa fa-user-circle"></i>
                                {user && user.userName}
                            </Link>
                            <button
                                className="main-nav-item"
                                onClick={handleLogout}
                            >
                                <i className="fa fa-sign-out"></i>
                                Sign Out
                            </button>
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