import React from 'react';
import HeaderProfile from '../components/HeaderProfile/HeaderProfile';
import Account from '../components/Account/Account';

const Profile = () => {
    return (
        <main className='main bg-dark'>
            <HeaderProfile />
            <Account />
        </main>
    );
};

export default Profile;