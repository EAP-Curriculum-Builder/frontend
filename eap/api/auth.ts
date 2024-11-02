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

interface LoginData {
    username: string;
    password: string;
}

export const submitEncryptedLogin = async (encryptedData: LoginData):Promise<boolean> => {
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

interface RegistrationData {
    fullname: string;
    username: string;
    email: string;
    password: string;
}

export const submitEncryptedRegistration = async (encryptedData: RegistrationData):Promise<boolean> => {
    try {
        const response = await fetch('http://localhost:4000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(encryptedData)
        });
        return response.ok;
    } catch (error) {
        console.error("Error submitting registration:", error);
        return false;
    }
}