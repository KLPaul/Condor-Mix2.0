import axios from "axios"
import { env } from "../env/entorno"

export class ApiService{

    async post<T>(url : String , t: any) : Promise<T>{
     
        const response = await axios.post<T>(env.urlApi+url,t)
        return response.data
    }

}
export const api = new ApiService();