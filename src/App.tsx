import { useState, useEffect } from 'react'
import FormPerson from './components/FormPerson'
import FormColor, { type Color } from './components/FormColor'
import type { Person } from './components/FormPerson'
import CollapsibleTable from './components/Table'
import { api } from './services/ApiService'
import { Colores } from './models/colores'
import { Client } from './models/client'
import { PerColor } from './models/perColor'

function App() {
  const [activeTab, setActiveTab] = useState<'inicio' | 'busqueda'>('inicio')

  const [fade, setFade] = useState(true)
  const [client, setClient] = useState<Client>()
  const [colores, setColores] = useState<Colores>()

  //service persona   
  const addPerson = async (person: Person) => {

    switch (person.option) {
      case "registrar":
        // 013 revisar la data para registrar al usuario es decir si guardar cedula y nombre o solo alguno de los 2
        const p = new Client()
        p.cedula = person.cedula
        p.nombre = person.name
        const response = await api.post<Client>("api/personas/register", p)
        procesClient(response)

        break;

      default:
        break;
    }
  }

  const procesClient = (client: Client) => {
    setClient(client)
  }

  const addColor = async (color: Color) => {

    const allData = Object.values(color).every(value => value.trim() !== "")

    if (allData) {
      const col = new Colores()
      col.codigo = color.code
      col.name = color.name
      col.idBase = parseInt(color.base)
      col.idCantidad = parseInt(color.cantidad)
      col.idMarca = parseInt(color.calidad)
      col.idTipo = parseInt(color.tipo)

      const response = await api.post<Colores>("api/color/register", col)

      setColores(response)

      await addPerColor(response.idColor)
    }

  }

  const addPerColor = async (idColor: number) => {

    if (idColor && client && client.id) {
      console.log("registrar color")
      const tem = new PerColor()
      tem.colorId = idColor
      tem.personaId = client.id

      await api.post<PerColor>("api/percolor/register", tem)

      const nuevo = { ...client };
      setClient(nuevo);
      
    }

  }

  // Transición suave al cambiar de pestaña
  const handleTabChange = (tab: 'inicio' | 'busqueda') => {
    setFade(false)
    setTimeout(() => {
      setActiveTab(tab)
      setFade(true)
    }, 200)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 overflow-hidden transition-all duration-500 ease-in-out">
      <div className="w-full px-10">
        {/* NAVBAR */}
        <nav className="flex items-center gap-12 mb-8">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/src/assets/logo-condor.png"
              alt="Condor Mix Logo"
              className="w-32"
            />
          </div>

          {/* Menú */}
          <div className="flex items-center gap-10">
            <button
              onClick={() => handleTabChange('inicio')}
              className={`relative text-lg font-medium transition-all duration-300 ${activeTab === 'inicio'
                ? 'text-black'
                : 'text-gray-600 hover:text-black'
                }`}
            >
              Inicio
              {activeTab === 'inicio' && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-red-600"></span>
              )}
            </button>

            <button
              onClick={() => handleTabChange('busqueda')}
              className={`relative text-lg font-medium transition-all duration-300 ${activeTab === 'busqueda'
                ? 'text-black'
                : 'text-gray-600 hover:text-black'
                }`}
            >
              Búsqueda
              {activeTab === 'busqueda' && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-red-600"></span>
              )}
            </button>
          </div>
        </nav>

        {/* Contenido dinámico con efecto */}
        <div
          className={`transition-all duration-500 ease-in-out transform ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
        >
          {activeTab === 'inicio' ? (
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Columna izquierda: formularios */}
              <div className="flex flex-col gap-6 w-full lg:w-1/2">
                <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Datos de la Persona</h2>
                  <FormPerson onSubmit={addPerson} sendPerson={procesClient} />
                </div>

                <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Agregar Color</h2>
                  <FormColor onSubmit={addColor} />
                </div>
              </div>

              {/* Columna derecha: tabla */}
              <div className="w-full lg:w-1/2">
                <CollapsibleTable client={client} />
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-700 text-lg mt-20">
              Aquí irá el módulo de búsqueda 🔍
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default App