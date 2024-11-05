"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { fetchLearningGenres } from '@/api/createLearning';
import Navbar from '../components/Navbar';
import '../styles/createLearningStyles.css';

interface Genre {
    id: number;
    genre: string;
}
const CreateLearning = () => {
    const router = useRouter();

    const [learningGenres, setLearningGenres] = useState<Genre[]>();

    useEffect(() => {
        const getGenres = async () => {
            try {
                const result = await fetchLearningGenres();
                setLearningGenres(result);
            } catch (error) {
                console.error("Error fetching learning genres:", error);
            }
        };

        getGenres();
    }, []);

    const handleGenreClick = (selectedGenre: Genre) => {
        router.push(`/createtopic?genreId=${selectedGenre.id}&genreName=${selectedGenre.genre}`);
    }

    return (
        <div>
            <div>
                <Navbar topMessage='Choose a genre' page='createLearning' />
            </div>
            <div className="create-learning-container">
                {learningGenres?.map((genre) => (
                    <div className="select-a-genre-section" key={genre.id}>
                        <div 
                            className="genre-item"
                            onClick={() => handleGenreClick(genre)}
                        >
                                {genre.genre}
                        </div>
                    </div>
                    
                ))}
            </div>
        </div>
    );

}

export default CreateLearning;