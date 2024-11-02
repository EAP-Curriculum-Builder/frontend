import { useState } from 'react';

interface Errors {
    fullname?: string;
    regUsername?: string;
    email?: string;
    regPassword?: string;
    confirmPassword?: string;
}

interface LoginErrors {
    username?: string;
    password?: string;
}

type RegistrationFieldName = 'fullname' | 'regUsername' | 'email' | 'regPassword' | 'confirmPassword';
type LoginFieldName = 'username' | 'password';

interface AdditionalValues {
    regPassword?: string;
}

const useValidation = (initialErrors: Errors = {}, initialLoginErrors: LoginErrors = {}) => {
    const [errors, setErrors] = useState<Errors>(initialErrors);
    const [loginErrors, setLoginErrors] = useState<LoginErrors>(initialLoginErrors);

    const validateRegistrationField = (name: RegistrationFieldName, value: string, additionalValues: AdditionalValues = {}) => {
        const newErrors: Errors = { ...errors };

        switch (name) {
            case 'fullname':
                if (!value.trim()) {
                    newErrors.fullname = "Your name is required";
                } else if (value.trim().length < 6) {
                    newErrors.fullname = "Your name must be 6 or more characters long";
                } else {
                    delete newErrors.fullname;
                }
                break;
            case 'regUsername':
                if (!value.trim()) {
                    newErrors.regUsername = "Username is required";
                } else if (value.trim().length < 6) {
                    newErrors.regUsername = "Username must be 6 characters or more";
                } else {
                    delete newErrors.regUsername;
                }
                break;
            case 'email':
                if (!value.trim()) {
                    newErrors.email = 'Email is required';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    newErrors.email = 'Email is invalid';
                } else {
                    delete newErrors.email;
                }
                break;
            case 'regPassword':
                if (!value.trim()) {
                    newErrors.regPassword = "Password is required";
                } else if (value.length < 6) {
                    newErrors.regPassword = "Password must be at least 6 characters";
                } else if (/\s/.test(value)) {
                    newErrors.regPassword = "Password must not contain a space";
                } else if (!/\d/.test(value)) {
                    newErrors.regPassword = "Password must contain at least one number";
                } else if (!/[A-Z]/.test(value)) {
                    newErrors.regPassword = "Password must contain at least one upper case letter";
                } else if (!/[a-z]/.test(value)) {
                    newErrors.regPassword = "Password must contain at least one lower case letter";
                } else if (!/[!@#$%&_~`|]/.test(value)) {
                    newErrors.regPassword = "Password must contain at least one of these special characters !@#$%&_~|`";
                } else {
                    delete newErrors.regPassword;
                }
                break;
            case 'confirmPassword':
                if (!value.trim()) {
                    newErrors.confirmPassword = "Matching confirmation of password is required";
                } else if (value !== additionalValues.regPassword) {
                    newErrors.confirmPassword = "The confirmation must match the original password"
                } else {
                    delete newErrors.confirmPassword;
                }
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const validateLoginField = (name: LoginFieldName, value: string) => {
        const newLoginErrors: LoginErrors = { ...loginErrors };

        switch (name) {
            case 'username':
                if (!value.trim()) {
                    newLoginErrors.username = "Username is required";
                } else if (value.trim().length < 6) {
                    newLoginErrors.username = "Username must be 6 characters or more";
                } else {
                    delete newLoginErrors.username;
                }
                break;
            case 'password':
                if (!value.trim()) {
                    newLoginErrors.password = "Password is required";
                } else if (value.length < 6) {
                    newLoginErrors.password = "Password must be at least 6 characters";
                } else if (/\s/.test(value)) {
                    newLoginErrors.password = "Password must not contain a space";
                } else if (!/\d/.test(value)) {
                    newLoginErrors.password = "Password must contain at least one number";
                } else if (!/[A-Z]/.test(value)) {
                    newLoginErrors.password = "Password must contain at least one upper case letter";
                } else if (!/[a-z]/.test(value)) {
                    newLoginErrors.password = "Password must contain at least one lower case letter";
                } else if (!/[!@#$%&_~`|]/.test(value)) {
                    newLoginErrors.password = "Password must contain at least one of these special characters !@#$%&_~|`";
                } else {
                    delete newLoginErrors.password;
                }
                break;
            default:
                break;
        }
        setLoginErrors(newLoginErrors);
    }

    const resetErrors = () => {
        setErrors({});
        setLoginErrors({});
    }

    return { errors, loginErrors, validateRegistrationField, validateLoginField, resetErrors };
};

export default useValidation;