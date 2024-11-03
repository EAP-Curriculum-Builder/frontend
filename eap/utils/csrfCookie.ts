export const getCSRFCookie = (cookieName: string): string | undefined => {
    
    const value = `; ${document.cookie}`;
    const cookies = value.split(`; ${cookieName}=`);
    // cookies look something like this:
    // ['; _csrf=vN3d3jBmXNPD06sjdA444gZv; csfrToken=wFFNY2fz-5o0XZ7WDKps1Fk-4VdZKC6Qdp5Q']
    const str = cookies[0];
    const match = str.match(/csfrToken=([^;]+)/);
    const csfrToken = match ? match[1] : undefined;
    return csfrToken;
}