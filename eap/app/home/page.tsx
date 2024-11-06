"use client"

import { submitLogoutRequest } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { verifySession } from '@/api/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faIdCard, faBell, faArrowRight, faBezierCurve, faTrophy } from '@fortawesome/free-solid-svg-icons';

import Navbar from '../components/Navbar';
import '../styles/homePageStyles.css';


const Home = () => {

    const router = useRouter();
    const { user } = useUser();

    // Verify the user's session
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const loggedInStatus = await verifySession();
                if (loggedInStatus === 401) {
                    router.replace('/login');
                }
            } catch (error) {
                console.error("Error verifying session:", error);
                router.replace('/login');
            }
        };

        checkLoginStatus();
    }, [router]);

    const logout = async () => {
        const result = await submitLogoutRequest();
        if (result === true) {
            localStorage.removeItem('isLoggedIn');
            router.replace('/login');
        } else {
            console.log("Messed it up!");
        }
    };

    const createLearning = async () => {
        // Place a route here and then call this
        // function in the next page
        router.replace('/createlearning')
    }

    return (
        <div>
            <div>
                <Navbar topMessage='Welcome home' page='home' />
            </div>
            <div className="home-page-container">
                <div className="top-row">
                    <div className="profile-section">
                        <FontAwesomeIcon icon={faImage} className='profile-pic' />
                    </div>

                    <div className="actions-section">
                        <div className="profile-actions">
                            <div className="action-items">
                                <div className="action-item">
                                    <div className='font-icon'>
                                        <FontAwesomeIcon icon={faIdCard} className='profile-edit-item' />
                                    </div>
                                    <div className='action-info'>
                                        Update your details
                                    </div>
                                </div>
                                <div className="action-item">
                                    <div className='font-icon'>
                                        <FontAwesomeIcon icon={faBell} className='profile-edit-item' />
                                    </div>
                                    <div className='action-info'>
                                        Contact us
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="learning-actions">
                            <div className="actions-items">
                                <div className="action-item">
                                    <div className='font-icon'>
                                        <FontAwesomeIcon icon={faArrowRight} className='use-app-item' />
                                    </div>
                                    <div className='action-info' onClick={logout}>
                                        Logout
                                    </div>
                                </div>
                                <div className="action-item">
                                    <div className='font-icon'>
                                        <FontAwesomeIcon icon={faBezierCurve} className='use-app-item' />
                                    </div>
                                    <div className='action-info'>
                                        Select a learning path
                                    </div>
                                </div>
                                <div className="action-item">
                                <div className='font-icon'>
                                        <FontAwesomeIcon icon={faTrophy} className='use-app-item' />
                                    </div>
                                    <div className='action-info'>
                                        Your achievements
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="learning-paths-row">
                    This is learning paths row
                </div>
            </div>
            
        </div>
    )
}

export default Home;