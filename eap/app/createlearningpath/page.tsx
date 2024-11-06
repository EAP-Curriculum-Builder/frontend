"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { fetchExercisesAvailable } from '@/api/createLearning';
import { Genre, Topic } from '@/types/appTypes';
import { useState, useEffect } from 'react';

const createLearningPath = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [genre, setGenre] = useState<Genre | null>(null);
    const [topic, setTopic] = useState<Topic | null>(null);

    useEffect(() => {
        const genreParam = searchParams.get('genre');
        const topicParam = searchParams.get('topic');

        if (genreParam && topicParam) {
            try {
                const parsedGenre = JSON.parse(decodeURIComponent(genreParam));
                const parsedTopic = JSON.parse(decodeURIComponent(topicParam));
                setGenre(parsedGenre);
                setTopic(parsedTopic);
                fetchExercisesAvailable(parsedTopic.text_id);
                
            } catch (error) {
                console.error("Failed to parse query parameters", error);
            }
        }

    }, [searchParams]);

    

    const selectedGenre = searchParams.get('genre');
    const selectedTopic = searchParams.get('topic');
    console.log(selectedGenre);
    console.log(selectedTopic);

    return (
        <div>

        </div>
    );
};

export default createLearningPath;