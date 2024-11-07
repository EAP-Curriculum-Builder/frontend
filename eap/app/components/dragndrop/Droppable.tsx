import React from 'react';

interface DroppableProps {
    id: string;
    onDrop: (e:React.DragEvent<HTMLDivElement>, id: string) => void;
    children: React.ReactNode;
}

const Droppable: React.FC<DroppableProps> = ({ id, onDrop, children }) => {

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const target = e.target as HTMLDivElement;
        target.classList.add(!target.firstChild ? 'drag-over-safe' : 'drag-over-unsafe');
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const target = e.target as HTMLDivElement;
        target.classList.add(!target.firstChild ? 'drag-over-safe' : 'drag-over-unsafe');
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const target = e.target as HTMLDivElement;
        target.classList.remove("drag-over-safe", "drag-over-unsafe");
    };

    return (
        <div
            id={id}
            className="droppable"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => onDrop(e, id)}
        >
            {children}
        </div>
    )
}

export default Droppable;