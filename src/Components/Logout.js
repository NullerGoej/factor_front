import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

function Logout() {
    const navigate = useNavigate();

    useState(() => {
        axios.delete('https://accessio-api.moedekjaer.dk/logout', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(() => {
            localStorage.removeItem('token');
            navigate('/login');
        }).catch(() => {
            console.log('Failed to logout');
            navigate('/login');
        });
    }, [navigate]);

    return (
        <Loading />
    );
}

export default Logout;