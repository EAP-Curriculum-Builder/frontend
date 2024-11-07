import { Genre, Topic } from '@/types/appTypes';

export async function fetchLearningGenres(): Promise<Genre[]> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create/learning`, {
            credentials: "include"
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching the learning genres:", error);
        return [{id: 0, type: '', genre: ''}];
    }
}

export async function fetchAssociatedTopics(genre:Genre): Promise<Topic[]>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create/topics`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(genre)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching the associated topics:", error);
        return [{id: 0, topic: '', theme: '', text_id: 0}];
    }
}


interface ExerciseType {
    id: number;
    text_id: number;
    exercise_type: string;
};

export async function fetchExercisesAvailable(text_id: Number): Promise<ExerciseType[]>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create/exercises`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ "text_id": text_id })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching the types of exercises", error);
        return [];
    }
}

interface LearningPath {
    user_id: string;
    topics_id: number;
    genre_id: number;
    text_id: number;
    exercise_id_array: string; // JSON.stringify the ExerciseType[] array
}

export async function postNewLearningPath(learningPath: LearningPath): Promise<LearningPath> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create/learningpath`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ learningPath }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error posting the learning path", error);
        // Return an empty learning path
        return {
            user_id: '',
            topics_id: 0,
            genre_id: 0,
            text_id: 0,
            exercise_id_array: ''
        };
    }
}