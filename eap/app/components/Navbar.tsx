"use client"

import '../styles/navbarStyles.css';
import { useUser } from '../context/UserContext';

const Navbar = () => {

    const { user } = useUser();
    return (
        <div>
            <nav className="navbar-container">
                <h3 className="welcome-message">Welcome {user?.username}</h3>
            </nav>
        </div>
    )
}

export default Navbar;