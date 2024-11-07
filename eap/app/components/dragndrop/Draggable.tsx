import React, { useState } from 'react';
import '../../styles/dragndropStyles.css';

interface ExerciseType {
    id: number;
    text_id: number;
    exercise_type: string;
};

interface DraggablesProps {
    id: string;
    onDragStart: (e:React.DragEvent<HTMLDivElement>, id:string, exerciseData:ExerciseType) => void;
    onDelete: () => void;
    exerciseData: ExerciseType;
}

const Draggable: React.FC<DraggablesProps> = ({ id, onDragStart, onDelete, exerciseData }) => {

    
    
    return (
        <div
            id={id}
            className="draggable"
            draggable
            onDragStart={(e) => onDragStart(e, id, exerciseData)}
        >
            <button className="delete-draggable-button" onClick={onDelete}>
                X
            </button>
            <div className='exercise-title'>
                <span className='exercise-type-label'>{exerciseData.exercise_type}</span>
            </div>
            
        </div>
    )
}

export default Draggable;