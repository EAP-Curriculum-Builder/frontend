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
            <form className="login-form">
                <div className="login-panel">
                    <h1 className="login-title">Login</h1>
                </div>
                {
                    isLoginMode ? (
                        <div>
                            <div className="mb-4">
                                <label className="input-label">Username</label>
                                <input className="input-field" type="text" />
                            </div>
                            <div className="mb-4">
                                <label className="input-label">Password</label>
                                <input className="input-field" type="password" />
                            </div>
                            <button className="login-button" type="button">Login</button>
                            <button className="move-to-register-button" type="button">Register new user</button>
                        </div>
                    ) : (
                        <div>
                            <div className="mb-4">
                                <label className="input-label">Full Name</label>
                                <input className="input-field" type="text" />
                            </div>
                            <div>
                                <label className="input-label">Choose a username</label>
                                <input className="input-field" type="text" />
                            </div>
                            <div>
                                <label className="input-label">Set a password</label>
                                <input className="input-field" type="password" />
                            </div>
                            <div>
                                <label className="input-label">Confirm password</label>
                                <input className="input-field" type="password" />
                            </div>
                            <button className="login-button" type="button">Register</button>
                        </div>

                    )
                }
            </form>
        </div>
    )
}