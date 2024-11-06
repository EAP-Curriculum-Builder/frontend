
import { Genre, GenreComponentProps } from '@/types/appTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchoolCircleCheck, faLaptopCode, faPenNib, faBook, faWandMagicSparkles, faFlask } from '@fortawesome/free-solid-svg-icons'

const Genres: React.FC<GenreComponentProps> = ({ learningGenres, handleFetchTopics }) => {

    const handleGenreClick = (genre: Genre) => {
        handleFetchTopics(genre);
    }

    const imagesArray = [faSchoolCircleCheck, faLaptopCode, faPenNib, faBook, faWandMagicSparkles, faFlask ];

    return (
        <div className="create-learning-container">
            {learningGenres?.map((genre, index) => (
                <div className="select-a-genre-section" key={genre.id}>
                    <div 
                        className="genre-item"
                        onClick={() => handleGenreClick(genre)}
                    >
                        <FontAwesomeIcon icon={imagesArray[index]} className='select-a-genre-icon' />
                        <span className='select-a-genre-selector-text'>{genre.genre}</span>
                    </div>
                    <div
                        className="genre-type"
                    >
                            <span>Skill: {genre.type}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Genres;