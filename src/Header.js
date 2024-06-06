import React from 'react';
import { Link } from 'react-router-dom';
import UserComponent from './UserComponent';

class Header extends React.Component {
    render() {
        const token = localStorage.getItem('token');
        return (
            <nav className="navbar navbar-dark bg-primary fixed-top">
                <Link className="navbar-brand">
                    <img src="/logo.png" height="40" className="d-inline-block align-top ms-3" alt="" />
                </Link>
                {token && <div className="dropdown text-end me-3">
                    <Link className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <UserComponent />
                    </Link>
                    <ul className="dropdown-menu text-small dropdown-menu-end" style={{}}>
                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="/logout">Sign out</Link></li>
                    </ul>
                </div>}
            </nav>
        );
    }
}

export default Header;