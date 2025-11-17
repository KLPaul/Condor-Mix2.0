import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import type { Bases } from '../models/bases'
import { Marcas } from '../models/marcas'
import type { Tipo } from '../models/tipo'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import type { Cantidad } from '../models/cantidad'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import type { Colores } from '../models/colores'


interface FormColorProps {
    onSubmit: (color: Color) => void
}

export interface Color {
    name: string
    code: string
    tipo: string
    base: string
    calidad: string
    cantidad: string
}

interface SearchResult {
    id: string
    name: string
    brandKey?: string
    colorNumber?: string
    // Agrega más propiedades según la respuesta de la API
}

export default function FormColor({ onSubmit }: FormColorProps) {

    const [bases, setBases] = useState<Bases[]>([])
    const [marcas, setMarcas] = useState<Marcas[]>([])
    const [tipoTem, setiposTem] = useState<Tipo[]>([])
    const [cantidades, setCantidades] = useState<Cantidad[]>([])

    //temporal del useefect cargar datos pintura 
    const basesList: Bases[] = [
        { id: 1, nombre: "Base BP" },
        { id: 2, nombre: "Base EP" },
        { id: 3, nombre: "Base I" },
        { id: 4, nombre: "Base UI" },
    ];

    const tipoList: Tipo[] = [
        { id: 1, nombre: "Satinado" },
        { id: 2, nombre: "Mate" },
        { id: 3, nombre: "Elastomerico" },
    ];

    const marcaList: Tipo[] = [
        { id: 1, nombre: "LVA" },
        { id: 2, nombre: "Versatyl" },
        { id: 3, nombre: "Permalatex" },
        { id: 4, nombre: "Super Corona" },
    ];

    const cantiList: Cantidad[] = [
        { id: 1, nombre: "1 L" },
        { id: 2, nombre: "1 G" },
        { id: 3, nombre: "5 G" },
    ];


    useEffect(() => {

        setBases(basesList)
        setiposTem(tipoList)
        setMarcas(marcaList)
        setCantidades(cantiList)

        setTipo(tipoList[0].id.toString())
        setCalidad(marcaList[0].id.toString())
        setBase(basesList[0].id.toString())
        setCantidad(cantiList[0].id.toString())

    }, [])

    const [name, setName] = useState<string>('')
    const [code, setCode] = useState<string>('')
    const [tipo, setTipo] = useState<string>('')
    const [base, setBase] = useState<string>('')
    const [calidad, setCalidad] = useState<string>('')
    const [cantidad, setCantidad] = useState<string>('')
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
        onSubmit({ name, code, tipo, base, calidad, cantidad })
        setName('')
        setCode('')
        setTipo('1')
        setBase('1')
        setCalidad('1')
        setCantidad('1')
        setSearchResults([])
    }

    const handleResultClick = (result: SearchResult) => {
        // 012 agregar aqui para recuperar los 2 elementos nombre 
        setName(result.name)
        setCode(result.colorNumber?.toString() || "")
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
            <div className="bg-red-600 w-2 rounded-r-[2rem]"></div>

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
                    {searchResults.length > 0 && code.trim() === ""  && (
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
                    {isSearching && code.trim() === "" && (
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
                    <Select
                        value={tipo}
                        onChange={e => setTipo(String(e.target.value))}
                        sx={{
                            height: "35px"
                        }}
                        required
                    >

                        {tipoTem?.map((item, index) => (
                            <MenuItem key={index} value={item.id}>{item.nombre}</MenuItem>
                        ))}
                    </Select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-800">
                        Base:
                    </label>
                    <Select
                        value={base}
                        onChange={(e) => setBase(String(e.target.value))}
                        sx={{
                            height: "35px"
                        }}
                        required
                    >
                        {bases?.map((item, index) => (
                            <MenuItem key={index} value={item.id}>{item.nombre}</MenuItem>
                        ))}
                    </Select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-800">
                        Calidad:
                    </label>
                    <Select
                        value={calidad}
                        onChange={(e) => setCalidad(String(e.target.value))}
                        sx={{
                            height: "35px"
                        }}
                        required
                    >
                        {marcas?.map((item, index) => (
                            <MenuItem key={index} value={item.id}>{item.nombre}</MenuItem>
                        ))}
                    </Select>
                </div>

                <div className="flex flex-col gap-1">

                    <FormControl>
                        <label className="text-sm font-semibold text-gray-800">
                            Cantidad:
                        </label>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={cantidad}
                            onChange={(e)=> setCantidad(String(e.target.value))}
                        >   
                            {cantidades?.map((item) =>(
                                <FormControlLabel value={item.id} key={item.id} control={<Radio />} label={item.nombre}/>
                            ))}

                            
                        </RadioGroup>
                    </FormControl>
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