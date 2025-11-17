import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useState } from 'react'
import type { FormEvent } from 'react'

export interface Person {
    name: string
    cedula: string
    option: string
}

interface FormPersonProps {
    onSubmit: (person: Person) => void
}

export default function FormPerson({ onSubmit }: FormPersonProps) {
    const [name, setName] = useState<string>('')
    const [cedula, setCedula] = useState<string>('')
    const [option, setOption] = useState<string>('registrar')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit({ name, cedula , option})
        setName('')
        setCedula('')
    }

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
                        required={option==="registrar"}
                    />
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
                        required={option==="registrar"}
                    />
                </div>

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