
// Validates user and moves user to next page
interface Genre {
    id: number;
    genre: string;
}
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
        return [{id: 0, genre: ''}];
    }
}

interface Topic {
    id: number;
    topic: string;
}
export async function fetchAssociatedTopics(genre:Genre): Promise<Topic[]>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/create/topics`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(genre)
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching the associated topics:", error);
        return [{id: 0, topic: ''}];
    }
}