import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            // Check if token is valid api
            axios.get('https://zealand.moedekjaer.dk/final/api/public/api/user', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }).then(() => {
                navigate('/'); // navigate to home page if token is valid
            }).catch(() => {
                localStorage.removeItem('token'); // remove token if it's invalid
            });
        }
    }, [navigate]);

    const handleLoginClick = async () => {
        try {
            const loginResponse = await axios.post('https://zealand.moedekjaer.dk/final/api/public/api/login', {
                email: email,
                password: password
            });

            // Save the token to local storage
            localStorage.setItem('token', loginResponse.data.token);
            navigate('/'); // navigate to home page
        } catch (error) {
            setError('Failed to login. Please check your email and password.');
            console.error(error);
        }
    };

    return (
        <div >
            <Header />
            <div className="App bg-dark text-dark d-flex justify-content-center align-items-center vh-100">
                <form className="bg-white p-5 rounded">
                    <h2 className="mb-3 text-center">Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder='example@mail.com' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder='******' value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <button type="button" className="btn btn-primary w-100" onClick={handleLoginClick}>Login</button>
                    </div>
                    <div className="text-center">
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;