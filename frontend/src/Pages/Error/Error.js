import React from 'react';

import "./Error.css";

const Error = () => {
    return (
        <main className='main error-page'>
            <div className='error-page-content'>
                <h2 className='error-title'>Error 404</h2>
                <p className='error-text'>It seems that this page doesn't exist !</p>
            </div>
        </main>
    );
};

export default Error;