"use client"

import { useState, useEffect, ChangeEvent, FocusEvent } from 'react';
import "../styles/loginStyles.css";

// encryption and validation
import { encryptDataWithOAEP } from '@/utils/encryption';
import { fetchPublicKey, submitEncryptedLogin, submitEncryptedRegistration } from '@/api/auth';
import useValidation from '../hooks/useValidation';

// toast popups
import { toast } from 'react-toastify';

interface RegistrationFormData {
    fullname: string;
    regUsername: string;
    email: string;
    regPassword: string;
    confirmPassword: string
}

interface LoginFormData {
    username: string;
    password: string;
}

export default function LoginPage() {

    // Get the public key from the server
    // to prepare encryption of user data
    useEffect(() => {
        const fetchAndSetPublicKey = async() => {
           const fetchedPublicKey = await fetchPublicKey();
           setPublicKey(fetchedPublicKey);
        };
        fetchAndSetPublicKey();
    }, []);

    // State for logging in or registration
    const [isLoginMode, setIsLoginMode] = useState<boolean>(true);

    // E2EE public key
    const [publicKey, setPublicKey] = useState<string>("");
    
    // States for logging in fields
    const [loginFormData, setLoginFormData] = useState<LoginFormData>({
        username: '',
        password: ''
    });

    // States for registration fields
    const [registrationFormData, setRegistrationFormData] = useState<RegistrationFormData>({
        fullname: '',
        regUsername: '',
        email: '',
        regPassword: '',
        confirmPassword: ''
    });

    // Validation functions for registration and login
    const { errors, loginErrors, validateRegistrationField, validateLoginField, resetErrors } = useValidation();

    // handle blur and change for login fields
    const handleLoginBlur = (e: FocusEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        validateLoginField(name as keyof LoginFormData, value);
    }

    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // handle blur and change for registration fields
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateRegistrationField(name as keyof RegistrationFormData, value, { regPassword: registrationFormData.regPassword});
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegistrationFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    
    // handle toggling between login and registration
    const handleToggleLoginMode = () => {
        setIsLoginMode(!isLoginMode);
        resetErrors();
        setLoginFormData({username: '', password: ''});
        setRegistrationFormData({
            fullname: '',
            regUsername: '',
            email: '',
            regPassword: '',
            confirmPassword: ''
        });
    };

    // Handle logging in
    const handleUserLogin = async () => {
        // Validate username and password first

        const encryptedUsername = await encryptDataWithOAEP(publicKey, loginFormData.username);
        const encryptedPassword = await encryptDataWithOAEP(publicKey, loginFormData.password);
        const encryptedData = {username: encryptedUsername, password: encryptedPassword};
        const result = await submitEncryptedLogin(encryptedData);
    };

    // Handle registration
    const handleUserRegistration = async () => {
        // Validate username and password first

        const encryptedFullname = await encryptDataWithOAEP(publicKey, registrationFormData.fullname);
        const encryptedEmail = await encryptDataWithOAEP(publicKey, registrationFormData.email);
        const encryptedUsername = await encryptDataWithOAEP(publicKey, registrationFormData.regUsername);
        const encryptedPassword = await encryptDataWithOAEP(publicKey, registrationFormData.regPassword);
        const encryptedData = { fullname: encryptedFullname, username: encryptedUsername, email: encryptedEmail, password: encryptedPassword };
        console.log(encryptedData);
        const result = await submitEncryptedRegistration(encryptedData);
    }
    

    return (
        <div className="login-page">
            <form className="login-form">
                <div className="login-panel">
                    <h1 className="login-title">{isLoginMode ? "Login" : "Register"}</h1>
                </div>
                {
                    isLoginMode ? (
                        <div>
                            <div className="mb-4">
                                <label className="input-label">Username</label>
                                <input 
                                    className="input-field"
                                    type="text"
                                    name="username"
                                    value={loginFormData.username}
                                    onChange={handleLoginChange}
                                    onBlur={handleLoginBlur} 
                                />
                                {loginErrors.username && <span className="error-message">{loginErrors.username}</span>}
                            </div>
                            <div className="mb-4">
                                <label className="input-label">Password</label>
                                <input
                                    className="input-field"
                                    type="password"
                                    name="password"
                                    value={loginFormData.password}
                                    onChange={handleLoginChange} 
                                    onBlur={handleLoginBlur}
                                />
                                {loginErrors.password && <span className="error-message">{loginErrors.password}</span>}
                            </div>
                            <button 
                                className={Object.keys(loginErrors).length > 0 ? "login-button-disabled" :"login-button"}
                                type="button"
                                disabled={Object.keys(loginErrors).length > 0}
                                onClick={handleUserLogin}>Login</button>
                            <button className="move-to-register-button" type="button" onClick={handleToggleLoginMode}>Register new user</button>
                        </div>
                    ) : (
                        <div>
                            <div className="mb-4">
                                <label className="input-label">Full Name</label>
                                <input 
                                    className="input-field" 
                                    type="text"
                                    name="fullname"
                                    value={registrationFormData.fullname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.fullname && <span className="error-message">{errors.fullname}</span>}
                            </div>
                            <div className="mb-4">
                                <label className="input-label">Choose a username</label>
                                <input 
                                    className="input-field"
                                    type="text"
                                    name="regUsername"
                                    value={registrationFormData.regUsername}
                                    onChange={handleChange} 
                                    onBlur={handleBlur}
                                />
                                {errors.regUsername && <span className="error-message">{errors.regUsername}</span>}
                            </div>
                            <div className="mb-4">
                                <label className="input-label">Input your email</label>
                                <input 
                                    className="input-field"
                                    type="email"
                                    name="email"
                                    value={registrationFormData.email}
                                    onChange={handleChange} 
                                    onBlur={handleBlur}
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>
                            <div className="mb-4">
                                <label className="input-label">Set a password</label>
                                <input 
                                    className="input-field"
                                    type="password"
                                    name="regPassword"
                                    value={registrationFormData.regPassword}
                                    onChange={handleChange} 
                                    onBlur={handleBlur}
                                />
                                {errors.regPassword && <span className="error-message">{errors.regPassword}</span>}
                            </div>
                            <div className="mb-4">
                                <label className="input-label">Confirm password</label>
                                <input 
                                    className="input-field"
                                    type="password"
                                    name="confirmPassword"
                                    value={registrationFormData.confirmPassword}
                                    onChange={handleChange} 
                                    onBlur={handleBlur}
                                />
                                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                            </div>
                            <button 
                                className={Object.keys(errors).length > 0 ? "register-button-disabled" : "register-button"} 
                                type="button"
                                disabled={Object.keys(errors).length > 0}
                                onClick={handleUserRegistration}
                            >Register</button>
                            <button
                                className="move-to-login-button"
                                type="button"
                                onClick={handleToggleLoginMode}
                            >Return to login</button>
                        </div>
                    )
                }
            </form>
        </div>
    )
}