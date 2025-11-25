import { axiosInstance } from "../env/axiosConfig"

export class ApiService{

    async post<T>(url : string , t: any) : Promise<T>{
     
        const response = await axiosInstance.post<T>(url,t)
        return response.data
    }

    async getSearchParam<T>(url : string , param:any) : Promise<T>{
        const response = await axiosInstance.get<T>(url+`${param}`)

        return response.data
    }


    async getSearchPathVariable<T>(url : string , param:number) : Promise<T>{
        const response = await axiosInstance.get<T>(url+`${param}`)

        return response.data
    }
    

}

// 013 ver si se agregar un interceptor de errores general para despues
export const api = new ApiService();