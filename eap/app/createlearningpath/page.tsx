"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { fetchExercisesAvailable } from '@/api/createLearning';
import { Genre, Topic } from '@/types/appTypes';
import { useState, useEffect } from 'react';

import Draggable from '../components/dragndrop/Draggable';
import Droppable from '../components/dragndrop/Droppable';
import Navbar from '../components/Navbar';

interface ExerciseType {
    id: number;
    text_id: number;
    exercise_type: string;
};

const createLearningPath = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [genre, setGenre] = useState<Genre | null>(null);
    const [topic, setTopic] = useState<Topic | null>(null);
    const [exercises, setExercises] = useState<ExerciseType[] | null>(null);

    // Data handling for creating exercises.
    const [learningPathExercises, setLearningPathExercises] = useState<ExerciseType[] | null>(null);


    useEffect(() => {
        const genreParam = searchParams.get('genre');
        const topicParam = searchParams.get('topic');

        if (genreParam && topicParam) {
            try {
                const parsedGenre = JSON.parse(decodeURIComponent(genreParam));
                const parsedTopic = JSON.parse(decodeURIComponent(topicParam));
                setGenre(parsedGenre);
                setTopic(parsedTopic);
                const getExercises = async () => {
                    const exercisesData =  await fetchExercisesAvailable(parsedTopic.text_id);
                    setExercises(exercisesData);
                }
                getExercises();
            } catch (error) {
                console.error("Failed to parse query parameters", error);
            }
        }

    }, [searchParams]);

    

    const selectedGenre = searchParams.get('genre');
    const selectedTopic = searchParams.get('topic');
    console.log(selectedGenre);
    console.log(selectedTopic);
    console.log(exercises);

    const [draggables, setDraggables] = useState([{ id: 'draggable-1' }]);
    const droppableIds = ["drop-1", "drop-2", "drop-3", "drop-4", "drop-5"];


    const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>, id: string, exerciseData: ExerciseType) => {
        console.log("What is going on?");
        const target = e.target as HTMLDivElement;
        e.dataTransfer.setData('targetId', id);
        
        // Set exercises data to transfer
        e.dataTransfer.setData('exerciseData', JSON.stringify(exerciseData));

        // Passing the parent node classname allows us to track
        // whether the draggable is coming OUT of a droppable or not
        e.dataTransfer.setData('targetParentClass', (target.parentNode as HTMLDivElement)?.className);
        e.dataTransfer.setData('targetParentId', (target.parentNode as HTMLDivElement)?.id || '');
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, droppableId: string) => {
        console.log("Hello");
        e.preventDefault();
        const target = e.target as HTMLDivElement;
        target.classList.remove('drag-over-safe');
        target.classList.remove('drag-over-unsafe');

        // Check if a child is already appended to the droppable element
        if(!target.firstChild) {
            // get the draggable element information
            const id = e.dataTransfer.getData('targetId');
            const draggable = document.getElementById(id);
            const droppable = document.getElementById(droppableId);

            // Get the exercise data
            const receivedExerciseData = JSON.parse(e.dataTransfer.getData('exerciseData'));
            console.log("Received the following data", receivedExerciseData);

            /**
             * REMOVE ORIGINAL ELEMENT FROM ITS PARENT IF IT WAS IN A DROPPABLE
             * To remove a draggable from a droppable element
             * before we drop it, check that the draggable is not a child
             * of a droppable by using the data that was transferred
             * If it is a child of a droppable element, remove it from its parent
             * when dropped
             */
            const originalParentId = e.dataTransfer.getData('targetParentId');
            const originalParent = document.getElementById(originalParentId);
            if (originalParent && originalParent.classList.contains('droppable') && draggable) {
                originalParent.removeChild(draggable);
            }

            /**
             * CLONE the element so that it can be appended to the droppable.
             * Add to the draggables array to make sure that ids are correctly updated
             */
            if (draggable) {
                console.log("We are about to clone!");
                const clonedElement = draggable?.cloneNode(true) as HTMLElement;
                clonedElement.id = `draggable-${draggables.length + 1}`;

                /**
                 * Add a delete button if it doesn't already exist.
                 */
                if (!(clonedElement.childNodes[0] as HTMLDivElement).classList.contains('')) {
                    const deleteButton = document.createElement('button');
                    deleteButton.innerText = 'X';
                    deleteButton.className = 'delete-draggable-button';
                }

                setDraggables((prevDraggables) => [...prevDraggables, clonedElement]);
                droppable?.append(clonedElement);
            } 
        }
    }

    const handleOnDelete = () => {
        console.log("Oh my goodness!");
    }

    return (
        <div>
            <div>
                <Navbar topMessage='Create Your Learning Path' page='createLearningPath' />
            </div>
            <div className='scrollable-container'>
                <div className='draggables-container'>
                    {exercises && exercises.length > 0 && exercises.map((exercise, index) => (
                        <Draggable 
                            key={index}
                            id={exercise.id.toString()}
                            onDragStart={(e) => handleOnDragStart(e, exercise.id.toString(), exercise)}
                            onDelete={handleOnDelete}
                            exerciseData={exercise}
                        />
                            
                    ))}
                </div>
            </div>
            

            <div className='droppables-container'>
                {droppableIds.map((droppableId, index) => (
                    <Droppable
                        key={index}
                        id={droppableId}
                        onDrop={(e) => handleDrop(e, droppableId)}
                    >
                        <></>
                    </Droppable>
                ))}
            </div>
        </div>
    );
};

export default createLearningPath;