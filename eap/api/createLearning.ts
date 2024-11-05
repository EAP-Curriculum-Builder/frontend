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
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching the associated topics:", error);
        return [{id: 0, topic: '', theme: ''}];
    }
}