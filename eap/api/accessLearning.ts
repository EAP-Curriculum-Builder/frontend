interface ExerciseType {
    id: number; // the id of the exercise type
    text_id: number; // the associated text that the exercise will be carried out with
    exercise_type: string; // the name for the type of exercise
};

interface LearningPath {
    user_id: string;
    topics_id: number;
    genre_id: number;
    text_id: number;
    exercise_id_array: ExerciseType; // JSON.stringify the ExerciseType[] array
}
export async function fetchAllLearningPaths(uid: string): Promise<LearningPath[]> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/access/learningpaths?uid=${uid}`, {
            method: 'GET',
            credentials: 'include'
        })
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("There was an error fetching your learning paths", error);
        return [];
    }
}