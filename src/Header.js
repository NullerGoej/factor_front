import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

class Header extends React.Component {
    render() {
        const token = localStorage.getItem('token');
        return (
            <nav className="navbar navbar-dark bg-primary fixed-top">
                <Link className="navbar-brand">
                    <img src="/logo.png" height="40" className="d-inline-block align-top ms-3" alt="" />
                </Link>
                <div className="ml-auto">
                    {token && <FaUser />}
                </div>
            </nav>
        );
    }
}

export default Header;