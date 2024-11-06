import { PreparationBarProps } from '@/types/appTypes';


const PreparationBar: React.FC<PreparationBarProps> = ({ genreIsSelected, selectedGenre, topicIsSelected, selectedTopic, handleStartLearning }) => {
    
    const onStartLearning = () => {
        handleStartLearning();
    }
    
    return (
        <div>
            {genreIsSelected && (
                <div className='selected-genre-bulletin'>
                    <p>{selectedGenre?.genre}</p>
                </div>
            )}
            {topicIsSelected && (
                <div className='selected-topic-bulletin'>
                    <p>{selectedTopic?.topic}</p>
                    <p>{selectedTopic?.theme}</p>
                </div>
            )}
            {genreIsSelected && topicIsSelected && (
                <div>
                    <button className='start-planning-button' type='button' onClick={onStartLearning}>Let's go</button>
                </div>
            )}
        </div>
    );
}

export default PreparationBar;