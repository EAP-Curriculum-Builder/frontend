"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { fetchLearningGenres, fetchAssociatedTopics } from '@/api/createLearning';
import Navbar from '../components/Navbar';
import Genres from '../components/selectLearning/Genres';
import Themes from '../components/selectLearning/Themes';
import PreparationBar from '../components/selectLearning/PreparationBar';
import '../styles/createLearningStyles.css';

import { Genre, Topic } from '@/types/appTypes';

const CreateLearning = () => {
    const router = useRouter();

    // Store the learning genres and topics data from the database
    const [learningGenres, setLearningGenres] = useState<Genre[]>([]);
    const [topics, setTopics] = useState<Topic[]>([]);

    // Keeps state for the PreparationBar component
    const [genreIsSelected, setGenreIsSelected] = useState<boolean>(false);
    const [topicIsSelected, setTopicIsSelected] = useState<boolean>(false);

    // Keep the genre and topic data selected by the user
    const [selectedGenre, setSelectedGenre] = useState<Genre>();
    const [selectedTopic, setSelectedTopic] = useState<Topic>();

    // Get the learning genres on entry to the page
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

    const handleFetchTopics = async (genre: Genre) => {
        try {
            const result = await fetchAssociatedTopics(genre);
            setTopics(result);
            setGenreIsSelected(true);
            setSelectedGenre(genre);
            setShowThemes(true);
        } catch (error) {
            console.error("Error fetching associated topics:", error);
        }
    };

    const handleSelectTopic = (topic: Topic) => {
        setSelectedTopic(topic);
        setTopicIsSelected(true);
    }

    const handleStartLearning = () => {
        const genreParam = encodeURIComponent(JSON.stringify(selectedGenre));
        const topicParam = encodeURIComponent(JSON.stringify(selectedTopic));
        router.push(`/createlearningpath?genre=${genreParam}&topic=${topicParam}`);
     }

    // State to handle styles animation
    const [showThemes, setShowThemes] = useState<boolean>(false);

    return (
        <div>
            <div>
                <Navbar topMessage='Create Your Learning Path' page='createLearning' />
            </div>
            <div className='genre-themes-container'>
                <div className={`genres-container transition-transform duration-500 delay-500 ${
                    showThemes ? '-translate-x-full' : 'translate-x-0'
                }`}>
                    <Genres learningGenres={learningGenres} handleFetchTopics={handleFetchTopics} />
                </div>
                <div className={`themes-container transition-transform duration-500 delay-700 ${
                    showThemes ? 'translate-x-0' : 'translate-x-full'
                }`}>
                    <Themes topics={topics} handleSelectTopic={handleSelectTopic} />
                </div>
            </div>
            <div className='preparation-bar-container'>
                <PreparationBar genreIsSelected={genreIsSelected} selectedGenre={selectedGenre} topicIsSelected={topicIsSelected} selectedTopic={selectedTopic} handleStartLearning={handleStartLearning}  />
            </div>
        </div>
    );

}

export default CreateLearning;