import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    });

    const registerHandler = async (data) => {
        setLoader(true);
        try {
            const { data: response } = await api.post(
                '/api/auth/public/register',
                data
            );
            toast.success('Registration Successful!');
            reset();
            navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error('Registration Failed!');
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="register-page-container">
            <form onSubmit={handleSubmit(registerHandler)} className="register-form">
                <h1 className="register-heading">Register Here</h1>
                <hr className="divider" />
                <div className="form-fields">
                    <TextField
                        label="UserName"
                        required
                        id="username"
                        type="text"
                        message="*Username is required"
                        placeholder="Type your username"
                        register={register}
                        errors={errors}
                    />
                    <TextField
                        label="Email"
                        required
                        id="email"
                        type="email"
                        message="*Email is required"
                        placeholder="Type your email"
                        register={register}
                        errors={errors}
                    />
                    <TextField
                        label="Password"
                        required
                        id="password"
                        type="password"
                        message="*Password is required"
                        placeholder="Type your password"
                        register={register}
                        min={6}
                        errors={errors}
                    />
                </div>
                <button disabled={loader} type="submit" className="register-button">
                    {loader ? 'Loading...' : 'Register'}
                </button>
                <p className="login-link">
                    Already have an account?{' '}
                    <Link className="link" to="/login">
                        <span className="link-text">Login</span>
                    </Link>
                </p>
            </form>
            <style>
                {`
                .register-page-container {
                    min-height: calc(100vh - 64px);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #f8fafc;
                }
                .register-form {
                    width: 450px;
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
                    padding: 2rem;
                    border-radius: 0.375rem;
                    background-color: white;
                }
                .register-heading {
                    text-align: center;
                    font-family: serif;
                    color: #3364F7;
                    font-weight: bold;
                    font-size: 1.875rem;
                }
                .divider {
                    margin-top: 0.5rem;
                    margin-bottom: 1.25rem;
                    border-top: 1px solid #e2e8f0;
                }
                .form-fields {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                .register-button {
                    background: linear-gradient(to right, #3b82f6, #9333ea);
                    font-weight: 600;
                    color: white;
                    width: 100%;
                    padding: 0.5rem 0.75rem;
                    border-radius: 0.25rem;
                    margin: 0.75rem 0;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .register-button:hover {
                    opacity: 0.9;
                }
                .login-link {
                    text-align: center;
                    font-size: 0.875rem;
                    color: #4b5563;
                    margin-top: 1.5rem;
                }
                .link {
                    font-weight: 600;
                    text-decoration: underline;
                    color: #3364F7;
                }
                .link:hover {
                    color: #2a5bd7;
                }
                @media (max-width: 640px) {
                    .register-form {
                        width: 360px;
                        padding: 1rem;
                    }
                }
                `}
            </style>
        </div>
    );
};

export default RegisterPage;