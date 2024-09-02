import React from 'react';

import "./HeaderProfile.css";

const HeaderProfile = () => {
    return (
        <div className="header">
        <h1>Welcome back<br />Tony Jarvis!</h1>
        <button className="edit-button">Edit Name</button>
      </div>
    );
};

export default HeaderProfile;