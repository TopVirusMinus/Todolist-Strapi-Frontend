export interface IRegisterFields{
    name: 'username' | 'email' | 'password';
    type: 'text' | 'email' | 'password';
    placeholder: string;
    validation:{
        required?: boolean;
        minLength?: number;
        matches?: RegExp;
    }
}

export interface IAxiosError{
    error: {
        message: string;
    }
}
