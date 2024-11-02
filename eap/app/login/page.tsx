"use client"

import { useState, useEffect } from 'react';
import "../styles/loginStyles.css";

import { encryptDataWithOAEP } from '@/utils/encryption';
import { fetchPublicKey, submitEncryptedLogin, submitEncryptedRegistration } from '@/api/auth';

export default function LoginPage() {
    const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
    const [publicKey, setPublicKey] = useState<string>("");
    
    // States for logging in
    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // States for registration
    const [fullname, setFullname] = useState<string>("");
    const [regUsername, setRegUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [regPassword, setRegPassword] = useState<string>("");
    const [regConfirmPassword, setRegConfirmPassword] = useState<string>("");

    // Get the public key from the server
    // to prepare encryption of user data
    useEffect(() => {
         const fetchAndSetPublicKey = async() => {
            const fetchedPublicKey = await fetchPublicKey();
            setPublicKey(fetchedPublicKey);
         };
         fetchAndSetPublicKey();
    }, []);

    const handleToggleLoginMode = () => {
        setIsLoginMode(!isLoginMode);
    };

    // Handle logging in
    const handleUserLogin = async () => {
        // Validate username and password first

        const encryptedUsername = await encryptDataWithOAEP(publicKey, username);
        const encryptedPassword = await encryptDataWithOAEP(publicKey, password);
        const encryptedData = {username: encryptedUsername, password: encryptedPassword};
        const result = await submitEncryptedLogin(encryptedData);
    };

    // Handle registration
    const handleUserRegistration = async () => {
        // Validate username and password first

        const encryptedFullname = await encryptDataWithOAEP(publicKey, fullname);
        const encryptedEmail = await encryptDataWithOAEP(publicKey, email);
        const encryptedUsername = await encryptDataWithOAEP(publicKey, regUsername);
        const encryptedPassword = await encryptDataWithOAEP(publicKey, regPassword);
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
                                <input className="input-field" type="text" onChange={e => setUserName(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="input-label">Password</label>
                                <input className="input-field" type="password" onChange={e => setPassword(e.target.value)} />
                            </div>
                            <button className="login-button" type="button" onClick={handleUserLogin}>Login</button>
                            <button className="move-to-register-button" type="button" onClick={handleToggleLoginMode}>Register new user</button>
                        </div>
                    ) : (
                        <div>
                            <div className="mb-4">
                                <label className="input-label">Full Name</label>
                                <input className="input-field" type="text" onChange={e => setFullname(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="input-label">Choose a username</label>
                                <input className="input-field" type="text" onChange={e => setRegUsername(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="input-label">Input your email</label>
                                <input className="input-field" type="email" onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="input-label">Set a password</label>
                                <input className="input-field" type="password" onChange={e => setRegPassword(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="input-label">Confirm password</label>
                                <input className="input-field" type="password" onChange={e => setRegConfirmPassword(e.target.value)} />
                            </div>
                            <button className="register-button" type="button" onClick={handleUserRegistration}>Register</button>
                            <button className="move-to-login-button" type="button" onClick={handleToggleLoginMode}>Return to login</button>
                        </div>

                    )
                }
            </form>
        </div>
    )
}


// An example of a public key
    /**
     * const publicKey = `
    -----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDHt53IcWl/2MUm4jW5b4DMe6k6
ZN/zEcqQmPBpkz1IEEJTqnpeZ8LzWdK2QBLhxUjr2hENvY8+o0lvuBLdtljpU/GC
1sKXZmsDPd0m5elet90uB2LeN9EH2VmywT+Jx0+Nwk1u2ibx2YLd7kHvbTOb2nHG
YRLAx06Gi6Zq1ixQ2wIDAQAB
-----END PUBLIC KEY-----
    `;
     */