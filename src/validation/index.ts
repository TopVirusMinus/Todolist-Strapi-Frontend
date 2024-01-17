import * as yup from 'yup';

export const registerSchema = yup.object({
    username: yup.string().required('Username is required').min(5, 'Username should be at least 5 characters'),
    email: yup.string().required('Email Address is Required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Email should be in this format example@gmail.com'),
    password: yup.string().required('Password is required').min(6, 'Password should be at least 6 characters'),
})