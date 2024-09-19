import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import { loginUser } from "../../store/thunks/loginUser";
import { getUserData } from "../../store/thunks/getUserData";

const SignIn = () => {
  // import of useDispatch to send data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // import of useSelector to get data
  const { status, error, token, user } = useSelector((state) => state.auth);

  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // wait until call api is resolved
      await dispatch(loginUser({ email: emailData, password: passwordData })).unwrap();
    } catch (err) {
      console.error("handleLogin: ", err)
    }
  };

  // useEffect to save user data & to be redirected to profile user
  useEffect(() => {
    const userProfile = async () => {
      const storedToken = localStorage.getItem("token");
      
      if (token || storedToken) {
        // wait until call api is resolved
        await dispatch(getUserData({ token, storedToken })).unwrap();

        // if user data exists & rememberMe is true
        if (user && rememberMe) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        }

        navigate("/profile");
      }
    };

    userProfile();
  }, [token, dispatch, rememberMe, user, navigate]);

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
            value={emailData || ""}
            onChange={(e) => setEmailData(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordData || ""}
            onChange={(e) => setPasswordData(e.target.value)}
          />
        </div>
        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={() => setRememberMe((prev) => !prev)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button
          className={`
                        sign-in-button 
                        ${status === "loading" && "button-disabled"}
                        `}
          disabled={status === "loading"}
        >
          Sign In
        </button>
        {/* if there is error when login, to show api error */}
        {error && <p className="login-error">{error}</p>}
      </form>
    </section>
  );
};

export default SignIn;
