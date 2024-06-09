import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

function Setup2() {
    const [twoFactorCode, setTwoFactorCode] = useState('');
    const navigate = useNavigate();

    const postDigitCode = async () => {
        axios.post('https://accessio-api.moedekjaer.dk/two-factor-auth-setup/2', {
            two_factor_6_digit: twoFactorCode
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                navigate('/');
            })
            .catch((error) => {
                console.error('Wrong 6 digit: ', error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        postDigitCode(twoFactorCode);
    };

    return (
        <div>
            <Header />
            <div className="App bg-dark text-white d-flex justify-content-center align-items-center vh-100">
                <form className="bg-light p-5 rounded" onSubmit={handleSubmit}>
                    <input
                        type="number"
                        value={twoFactorCode}
                        onChange={(e) => setTwoFactorCode(e.target.value)}
                        className="form-control mb-3"
                        placeholder="Enter six-digit code"
                        required
                    />
                    <button type="submit" className="btn btn-primary d-block mx-auto">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Setup2;