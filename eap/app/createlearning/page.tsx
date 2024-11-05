"use client"
import { useEffect, useState } from 'react';
//import { useRouter } from 'next/navigation';

import { fetchLearningGenres, fetchAssociatedTopics } from '@/api/createLearning';
import Navbar from '../components/Navbar';
import Genres from '../components/selectLearning/Genres';
import Themes from '../components/selectLearning/Themes';
import PreparationBar from '../components/selectLearning/PreparationBar';
import '../styles/createLearningStyles.css';

import { Genre, Topic } from '@/types/appTypes';

const CreateLearning = () => {
    //const router = useRouter();

    // Store the learning genres and topics data from the database
    const [learningGenres, setLearningGenres] = useState<Genre[]>([]);
    const [topics, setTopics] = useState<Topic[]>([]);

    // Keeps state for the PreparationBar component
    const [genreSelected, setGenreSelected] = useState<boolean>(false);
    const [topicSelected, setTopicSelected] = useState<boolean>(false);

    // Keep the genre and topics selected by the user
    const [selectedGenreId, setSelectedGenreId] = useState<number | undefined>();
    const [selectedTopicId, setSelectedTopicId] = useState<number | undefined>();
    console.log(selectedGenreId);
    console.log(selectedTopicId);
    console.log(genreSelected);
    console.log(topicSelected);

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
            console.log(result);
            setTopics(result);
            console.log(topics);
            setGenreSelected(true);
            setSelectedGenreId(genre.id);
        } catch (error) {
            console.error("Error fetching associated topics:", error);
        }
    };

    const handleSelectTopic = (topicId: number) => {
        setSelectedTopicId(topicId);
        setTopicSelected(true);
    }

    // const handleGenreClick = (selectedGenre: Genre) => {
    //     //router.push(`/createtopic?genreId=${selectedGenre.id}&genreName=${selectedGenre.genre}`);
    // }

    return (
        <div>
            <div>
                <Navbar topMessage='Create Learning' page='createLearning' />
            </div>
            <div>
                <Genres learningGenres={learningGenres} handleFetchTopics={handleFetchTopics} />
            </div>
            <div>
                <Themes topics={topics} handleSelectTopic={handleSelectTopic} />
            </div>
            <div>
                <PreparationBar />
            </div>
        </div>
    );

}

export default CreateLearning;