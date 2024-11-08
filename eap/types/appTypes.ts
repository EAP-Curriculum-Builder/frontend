
/**
 * For the user details
 */
export interface User {
    username: string;
    role: string;
    uid: string;
}

/**
 * For the navbar
 */

export interface NavbarProps {
    topMessage: string;
    page: string;
}

/**
 * For the Create Learning Area
 */

export interface Genre {
    id: number;
    type: string;
    genre: string;
}

export interface Topic {
    id: number;
    topic: string;
    theme: string;
    text_id: number;
}

export interface GroupedTopic {
    theme: string;
    topics: {
        id: number;
        topic: string;
        theme: string;
        text_id: number;
    }[];
}

export interface GenreComponentProps {
    learningGenres: Genre[];
    handleFetchTopics: (genre: Genre) => void;
}

export interface ThemesProps {
    topics: Topic[];
    handleSelectTopic: (topic: Topic) => void;
}

export interface PreparationBarProps {
    genreIsSelected: boolean;
    selectedGenre: Genre | undefined;
    topicIsSelected: boolean;
    selectedTopic: Topic | undefined;
    handleStartLearning: () => void;
}