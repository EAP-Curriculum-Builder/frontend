"use client"

import { useRouter, useSearchParams } from 'next/navigation';
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
                setGenre(JSON.parse(decodeURIComponent(genreParam)));
                setTopic(JSON.parse(decodeURIComponent(topicParam)));
                console.log(genre);
                console.log(topic);
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