import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { getCSRFCookie } from "@/utils/csrfCookie";

// Gets the public key for E2EE of user data
// Also retrieves as CSRF cookie to prevent cross site forgery requests
export async function fetchPublicKeyAndCSRF(): Promise<string> {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/public-key-csrf` ,{
            credentials: "include"
        });
        const data = await response.json();
        return data.publicKey;
    } catch (error) {
        console.error("Error fetching public key:", error);
        return "";
    }

}

interface RegisterUserResponse {
    token: string;
    uid: string;
}

export const registerUserThroughFirebase = async (
    email: string, 
    password: string, 
    displayName: string
): Promise<RegisterUserResponse> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User credentials came back:", userCredential);
        await updateProfile(userCredential.user, { displayName });
        const token = await userCredential.user.getIdToken(true);
        console.log("Got a token back:", token);
        return { token, uid: userCredential.user.uid };
    } catch (error) {
        // Presumably, there will be some possible feedback from firebase if pwd
        // does not meet certain criteria. Handle that here?
        console.error("Error registering user:", error);
        throw error;
    }
};

interface RegistrationData {
    fullname: string;
    username: string;
    uid: string;
}

export const submitEncryptedRegistration = async (
    encryptedData: RegistrationData,
    token: string
):Promise<boolean> => {
    const csrfToken = getCSRFCookie('csrfToken');

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // this token was generated by Firebase
    };
    // Server will not like it if this csrfToken is not valid
    if (csrfToken) {
        headers['X-CSRF-Token'] = csrfToken;
    }

    try {
        const response = await fetch('http://localhost:4000/api/auth/register', {
            method: 'POST',
            headers,
            body: JSON.stringify(encryptedData),
            credentials: "include"
        });
        return response.ok;
    } catch (error) {
        console.error("Error submitting registration:", error);
        return false;
    }
}

interface LoginData {
    username: string;
    password: string;
}

export const submitEncryptedLogin = async (
    encryptedData: LoginData
):Promise<boolean> => {
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

