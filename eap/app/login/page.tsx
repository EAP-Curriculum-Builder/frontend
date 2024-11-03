"use client"

import { useState, useEffect, ChangeEvent, FocusEvent } from 'react';
import "../styles/loginStyles.css";
import { redirect } from 'next/navigation';

// encryption and validation
import { encryptDataWithOAEP } from '@/utils/encryption';
import { fetchPublicKeyAndCSRF, registerUserThroughFirebase, loginThroughFirebase, submitEncryptedLogin, submitEncryptedRegistration } from '@/api/auth';
import useValidation from '../hooks/useValidation';


interface RegistrationFormData {
    fullname: string;
    regUsername: string;
    email: string;
    regPassword: string;
    confirmPassword: string
}

interface LoginFormData {
    email: string;
    password: string;
}

export default function LoginPage() {

    // Get the public key from the server
    // to prepare encryption of user data
    useEffect(() => {
        const fetchAndSetPublicKey = async() => {
           const fetchedPublicKey = await fetchPublicKeyAndCSRF();
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
        email: '',
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
        setLoginFormData({email: '', password: ''});
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
        
        // Send to firebase for login
        const { token, uid } = await loginThroughFirebase (
            loginFormData.email,
            loginFormData.password
        );

        const encryptedUID = await encryptDataWithOAEP(publicKey, uid);
        const encryptedData = { uid: encryptedUID };
        const result = await submitEncryptedLogin(encryptedData, token);

        if (result === true) {
            localStorage.setItem("isLoggedIn", "");
            redirect("/home");
        }
    };

    // Handle registration
    const handleUserRegistration = async () => {
        
        // Send to firebase for registration
        const { token, uid } = await registerUserThroughFirebase(
            registrationFormData.email,
            registrationFormData.regPassword,
            registrationFormData.regUsername
        );

        const encryptedFullname = await encryptDataWithOAEP(publicKey, registrationFormData.fullname);
        const encryptedUsername = await encryptDataWithOAEP(publicKey, registrationFormData.regUsername);
        const encryptedUID = await encryptDataWithOAEP(publicKey, uid);
        const encryptedData = { fullname: encryptedFullname, username: encryptedUsername, uid: encryptedUID };
        const result = await submitEncryptedRegistration(encryptedData, token);

        if (result === true) {
            localStorage.setItem("isLoggedIn", "");
            redirect("/home");
        }
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
                                <label className="input-label">Email</label>
                                <input 
                                    className="input-field"
                                    type="email"
                                    name="email"
                                    value={loginFormData.email}
                                    onChange={handleLoginChange}
                                    onBlur={handleLoginBlur} 
                                />
                                {loginErrors.email && <span className="error-message">{loginErrors.email}</span>}
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