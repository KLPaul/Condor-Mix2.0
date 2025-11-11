import { useState, useEffect } from 'react'
import FormPerson from './components/FormPerson'
import FormColor from './components/FormColor'
import type { Person } from './components/FormPerson'
import type { Color } from './components/FormColor'
import { Client } from './models/client'
import { saveClient } from './services/SaveClient'

function App() {
  const [activeTab, setActiveTab] = useState<'inicio' | 'busqueda'>('inicio')
  const [people, setPeople] = useState<Person[]>([])
  const [colors, setColors] = useState<Color[]>([])
  const [fade, setFade] = useState(true)

  const addPerson = (person: Person) => {
    setPeople([...people, person])
    const client : Client = new Client()
    client.cedula= person.cedula
    client.nombre= person.name

    console.log(client)
    const response = saveClient(client)
    console.log("response principal", response)
  }

  const addColor = (color: Color) => {
    setColors([...colors, color])
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
              className={`relative text-lg font-medium transition-all duration-300 ${
                activeTab === 'inicio'
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
              className={`relative text-lg font-medium transition-all duration-300 ${
                activeTab === 'busqueda'
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
          className={`transition-all duration-500 ease-in-out transform ${
            fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          {activeTab === 'inicio' ? (
            <div className="space-y-15
            "> 
              <FormPerson onSubmit={addPerson} />
              <FormColor onSubmit={addColor} />
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