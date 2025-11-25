import axios from "axios";
import { env } from "./entorno";

export const axiosInstance = axios.create({
    baseURL: env.urlApi,
    timeout: 10000,
})

axiosInstance.interceptors.response.use(
    response =>{
        //error de la api estructurado
        if(response.data && response.data.succes === false){
            return Promise.reject(new Error(response.data.message || "Error Desconocido validación"))
        }
        return response
    },
    error=>{
        //error de la red sin conexion etc o baja del servidor
        return Promise.reject(
         
            error.response?.data?.message || error.message || "Error desconocido back"
            
        )
    }
)