
// Validates user and moves user to next page
interface LearningGenres {
    genres: string[];
}
export async function fetchLearningGenres(): Promise<LearningGenres> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create/learning`, {
            credentials: "include"
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching the learning genres:", error);
        return {genres:['']};
    }
}