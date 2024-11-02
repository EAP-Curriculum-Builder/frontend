"use client"

import { useState } from 'react';

export default function LoginPage() {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const handleToggleLoginMode = () => {
        setIsLoginMode(!isLoginMode);
    };

    return (
        <div>
            <h1>This is the login and registration page</h1>
        </div>
    )
}