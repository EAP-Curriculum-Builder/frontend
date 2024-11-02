export async function fetchPublicKey(): Promise<string> {

    try {
        const response = await fetch('http://localhost:4000/api/auth/public-key');
        const data = await response.json();
        return data.publicKey;
    } catch (error) {
        console.error("Error fetching public key:", error);
        return "";
    }

}

export const submitEncryptedLogin = async (encryptedData: {username:string, password:string}):Promise<boolean> => {
    try {
        const response = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(encryptedData)
        });
        return response.ok;
    } catch (error) {
        console.error("Error submitting login:", error);
        return false;
    }
}