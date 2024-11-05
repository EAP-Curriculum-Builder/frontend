
import { Genre, GenreComponentProps } from '@/types/appTypes';

const Genres: React.FC<GenreComponentProps> = ({ learningGenres, handleFetchTopics }) => {

    const handleGenreClick = (genre: Genre) => {
        handleFetchTopics(genre);
    }

    return (
        <div className="create-learning-container">
            {learningGenres?.map((genre) => (
                <div className="select-a-genre-section" key={genre.id}>
                    <div 
                        className="genre-item"
                        onClick={() => handleGenreClick(genre)}
                    >
                            {genre.genre}
                    </div>
                    <div
                        className="genre-type"
                    >
                            {genre.type}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Genres;