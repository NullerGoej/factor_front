import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegisterClick = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await axios.post('https://zealand.moedekjaer.dk/final/api/public/api/register', {
                firstname: firstName,
                lastname: lastName,
                email: email,
                password: password
            });

            navigate('/login'); // navigate to login page
        } catch (error) {
            setError('Failed to register. Please check your details.');
            console.error(error);
        }
    };

    return (
        <div className="App bg-dark text-dark d-flex justify-content-center align-items-center vh-100">
            <form className="bg-white p-5 rounded">
                <h2 className="mb-3 text-center">Register</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <button type="button" className="btn btn-primary w-100" onClick={handleRegisterClick}>Register</button>
                </div>
                <div className="text-center">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </form>
        </div>
    );
}

export default Register;