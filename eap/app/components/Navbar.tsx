"use client"

import '../styles/navbarStyles.css';
import { useUser } from '../context/UserContext';
import { useState, useEffect } from 'react';

interface NavbarProps {
    topMessage: string;
    page: string;
}

const Navbar: React.FC<NavbarProps> = ({ topMessage, page }) => {

    const { user } = useUser();

    const [message, setMessage] = useState<string>('');
    
    useEffect(() => {
        createTopMessage();
    }, []);

    const createTopMessage = () => {
        if (page === 'home') {
            setMessage(topMessage + " " + user?.username);
        }

        if (page === 'createLearning') {
            setMessage(topMessage);
        }

        if (page === 'CreateTopic') {
            setMessage(topMessage);
        }
    }

    return (
        <div>
            <nav className="navbar-container">
                <h3 className="welcome-message">{message}</h3>
            </nav>
        </div>
    )
}

export default Navbar;