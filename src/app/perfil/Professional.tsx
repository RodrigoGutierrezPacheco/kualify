/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { getProfessionalInfo } from "@/services/professionals"
import { CalendarDays, Mail, MapPin, MessageSquare, Phone, Star, UserCheck} from 'lucide-react'

export interface ProfessionalViewProps {
    id: string | null
}

interface ProfessionalInfo {
    id: string;
    email: string;
    profesionalname: string;
    // Puedes añadir más campos según tu API
}

export default function ProfessionalView({ id }: ProfessionalViewProps) {
    const [professionalInfo, setProfessionalInfo] = useState<ProfessionalInfo | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("info")
    
    const handleGetInfo = async () => {
        try {
            setIsLoading(true)
            const response = await getProfessionalInfo(id!)
            setProfessionalInfo(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (id) handleGetInfo()
    }, [id])

    // Obtener iniciales para el avatar
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part.charAt(0))
            .join("")
            .toUpperCase()
            .substring(0, 2)
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#10b981]"></div>
            </div>
        )
    }

    if (!professionalInfo) {
        return (
            <div className="text-center p-8">
                <p className="text-lg text-gray-600">No se pudo cargar la información del profesional.</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            {/* Cabecera con gradiente */}
            <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] rounded-t-2xl p-6 text-white">
                <h1 className="text-2xl font-bold">Perfil Profesional</h1>
                <p className="text-sm opacity-80">Información detallada de tu perfil en Kualify</p>
            </div>

            <div className="bg-white rounded-b-2xl shadow-lg -mt-6">
                <div className="flex flex-col md:flex-row p-6">
                    {/* Columna izquierda - Información de perfil */}
                    <div className="md:w-1/3 flex flex-col items-center justify-start pt-10">
                        {/* Avatar */}
                        <div className="h-32 w-32 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg">
                            {professionalInfo.profesionalname ? getInitials(professionalInfo.profesionalname) : "?"}
                        </div>

                        <div className="mt-4 text-center">
                            <h2 className="text-xl font-bold text-[#1e3a8a]">{professionalInfo.profesionalname}</h2>
                            <div className="flex items-center justify-center mt-1 text-gray-600">
                                <Mail className="h-4 w-4 mr-1" />
                                <span className="text-sm">{professionalInfo.email}</span>
                            </div>

                            {/* Badge */}
                            <div className="mt-4">
                                <span className="inline-flex items-center rounded-full bg-[#10b981]/10 px-2.5 py-0.5 text-xs font-semibold text-[#10b981]">
                                    Profesional Verificado
                                </span>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center justify-center mt-4">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <span className="ml-2 text-sm font-bold text-black">5.0</span>
                            </div>
                        </div>

                        {/* Botón de editar perfil */}
                        <div className="mt-6 w-full px-4">
                            <button className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
                                Editar Perfil
                            </button>
                        </div>
                    </div>

                    {/* Columna derecha - Contenido principal */}
                    <div className="md:w-2/3 mt-8 md:mt-0">
                        {/* Tabs */}
                        <div className="w-full">
                            {/* Tab headers */}
                            <div className="flex space-x-1 rounded-lg bg-[#1e3a8a]/10 p-1">
                                <button
                                    onClick={() => setActiveTab("info")}
                                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                                        activeTab === "info" 
                                            ? "bg-[#1e3a8a] text-white" 
                                            : "text-gray-700 hover:bg-[#1e3a8a]/20"
                                    }`}
                                >
                                    Información
                                </button>
                                <button
                                    onClick={() => setActiveTab("stats")}
                                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                                        activeTab === "stats" 
                                            ? "bg-[#1e3a8a] text-white" 
                                            : "text-gray-700 hover:bg-[#1e3a8a]/20"
                                    }`}
                                >
                                    Estadísticas
                                </button>
                                <button
                                    onClick={() => setActiveTab("services")}
                                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                                        activeTab === "services" 
                                            ? "bg-[#1e3a8a] text-white" 
                                            : "text-gray-700 hover:bg-[#1e3a8a]/20"
                                    }`}
                                >
                                    Servicios
                                </button>
                            </div>

                            {/* Tab content */}
                            <div className="mt-4">
                                {/* Info tab */}
                                {activeTab === "info" && (
                                    <div className="bg-white rounded-lg border shadow-sm">
                                        <div className="p-6">
                                            <h3 className="text-lg font-semibold text-[#1e3a8a] mb-4">Información Personal</h3>
                                            <p className="text-sm text-gray-500 mb-4">Detalles de tu perfil profesional</p>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-center">
                                                    <UserCheck className="h-5 w-5 text-[#10b981] mr-2" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Nombre</p>
                                                        <p className="font-medium text-black">{professionalInfo.profesionalname}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center">
                                                    <Mail className="h-5 w-5 text-[#10b981] mr-2" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Email</p>
                                                        <p className="font-medium text-black">{professionalInfo.email}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center">
                                                    <Phone className="h-5 w-5 text-[#10b981] mr-2" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Teléfono</p>
                                                        <p className="font-medium text-black">+52 XXX XXX XXXX</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center">
                                                    <MapPin className="h-5 w-5 text-[#10b981] mr-2" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Ubicación</p>
                                                        <p className="font-medium text-black">Ciudad de México</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-4 mt-4 border-t">
                                                <h3 className="font-medium mb-2 text-gray-500">Especialidades</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="inline-flex items-center rounded-md border border-[#1e3a8a]/30 bg-[#1e3a8a]/10 px-2 py-1 text-xs font-medium text-[#1e3a8a]">
                                                        Desarrollo Web
                                                    </span>
                                                    <span className="inline-flex items-center rounded-md border border-[#1e3a8a]/30 bg-[#1e3a8a]/10 px-2 py-1 text-xs font-medium text-[#1e3a8a]">
                                                        UX/UI
                                                    </span>
                                                    <span className="inline-flex items-center rounded-md border border-[#1e3a8a]/30 bg-[#1e3a8a]/10 px-2 py-1 text-xs font-medium text-[#1e3a8a]">
                                                        React
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-6 pt-0">
                                            <button className="text-black font-bold w-full py-2 px-4 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 transition-colors">
                                                Actualizar Información
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "stats" && (
                                    <div className="bg-white rounded-lg border shadow-sm">
                                        <div className="p-6">
                                            <h3 className="text-lg font-semibold text-[#1e3a8a] mb-4">Estadísticas</h3>
                                            <p className="text-sm text-gray-500 mb-4">Resumen de tu actividad en Kualify</p>
                                            
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div className="bg-[#1e3a8a]/5 p-4 rounded-lg text-center">
                                                    <p className="text-3xl font-bold text-[#1e3a8a]">12</p>
                                                    <p className="text-sm text-gray-600">Proyectos</p>
                                                </div>
                                                <div className="bg-[#1e3a8a]/5 p-4 rounded-lg text-center">
                                                    <p className="text-3xl font-bold text-[#1e3a8a]">98%</p>
                                                    <p className="text-sm text-gray-600">Satisfacción</p>
                                                </div>
                                                <div className="bg-[#1e3a8a]/5 p-4 rounded-lg text-center">
                                                    <p className="text-3xl font-bold text-[#1e3a8a]">24</p>
                                                    <p className="text-sm text-gray-600">Reseñas</p>
                                                </div>
                                                <div className="bg-[#1e3a8a]/5 p-4 rounded-lg text-center">
                                                    <p className="text-3xl font-bold text-[#1e3a8a]">3</p>
                                                    <p className="text-sm text-gray-600">Años</p>
                                                </div>
                                            </div>

                                            <div className="mt-6">
                                                <h3 className="font-medium mb-2">Actividad Reciente</h3>
                                                <div className="space-y-3">
                                                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                                        <CalendarDays className="h-5 w-5 text-[#10b981] mr-3" />
                                                        <div>
                                                            <p className="text-sm font-medium">Proyecto completado</p>
                                                            <p className="text-xs text-gray-500">Hace 2 días</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                                        <MessageSquare className="h-5 w-5 text-[#10b981] mr-3" />
                                                        <div>
                                                            <p className="text-sm font-medium">Nueva reseña recibida</p>
                                                            <p className="text-xs text-gray-500">Hace 1 semana</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Services tab */}
                                {activeTab === "services" && (
                                    <div className="bg-white rounded-lg border shadow-sm">
                                        <div className="p-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-[#1e3a8a]">Mis Servicios</h3>
                                                    <p className="text-sm text-gray-500">Servicios que ofreces en Kualify</p>
                                                </div>
                                                <button className="bg-[#10b981] hover:bg-[#0d9668] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
                                                    Añadir Servicio
                                                </button>
                                            </div>
                                            
                                            <div className="space-y-4">
                                                <div className="p-4 border rounded-lg">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-medium">Desarrollo Web</h3>
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                Creación de sitios web responsivos y aplicaciones web
                                                            </p>
                                                        </div>
                                                        <span className="inline-flex items-center rounded-full bg-[#10b981] px-2.5 py-0.5 text-xs font-semibold text-white">
                                                            $500/hr
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="p-4 border rounded-lg">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-medium">Diseño UX/UI</h3>
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                Diseño de interfaces de usuario y experiencia de usuario
                                                            </p>
                                                        </div>
                                                        <span className="inline-flex items-center rounded-full bg-[#10b981] px-2.5 py-0.5 text-xs font-semibold text-white">
                                                            $450/hr
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="p-4 border rounded-lg">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-medium">Consultoría Técnica</h3>
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                Asesoramiento en tecnologías y arquitectura de software
                                                            </p>
                                                        </div>
                                                        <span className="inline-flex items-center rounded-full bg-[#10b981] px-2.5 py-0.5 text-xs font-semibold text-white">
                                                            $600/hr
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}