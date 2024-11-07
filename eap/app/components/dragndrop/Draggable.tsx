import React from 'react';
import '../../styles/dragndropStyles.css';

interface DraggablesProps {
    id: string;
    onDragStart: (e:React.DragEvent<HTMLDivElement>, id:string) => void;
    onDelete: () => void;
    exerciseType: string;
}

const Draggable: React.FC<DraggablesProps> = ({ id, onDragStart, onDelete, exerciseType }) => {

    return (
        <div
            id={id}
            className="draggable"
            draggable
            onDragStart={(e) => onDragStart(e, id)}
        >
            <button className="delete-draggable-button" onClick={onDelete}>
                X
            </button>
            <span className='exercise-type-label'>{exerciseType}</span>
        </div>
    )
}

export default Draggable;