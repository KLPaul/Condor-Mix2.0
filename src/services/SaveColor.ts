import axios from "axios"
import { env } from "../env/entorno"

export const saveObject = async (t : any) : Promise<any> => {

    try{

        const response = await axios.post<any>(env.urlApi+"/test", t)

    }catch(error){

        return null

    }
}


