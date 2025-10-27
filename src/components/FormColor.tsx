import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'

export interface Color {
    name: string
    tipo: string
    base: string
    calidad: string
    cantidad: number
}

interface FormColorProps {
    onSubmit: (color: Color) => void
}

interface SearchResult {
    id: string
    name: string
    brandKey?: string
    colorNumber?: string
    // Agrega más propiedades según la respuesta de la API
}

export default function FormColor({ onSubmit }: FormColorProps) {
    const [name, setName] = useState<string>('')
    const [tipo, setTipo] = useState<string>('')
    const [base, setBase] = useState<string>('')
    const [calidad, setCalidad] = useState<string>('')
    const [cantidad, setCantidad] = useState<number>(0)
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const [isSearching, setIsSearching] = useState<boolean>(false)

    // Efecto para realizar la búsqueda cuando cambia el nombre
    useEffect(() => {
        const searchColors = async () => {
            if (name.length < 2) {
                setSearchResults([])
                return
            }

            setIsSearching(true)
            try {
                const response = await fetch(
                    `https://api.sherwin-williams.com/prism/v1/search/condor?query=${encodeURIComponent(name)}&lng=es-EC&_corev=6.1.0`
                )
                
                if (response.ok) {
                    const data = await response.json()
                    // Ajusta esta línea según la estructura real de la API
                    const results = data.results || data.colors || data.data || []
                    setSearchResults(results)
                } else {
                    console.error('Error en la búsqueda:', response.status)
                    setSearchResults([])
                }
            } catch (error) {
                console.error('Error al buscar colores:', error)
                setSearchResults([])
            } finally {
                setIsSearching(false)
            }
        }

        // Debounce para evitar muchas llamadas a la API
        const timeoutId = setTimeout(searchColors, 300)
        return () => clearTimeout(timeoutId)
    }, [name])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit({ name, tipo, base, calidad, cantidad })
        setName('')
        setTipo('')
        setBase('')
        setCalidad('')
        setCantidad(0)
        setSearchResults([])
    }

    const handleResultClick = (result: SearchResult) => {
        setName(result.name)
        setSearchResults([])
    }

    // Función para mostrar la información del resultado
    const getResultDisplayText = (result: SearchResult) => {
        let displayText = result.name
        if (result.brandKey) {
            displayText += ` | Brand: ${result.brandKey}`
        }
        if (result.colorNumber) {
            displayText += ` | Código: ${result.colorNumber}`
        }
        return displayText
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
                    Registro — Color
                </h2>

                <div className="flex flex-col gap-1 relative">
                    <label className="text-sm font-semibold text-gray-800">
                        Nombre del Color:
                    </label>
                    <input
                        type="text"
                        placeholder="Ingrese el nombre del color, brand key o número de color"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        required
                    />
                    
                    {/* Resultados de búsqueda */}
                    {searchResults.length > 0 && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-10">
                            {searchResults.map((result) => (
                                <div
                                    key={result.id}
                                    className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
                                    onClick={() => handleResultClick(result)}
                                >
                                    <div className="font-medium text-gray-800">
                                        {result.name}
                                    </div>
                                    {(result.brandKey || result.colorNumber) && (
                                        <div className="text-xs text-gray-600 mt-1">
                                            {result.brandKey && (
                                                <span className="mr-3">
                                                    <strong>Brand:</strong> {result.brandKey}
                                                </span>
                                            )}
                                            {result.colorNumber && (
                                                <span>
                                                    <strong>Código:</strong> {result.colorNumber}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {/* Loading indicator */}
                    {isSearching && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 p-3">
                            <div className="text-gray-600 text-sm">Buscando colores...</div>
                        </div>
                    )}
                    
                    {/* Información sobre la búsqueda */}
                    <div className="text-xs text-gray-500 mt-1">
                        Puedes buscar por nombre, brand key o número de color
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-800">
                        Tipo:
                    </label>
                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        required
                    >
                        <option value="">Seleccione un tipo</option>
                        <option value="Satinado">Satinado</option>
                        <option value="Mate">Mate</option>
                        <option value="Elastomerico">Elastomerico</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-800">
                        Base:
                    </label>
                    <select
                        value={base}
                        onChange={(e) => setBase(e.target.value)}
                        className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        required
                    >
                        <option value="">Seleccione una base</option>
                        <option value="Base BP">Base BP</option>
                        <option value="Base EP">Base EP</option>
                        <option value="Base I">Base I</option>
                        <option value="Base UI">Base UI</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-800">
                        Calidad:
                    </label>
                    <select
                        value={calidad}
                        onChange={(e) => setCalidad(e.target.value)}
                        className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        required
                    >
                        <option value="">Seleccione una calidad</option>
                        <option value="LVA">LVA</option>
                        <option value="Versatyl">Versatyl</option>
                        <option value="Permalatex">Permalatex</option>
                        <option value="Super Corona">Super Corona</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-800">
                        Cantidad:
                    </label>
                    <div className="flex gap-4">
                        {[
                            { value: 1, unit: 'L' },
                            { value: 1, unit: 'G' },
                            { value: 5, unit: 'G' }
                        ].map((option) => (
                            <label key={`${option.value}${option.unit}`} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="cantidad"
                                    value={option.value}
                                    checked={cantidad === option.value}
                                    onChange={(e) => setCantidad(Number(e.target.value))}
                                    className="text-red-600 focus:ring-red-500"
                                    required
                                />
                                <span>{option.value}{option.unit}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition-colors"
                >
                    Registrar Color
                </button>
            </form>
        </div>
    )
}