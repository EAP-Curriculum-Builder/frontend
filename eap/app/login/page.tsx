"use client"

import { useState } from 'react';
import "../styles/loginStyles.css";

export default function LoginPage() {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const handleToggleLoginMode = () => {
        setIsLoginMode(!isLoginMode);
    };

    return (
        <div className="login-page">
            <form>
                <div>
                    <h1>Login</h1>
                </div>
                {
                    isLoginMode ? (
                        <div>
                            <div>
                                <label>Username</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label>Password</label>
                                <input type="password" />
                            </div>
                            <button type="button">Login</button>
                            <button type="button">Register new user</button>
                        </div>
                    ) : (
                        <div>
                            <div>
                                <label>Full Name</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label>Choose a username</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label>Set a password</label>
                                <input type="password" />
                            </div>
                            <div>
                                <label>Confirm password</label>
                                <input type="password" />
                            </div>
                            <button type="button">Register</button>
                        </div>

                    )
                }
            </form>
        </div>
    )
}