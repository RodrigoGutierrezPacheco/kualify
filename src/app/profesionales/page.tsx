"use client"

import { useState } from "react"
import { Search, MapPin, Briefcase, Star, Filter } from "lucide-react"
import Image from "next/image"

export default function Profesionales() {
    const [filter, setFilter] = useState("")

    // Sample data - replace with your actual data
    const professionals = [
        {
            id: 1,
            name: "Ana Martínez",
            profession: "Médico General",
            rating: 4.8,
            reviews: 124,
            location: "Barcelona",
            image: "/placeholder.svg?height=100&width=100",
        },
        {
            id: 2,
            name: "Carlos Rodríguez",
            profession: "Electricista",
            rating: 4.6,
            reviews: 98,
            location: "Madrid",
            image: "/placeholder.svg?height=100&width=100",
        },
        {
            id: 3,
            name: "Elena Gómez",
            profession: "Abogada",
            rating: 4.9,
            reviews: 156,
            location: "Valencia",
            image: "/placeholder.svg?height=100&width=100",
        },
        {
            id: 4,
            name: "Miguel Fernández",
            profession: "Fontanero",
            rating: 4.7,
            reviews: 87,
            location: "Sevilla",
            image: "/placeholder.svg?height=100&width=100",
        },
        {
            id: 5,
            name: "Laura Sánchez",
            profession: "Diseñadora Gráfica",
            rating: 4.5,
            reviews: 112,
            location: "Bilbao",
            image: "/placeholder.svg?height=100&width=100",
        },
        {
            id: 6,
            name: "Javier López",
            profession: "Profesor Particular",
            rating: 4.8,
            reviews: 143,
            location: "Zaragoza",
            image: "/placeholder.svg?height=100&width=100",
        },
    ]

    const filteredProfessionals = professionals.filter(
        (pro) =>
            pro.name.toLowerCase().includes(filter.toLowerCase()) ||
            pro.profession.toLowerCase().includes(filter.toLowerCase()) ||
            pro.location.toLowerCase().includes(filter.toLowerCase()),
    )

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="bg-[#1e3a8a] text-white py-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Profesionales</h1>
                    <p className="text-xl max-w-3xl">
                        Encuentra profesionales calificados para todos tus servicios: médicos, trabajos del hogar y mucho más.
                    </p>

                    {/* Search bar - Improved version */}
                    <div className="mt-8 flex flex-col md:flex-row gap-4 max-w-4xl">
                        <div className="relative flex-grow">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Search className="h-5 w-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar por nombre, profesión o ubicación"
                                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 font-medium shadow-lg border-2 border-white/20 focus:border-[#10b981] focus:outline-none transition-all duration-200 bg-white"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                            {filter && (
                                <button
                                    onClick={() => setFilter("")}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    aria-label="Limpiar búsqueda"
                                >
                                    <span className="sr-only">Limpiar</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            )}
                        </div>
                        <button className="bg-[#10b981] hover:bg-[#0d9668] text-white font-medium py-4 px-6 rounded-xl flex items-center justify-center shadow-lg transition-all duration-200 whitespace-nowrap">
                            <Filter className="mr-2 h-5 w-5" />
                            Filtrar
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
                <div className="mb-8 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {filteredProfessionals.length} profesionales encontrados
                    </h2>
                    <div className="flex gap-2">
                        <select className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700">
                            <option>Ordenar por: Relevancia</option>
                            <option>Ordenar por: Calificación</option>
                            <option>Ordenar por: Nombre</option>
                        </select>
                    </div>
                </div>

                {/* Professionals grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProfessionals.map((pro) => (
                        <div
                            key={pro.id}
                            className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex items-start gap-4">
                                        <Image
                                            src={ "/placeholder.svg"}
                                            alt={``}
                                            width={80}
                                            height={80}
                                            className="rounded-full object-cover border-2 border-[#1e3a8a]"
                                            priority={false}
                                            quality={85}
                                            loading="lazy"

                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">{pro.name}</h3>
                                        <p className="text-[#1e3a8a] font-medium flex items-center">
                                            <Briefcase className="h-4 w-4 mr-1" />
                                            {pro.profession}
                                        </p>
                                        <p className="text-gray-600 flex items-center mt-1">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            {pro.location}
                                        </p>
                                        <div className="flex items-center mt-2">
                                            <div className="flex items-center text-yellow-500">
                                                <Star className="h-5 w-5 fill-current" />
                                                <span className="ml-1 font-medium">{pro.rating}</span>
                                            </div>
                                            <span className="text-gray-500 text-sm ml-2">({pro.reviews} reseñas)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex gap-3">
                                    <button className="flex-1 cursor-pointer bg-[#1e3a8a] hover:bg-[#15296b] text-white font-medium py-2 px-4 rounded-lg">
                                        Contactar
                                    </button>
                                    <button className="flex-1 border cursor-pointer border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white font-medium py-2 px-4 rounded-lg transition-colors">
                                        Ver perfil
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-12 flex justify-center">
                    <nav className="flex items-center gap-1">
                        <button className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50">
                            &laquo;
                        </button>
                        <button className="w-10 h-10 rounded-md bg-[#1e3a8a] text-white flex items-center justify-center">1</button>
                        <button className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-50">
                            2
                        </button>
                        <button className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-50">
                            3
                        </button>
                        <button className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50">
                            &raquo;
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}
