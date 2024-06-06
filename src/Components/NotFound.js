import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const NotFound = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    return (
        <div>
            <Header />
            <div className="bg-dark text-light d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                    <h1 className="display-1">404</h1>
                    <p className="lead">Page not found</p>
                    <p>The page you are looking for does not exist.</p>
                    <button className="btn btn-primary" onClick={goHome}>Go Back to Homepage</button>
                </div>
            </div></div>
    );
};

export default NotFound;