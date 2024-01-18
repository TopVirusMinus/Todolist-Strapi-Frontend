import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axios.config";
import { AxiosRequestConfig } from "axios";

interface IQueryCustom{
    queryKey:string[]
    url:string
    config?:AxiosRequestConfig 
}

const useQueryCustom = ({queryKey, url, config}:IQueryCustom) => {
    return useQuery({
        queryKey,
        queryFn: async () =>{
          const res = await axiosInstance.get(url, config)
          return res.data?.todos
        }
    })
}

export default useQueryCustom;