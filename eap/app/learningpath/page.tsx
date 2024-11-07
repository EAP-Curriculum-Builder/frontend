"use client"

import { useLearningPath } from '../context/LearningPathContext';
import { useEffect } from 'react';

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

const LearningPathPage = () => {
    const { learningPath }  = useLearningPath();
    
    useEffect(() => {
        
        if (learningPath) {
            //learningPath.exercise_id_array = JSON.parse(learningPath.exercise_id_array);
        }
    }, []);

    const handleStartExercise = (exercise: ExerciseType) => {
        console.log(exercise);
    }
    
    

    return (
        <div>THIS PAGE UNDER DEVELOPMENT</div>
        // <div>
        //     <h3>Welcome to your learning path</h3>
        //     <div className='learning-path-container'>
        //             {learningPath && learningPath.exercise_id_array.map((exercise:ExerciseType, ind:number) =>(
        //                 <div className='the-exercise-link' key={ind} onClick={() => handleStartExercise(exercise)}>
        //                     <span>{exercise.exercise_type}</span>
        //                 </div>
        //             ))}
        //         </div>
        // </div>
    );
}

export default LearningPathPage;