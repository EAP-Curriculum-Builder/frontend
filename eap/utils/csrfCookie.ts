export const getCSRFCookie = (cookieName: string): string | undefined => {
    
    const value = `; ${document.cookie}`;
    console.log("The csrfCookie:", value);
    const cookies = value.split(`; ${cookieName}=`);
    if (cookies.length === 2) {
        const token = cookies[1].split(';')[0];
        console.log(token.trim());
        return token.trim();
    }
    return undefined;
    // // cookies look something like this:
    // // ['; _csrf=vN3d3jBmXNPD06sjdA444gZv; csrfToken=wFFNY2fz-5o0XZ7WDKps1Fk-4VdZKC6Qdp5Q']
    // // but can also look like this:
    // // ['; _csrf=VTuSWgcKAj3Kq6RaEnF-_HpX', 'kvD0EQq6-OxYYOssC8xOfTb9_bTTLsFl3FP8']
    // const str = cookies[0];
    // const match = str.match(/csrfToken=([^;]+)/);
    // let csrfToken = match ? match[1] : undefined;

    // if (csrfToken === undefined) {
    //     csrfToken = cookies[1];
    // }
    // console.log(csrfToken);
    // return csrfToken;
}