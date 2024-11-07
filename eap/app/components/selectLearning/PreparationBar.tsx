import { PreparationBarProps } from '@/types/appTypes';
import { useEffect, useState } from 'react';


const PreparationBar: React.FC<PreparationBarProps> = ({ genreIsSelected, selectedGenre, topicIsSelected, selectedTopic, handleStartLearning }) => {
    
    const [showGenreBulletin, setShowGenreBulletin] = useState<boolean>(false);
    useEffect(() => {
        if(genreIsSelected) {
            setShowGenreBulletin(true);
        } else {
            setShowGenreBulletin(false);
        }
    }, [genreIsSelected]);

    const [showTopicBulletin, setShowTopicBulletin] = useState<boolean>(false);
    useEffect(() => {
        if(topicIsSelected) {
            setShowTopicBulletin(true);
        } else {
            setShowTopicBulletin(false);
        }
    }, [topicIsSelected]);

    const onStartLearning = () => {
        handleStartLearning();
    }
    
    return (
        <div className='bulletins-container'>
            
                {genreIsSelected && (
                    <div className={`selected-genre-bulletin transition-transform duration-500 ${
                        showGenreBulletin ? 'translate-x-0' : 'translate-x-[500vw]'
                    }`}>
                        <p>{selectedGenre?.genre}</p>
                    </div>
                )}
                {topicIsSelected && (
                    <div className={`selected-topic-bulletin transition-transform duration-500 ${
                        showTopicBulletin ? 'translate-x-0' : 'translate-x-[500vw]'
                    }`}>
                        <p>{selectedTopic?.theme} - {selectedTopic?.topic}</p>
                    </div>
                )}
                {genreIsSelected && topicIsSelected && (
                    <div className={`start-planning-area transition-transform duration-500 delay-500 ${
                        showTopicBulletin ? 'translate-x-0' : 'translate-x-[500vw]'
                    }`}>
                        <button className='start-planning-button' type='button' onClick={onStartLearning}>Go!</button>
                    </div>
                )}
        </div>
    );
}

export default PreparationBar;