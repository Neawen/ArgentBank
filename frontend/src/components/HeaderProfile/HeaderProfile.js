import React from 'react';
import { useSelector } from 'react-redux';

import "./HeaderProfile.css";;

const HeaderProfile = () => {
  const { user } = useSelector((state) => state.auth);

    return (
        <div className="header">
        <h1>Welcome back<br />{user && user.firstName} {user && user.lastName}!</h1>
        <button className="edit-button">Edit Name</button>
      </div>
    );
};

export default HeaderProfile;