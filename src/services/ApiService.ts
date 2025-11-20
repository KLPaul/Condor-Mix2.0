import axios from "axios"
import { env } from "../env/entorno"

export class ApiService{

    async post<T>(url : String , t: any) : Promise<T>{
     
        const response = await axios.post<T>(env.urlApi+url,t)
        return response.data
    }

}

// 013 ver si se agregar un interceptor de errores general para despues
export const api = new ApiService();