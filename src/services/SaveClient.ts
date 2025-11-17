import axios from "axios";
import { Client } from "../models/client";
import { env } from "../env/entorno";

export const saveClient = async (client: Client): Promise<Client> => {


    try {

        const response = await axios.post<Client>(env.urlApi + `/api/personas/register`, client)
 
        return response.data

    } catch (error) {

        // 011
        console.log("error al registrar")
        return new Client

    }


}