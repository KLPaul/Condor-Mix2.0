import axios from "axios";
import { Client } from "../models/client";
import { env } from "../env/entorno";

export const saveClient = async (client: Client): Promise<Client> => {


    try {

        console.log("cliente enviar ", client)
        const response = await axios.post<Client>(env.urlApi + `/api/personas/register`, client)
      
        console.log(response.data)

        return response.data

    } catch (error) {

        console.log("error al registrar")
        return new Client

    }


}