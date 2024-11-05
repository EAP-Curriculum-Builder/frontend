"use client"

import { submitLogoutRequest } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { verifySession } from '@/api/auth';

import Navbar from '../components/Navbar';
import '../styles/homePageStyles.css';


const Home = () => {

    const router = useRouter();

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
                        <p>This bit is all about you</p>
                    </div>

                    <div className="actions-section">
                        <div className="profile-actions">
                            <div className="action-items">
                                <div className="action-item">
                                    do something with your profile
                                </div>
                                <div className="action-item">
                                    do something with your profile
                                </div>
                            </div>
                        </div>

                        <div className="learning-actions">
                            <div className="actions-items">
                                <div className="action-item">
                                    <button className="logout-button" type="button" onClick={logout}>Logout</button>
                                </div>
                                <div className="action-item">
                                    <p className="select-path" onClick={createLearning}>Select a learning path</p>
                                </div>
                                <div className="action-item">
                                    <p>See your achievements</p>
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