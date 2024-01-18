import { ILoginFields, IRegisterFields } from "../interfaces"

export const REGISTER_FIELDS:IRegisterFields[] = [
    {
        name: 'username',
        type: 'text',
        placeholder: 'Enter your username',
        validation:{
            required: true,
            minLength: 5
        }
    },
    {
        name: 'email',
        type: 'email',
        placeholder: 'Enter your email',
        validation:{
            required: true,
            matches: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        }
    },
    {
        name: 'password',
        type: 'password',
        placeholder: 'Enter your password',
        validation:{
            required: true,
            minLength: 6
        }
    },
]

export const LOGIN_FIELDS:ILoginFields[] = [
    {
        name: 'identifier',
        type: 'email',
        placeholder: 'Enter your email',
        validation:{
            required: true,
            matches: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        }
    },
    {
        name: 'password',
        type: 'password',
        placeholder: 'Enter your password',
        validation:{
            required: true,
            minLength: 6
        }
    },
]