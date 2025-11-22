import { Autocomplete, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Client } from '../models/client'
import { api, ApiService } from '../services/ApiService'

export interface Person {
    name: string
    cedula: string
    option: string
}

interface FormPersonProps {
    onSubmit: (person: Person) => void

    sendPerson: (client: Client) => void
}


export default function FormPerson({ onSubmit, sendPerson }: FormPersonProps) {
    const [name, setName] = useState<string>('')
    const [cedula, setCedula] = useState<string>('')
    const [option, setOption] = useState<string>('registrar')
    const [param, setParam] = useState<string>('')
    const [clients, setClients] = useState<Client[]>([])
    const [isSearch, setIsSearch] = useState<boolean>(true)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit({ name, cedula, option })
        setName('')
        setCedula('')
    }

    useEffect(() => {

        const searchClient = async () => {
            if (param.length > 2) {
                try {
                    const response = await api.getSearchParam("api/personas/search?param=", param)
                    setClients(response as Client[])

                    if (clients.length === 0) setIsSearch(false)
                } catch (error) {
                    console.error(error)
                    alert("error backEnd")
                }
            } else {
                setIsSearch(true)
            }
        }

        const timeApiCall = setTimeout(searchClient, 400)
        return () => clearTimeout(timeApiCall)

    }, [param])

    return (
        <div className="bg-white border border-red-600 rounded-xl shadow-md flex w-full max-w-2xl overflow-hidden">
            {/* Franja lateral roja */}
            <div className="bg-red-600 w-2 rounded-r-[2rem]"></div>

            {/* Contenido del formulario */}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 p-4 w-full"
            >
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    Persona
                </h2>
                <div>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-form-control-label-placement"
                            name="position"
                            value={option}
                            onChange={(e) => setOption(e.target.value)}
                        >
                            <FormControlLabel
                                value="registrar"
                                control={<Radio />}
                                label="Registrar"

                            />

                            <FormControlLabel
                                value="buscar"
                                control={<Radio />}
                                label="Buscar"
                            />

                        </RadioGroup>
                    </FormControl>
                </div>
                {option === "registrar" && (<>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-800">
                            Cédula:
                        </label>
                        <input
                            type="text"
                            placeholder="Ingrese su cédula"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            required={option === "registrar"} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-800">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            placeholder="Ingrese su nombre completo"
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)}
                            className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            required={option === "registrar"} />
                    </div></>
                )}
                {option === "buscar" && (
                    <Autocomplete
                        getOptionLabel={(object => `${object.nombre} ${object.cedula}`)}
                        onChange={(_event, value) => {
                            if (value) {
                              
                                sendPerson(value)

                            }else{
                                sendPerson(new Client())
                          
                            }

                        }}
                        onInputChange={(event, newInputValue, reason) => {
                            if (reason === "input") {
                                setParam(newInputValue);
                            }
                        }}
                        options={clients}
                        noOptionsText={isSearch ? "Buscando" : "Sin resultados"}
                        sx={{ width: '75%' }}
                        renderInput={(params) => <TextField {...params} label="Nombre o cédula" />}
                    />
                )}


                <button
                    type="submit"
                    className="mt-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition-colors"
                >
                    Aceptar
                </button>

            </form>
        </div>
    )
}