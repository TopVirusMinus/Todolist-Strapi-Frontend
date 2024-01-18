import { yupResolver } from "@hookform/resolvers/yup";
import InputErrorMessage from "../components/InputErrorMessage";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { LOGIN_FIELDS } from "../data";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { IAxiosError } from "../interfaces";
import toast from "react-hot-toast";
import axiosInstance from "../config/axios.config";
import { loginSchema } from "../validation";

const LoginPage = () => {
  type Inputs = {
    identifier: string;
    password: string;
  };
                                                                                                                            
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({resolver: yupResolver(loginSchema)});
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async(data) =>{
    setIsLoading(true);
    try{
      const {status, data: resData} = await axiosInstance.post('/auth/local/', data);
      console.log(data)
      console.log(resData);
      localStorage.setItem('loggedInUserInfo', JSON.stringify(resData));
      status === 200 && toast.success("Login Successful you will be redirected to home page");
      setTimeout(()=>{
        location.replace('/')
      }, 500)
      console.log(status);
    }
    catch(e){
      const errorMsg = e as AxiosError<IAxiosError>
      toast.error(`${errorMsg.response?.data.error.message}`);
      console.log(e);
    }
    finally{{
      setIsLoading(false);
    }}
      
  };

  const loginData = LOGIN_FIELDS.map((field, idx)=>{
    return (
      <div key={idx}>
        <Input
          placeholder={field.placeholder}
          type={field.type}
          {...register(field.name, {
            required: field.validation.required,
            minLength: field.validation.minLength,
          })}
          />
        <InputErrorMessage msg={errors[field.name]?.message} />
        </div>
    )
  })

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">Login to get access!</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {loginData}
        <Button isLoading={isLoading}  fullWidth>  
        Login
        </Button>      
      </form>
    </div>
  );
};

export default LoginPage;
