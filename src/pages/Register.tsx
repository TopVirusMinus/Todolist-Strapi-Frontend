import InputErrorMessage from "../components/InputErrorMessage";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";
import { REGISTER_FIELDS } from "../data";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({resolver: yupResolver(registerSchema)});
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async(data) =>{
    setIsLoading(true);
    console.log(data)
    try{
      const {status} = await axiosInstance.post('/auth/local/register', data);
      status === 200 && toast.success("Successfully Registered");
      console.log(status);
    }
    catch(e){
      toast.error("failed to register");
      console.log(e);
    }
    finally{{
      setIsLoading(false);
    }}
      
  };
  
  console.log(errors);


  const registerData = REGISTER_FIELDS.map((field, idx)=>{
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
  console.log(errors);
  
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {registerData}
      <Button isLoading={isLoading}  fullWidth>  
        Register
      </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
