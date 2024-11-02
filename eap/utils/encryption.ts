export const encryptDataWithOAEP = async(publicKey: string, data: string): Promise<string> => {
    try {
        const pemHeader = '-----BEGIN PUBLIC KEY-----';
        const pemFooter = '-----END PUBLIC KEY-----';
        const pemContents = publicKey.replace(pemHeader, '').replace(pemFooter, '').replace(/\s+/g, '');

        // Test to make sure we have a base64 valid string
        if (!/^[A-Za-z0-9+/]*={0,2}$/.test(pemContents)) {
            throw new Error('Invalid Base64 string.');
        }

        const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));

        // Import the public key
        const cryptoKey = await crypto.subtle.importKey(
            'spki',
            binaryDer.buffer,
            { name: 'RSA-OAEP', hash: 'SHA-256' },
            true,
            ['encrypt']
        );

        // Encrypt the data
        const encodedData = new TextEncoder().encode(data);
        const encrypted = await crypto.subtle.encrypt(
            { name: 'RSA-OAEP' },
            cryptoKey,
            encodedData
        );

        // Convert ArrayBuffer to base64 for transmission
        return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
    } catch (error) {
        console.error("Encryption error:", error);
        throw error;
    }
}