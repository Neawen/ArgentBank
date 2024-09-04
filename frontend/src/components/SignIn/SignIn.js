import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, loginSuccess, loginFailure, setUserProfile } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
    // import of useDispatch to send data
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // import of useSelector to get data
    const { status, error, token } = useSelector((state) => state.auth);

    const [emailData, setEmailData] = useState("");
    const [passwordData, setPasswordData] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginRequest());

        try {
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: emailData, password: passwordData })
            });

            const data = await response.json();

            // if api request succeed
            if (response.ok) {
                // send token to Redux store
                dispatch(loginSuccess({ token: data.body.token }));
                navigate("/profile");
            } else {
                dispatch(loginFailure(data.message));
            }
        } catch (error) {
            dispatch(loginFailure(error.message))
        }
    }

    useEffect(() => {
        const userProfile = async () => {
            if (token) {
                try {
                    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    })

                    const data = await response.json();
                    console.log(data);
                    
                    if (response.ok) {
                        dispatch(setUserProfile(data.body));
                    } else {
                        console.error("failed: ", data.message);
                    }
                } catch (error) {
                    console.error("Failed: ", error);
                }
            }
        }
        userProfile();
    }, [token, dispatch])

    return (
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleLogin}>
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        onChange={(e) => setEmailData(e.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPasswordData(e.target.value)}
                    />
                </div>
                <div className="input-remember">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <button
                    className={`
                        sign-in-button 
                        ${status === "loading" && "sign-in-button-disabled"}
                        `}
                    disabled={status === "loading"}
                >
                    Sign In
                </button>
                {/* if there is error when login, show error */}
                {error && <p>{error}</p>}
            </form>


        </section>
    );
};

export default SignIn;