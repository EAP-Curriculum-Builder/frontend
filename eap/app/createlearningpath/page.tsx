"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { fetchExercisesAvailable } from '@/api/createLearning';
import { Genre, Topic, User } from '@/types/appTypes';
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { postNewLearningPath } from '@/api/createLearning';
import { verifySession } from '@/api/auth';

import Draggable from '../components/dragndrop/Draggable';
import Droppable from '../components/dragndrop/Droppable';
import Navbar from '../components/Navbar';

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
    exercise_id_array: string; // JSON.stringify the ExerciseType[] array
}

const createLearningPath = () => {

    const router = useRouter();
    const { user, setUser } = useUser();

    
    const searchParams = useSearchParams();
    const [genre, setGenre] = useState<Genre | null>(null);
    const [topic, setTopic] = useState<Topic | null>(null);
    const [exercises, setExercises] = useState<ExerciseType[] | null>(null);

    // Data handling for creating exercises.
    const [learningPathExercises, setLearningPathExercises] = useState<ExerciseType[] | null>(null);
    // Ready-button when learningPathExercises are ready to go
    const [readyToLearn, setReadyToLearn] = useState<boolean>(false);

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

        // Set the learningPathExercises to be empty ExerciseTypes
        const emptyExerciseType: ExerciseType = { id: 0, text_id: 0, exercise_type: '' };
        let emptyExerciseTypes = [];
        for (let i = 0; i < 7; i++) {
            emptyExerciseTypes.push(emptyExerciseType);
        }
        setLearningPathExercises(emptyExerciseTypes);

    }, [searchParams]);

    
    // I think these can be deleted!
    // const selectedGenre = searchParams.get('genre');
    // const selectedTopic = searchParams.get('topic');

    const [draggables, setDraggables] = useState([{ id: 'draggable-1' }]);
    // There should be 7 droppables for 7 learning exercises
    const droppableIds = ["drop-1", "drop-2", "drop-3", "drop-4", "drop-5", "drop-6", "drop-7"];

    // Need to check if the learning paths is all complete
    // before we can set the ready button
    const learningPathComplete: () => boolean = () => {
        if (learningPathExercises) {
            for (let exerciseType of learningPathExercises) {
                if (exerciseType.exercise_type.length === 0) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    // Necessary to check learning path is complete
    useEffect(() => {
        if (learningPathComplete()) {
            console.log("DONE!!!!");
            setReadyToLearn(true);
        }
    }, [learningPathComplete, setReadyToLearn]);

    // Drag and drop functionality

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

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, droppableId: string, droppableIndex: number) => {
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

            /**
             * REMOVE ORIGINAL ELEMENT FROM ITS PARENT IF IT WAS IN A DROPPABLE
             * To remove a draggable from a droppable element
             * before we drop it, check that the draggable is not a child
             * of a droppable by using the data that was transferred
             * If it is a child of a droppable element, remove it from its parent
             * when dropped - this doesn't work properly!
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

                // Add data to the learningPathExercises array
                setLearningPathExercises((prevPath) => {
                    if (prevPath === null) {
                        return [receivedExerciseData];
                    }

                    return prevPath.map((exercise, index) => 
                        index === droppableIndex ? receivedExerciseData : exercise
                    );
                });

            } 
        }

        
    }

    const handleOnDelete = () => {
        console.log("Oh my goodness!");
    }

    // On clicking the ready for learning button
    // this function posts the learning path
    // and, on success, it moves the learner to the next page to start learning.
    const handleReadyToLearn = () => {
        // Create the object that will be sent
        if(user && exercises && topic && genre && exercises && learningPathExercises) {
            const learningPathDataToSend:LearningPath = {
                user_id: user.uid,
                topics_id: topic?.id,
                genre_id: genre?.id,
                text_id: exercises[0].text_id,
                exercise_id_array: JSON.stringify(learningPathExercises)
            }

            const done = postNewLearningPath(learningPathDataToSend);
            console.log(done);
            router.replace('/learningpath');


        } else {
            console.log("User:", user);
            console.log("exercises:", exercises);
            console.log("There was an error - either user or exercises was not null, or possibly other things. The end!");
        }
        
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
                        onDrop={(e) => handleDrop(e, droppableId, index)}
                    >
                        <></>
                    </Droppable>
                ))}
            </div>
            
            {(readyToLearn && (
                <div className='ready-to-learn'>
                    <button className='ready-to-learn-button' onClick={handleReadyToLearn}>Ready to Learn</button>
                </div>
            ))}
            
        </div>
    );
};

export default createLearningPath;