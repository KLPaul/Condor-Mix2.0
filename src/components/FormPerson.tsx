import { useState } from 'react'
import type { FormEvent } from 'react'

export interface Person {
    name: string
    email: string
}

interface FormPersonProps {
    onSubmit: (person: Person) => void
}

export default function FormPerson({ onSubmit }: FormPersonProps) {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit({ name, email })
        setName('')
        setEmail('')
    }

    return (
        <div className="bg-white border border-red-600 rounded-xl shadow-md flex w-full max-w-2xl overflow-hidden">
            {/* Franja lateral roja */}
            <div className="bg-red-600 w-20 rounded-r-[2rem]"></div>

            {/* Contenido del formulario */}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 p-4 w-full"
            >
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    Registro — Persona
                </h2>

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
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-800">
                        Nombre:
                    </label>
                    <input
                        type="text"
                        placeholder="Ingrese su nombre completo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        required
                    />
                </div>


            </form>
        </div>
    )
}