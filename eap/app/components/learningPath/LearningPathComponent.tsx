import { useEffect, useState } from 'react';
import '../../styles/learningPathComponentStyles.css';

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
    exercise_id_array: ExerciseType[]; // JSON.stringify the ExerciseType[] array
}

interface LearningPathProps {
    allLearningPaths: LearningPath[];
}



const LearningPathComponent: React.FC<LearningPathProps> = ({ allLearningPaths }) => {

    const handleStartExercise = (exercise: ExerciseType) => {
        console.log(exercise);
    }

    return(
        <div className='all-paths-container'>
            Your Learning Paths
            {allLearningPaths.map((learningPath, index) => (
                <div className='learning-path-container' key={index}>
                    {learningPath.exercise_id_array.map((exercise:ExerciseType, ind:number) =>(
                        <div className='the-exercise-link' key={ind} onClick={() => handleStartExercise(exercise)}>
                            <div className='exercise-steps'>Step {ind+1}</div>
                            <span>{exercise.exercise_type}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default LearningPathComponent;