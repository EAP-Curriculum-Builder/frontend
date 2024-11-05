
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
}

export interface GroupedTopic {
    theme: string;
    topics: {
        id: number;
        topic: string;
    }[];
}

export interface GenreComponentProps {
    learningGenres: Genre[];
    handleFetchTopics: (genre: Genre) => void;
}

export interface ThemesProps {
    topics: Topic[];
    handleSelectTopic: (topicId: number) => void;
}