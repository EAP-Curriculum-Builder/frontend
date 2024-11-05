"use client"

import { submitLogoutRequest } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { verifySession } from '@/api/auth';

import Navbar from '../components/Navbar';

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

    return (
        <div>
            <Navbar />
            <p onClick={logout}>Logout</p>
        </div>
    )
}

export default Home;