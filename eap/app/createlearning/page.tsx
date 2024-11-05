"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { fetchLearningGenres } from '@/api/createLearning';
import Navbar from '../components/Navbar';
import '../styles/createLearningStyles.css';

const CreateLearning = () => {
    const router = useRouter();

    useEffect(() => {
        const result = fetchLearningGenres();
        console.log(result);
    }, []);

    return (
        <div>
            <Navbar topMessage='Choose a genre' page='createLearning' />
        </div>
    );

}

export default CreateLearning;