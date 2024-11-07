"use client"

import { submitLogoutRequest } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { User } from '@/types/appTypes';
import { fetchAllLearningPaths } from '@/api/accessLearning';
import LearningPathComponent from '../components/learningPath/LearningPathComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faIdCard, faBell, faArrowRight, faBezierCurve, faTrophy, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

import Navbar from '../components/Navbar';
import '../styles/homePageStyles.css';

interface ExerciseType {
    id: number; // the id of the exercise type
    text_id: number; // the associated text that the exercise will be carried out with
    exercise_type: string; // the name for the type of exercise
};

interface LearningPath {
    user_id: string;
    topics_id: number;
    genre_id: number;
    text_id: number;
    exercise_id_array: ExerciseType[]; // JSON.stringify the ExerciseType[] array
}


const Home = () => {

    const router = useRouter();
    const { user, setUser } = useUser();

    const [allLearningPaths, setAllLearningPaths] = useState<LearningPath[]>([]);

    // Verify the user's session
    useEffect(() => {

        const fetchData = async () => {
            if (!user) {
                const userJSON = localStorage.getItem("user");
                const storedUser: User|null = userJSON ? JSON.parse(userJSON) : null;
                setUser(storedUser);
            }

            if (user) {
                console.log(user.uid);
                try {
                    const learningPathsData = await fetchAllLearningPaths(user.uid);
                    setAllLearningPaths(learningPathsData);
                } catch (error) {
                    console.log("Error fetching learning path", error);
                }
            }
        }
        fetchData();
        
        
    }, [fetchAllLearningPaths, user]);

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

    // For styles - controlling nav visibility
    const [isVisible, setIsVisible] = useState(false);
    const handleNavToggle = () => {
        setIsVisible((prev) => !prev);
    };

    useEffect(() => {
        setIsVisible(true);
    }, [])

    return (
        <div>
            <div>
                <Navbar topMessage='Welcome home' page='home' />
            </div>
            <div className={`home-page-container ${isVisible ? 'translate-y-0' : '-translate-y-96'}
                                transition-transform duration-1000 ease-in-out`}>
                <div className={`top-row `}>
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
                                        <FontAwesomeIcon icon={faArrowRight} className='use-app-item' onClick={logout} />
                                    </div>
                                    <div className='action-info' onClick={logout}>
                                        Logout
                                    </div>
                                </div>
                                <div className="action-item">
                                    <div className='font-icon' onClick={createLearning}>
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
                <div className='control-nav-section'>
                    <FontAwesomeIcon icon={isVisible ? faArrowUp : faArrowDown} className='toggle-nav-arrow' onClick={handleNavToggle} />
                </div>
                <div className="learning-paths-row">
                    <LearningPathComponent allLearningPaths={allLearningPaths}  />
                </div>
            </div>
            
        </div>
    )
}

export default Home;