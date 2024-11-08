"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

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

interface LearningPathContextType {
    learningPath: LearningPath | null;
    setLearningPath: React.Dispatch<React.SetStateAction<LearningPath | null>>;
}

const LearningPathContext = createContext<LearningPathContextType | undefined>(undefined);

export const LearningPathProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [learningPath, setLearningPath] = useState<LearningPath | null>(null);

    return (
        <LearningPathContext.Provider value={ { learningPath, setLearningPath } }>
            {children}
        </LearningPathContext.Provider>
    );
};

export const useLearningPath = (): LearningPathContextType => {
    const context = useContext(LearningPathContext);
    if (context === undefined) {
        throw new Error("useLearningPath must be used within a LearningPathProvider");
    }
    return context;
}