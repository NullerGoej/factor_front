import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import UserComponent from '../App/UserComponent';
import Loading from './Loading';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!localStorage.getItem('token') && location.pathname !== '/register' && location.pathname !== '/login') {
            navigate('/login');
            return;
          }
    }, [navigate, location.pathname]);

    return (
        <div>
            <Loading />
            <nav className="navbar navbar-dark bg-primary fixed-top">
                <Link className="navbar-brand" to="/">
                    <img src="/logo.png" height="40" className="d-inline-block align-top ms-3" alt="" />
                </Link>
                {localStorage.getItem('token') && <div className="dropdown text-end me-3">
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
        </div>
    );
}

export default Header;