/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useState } from "react"
import { getProfessionalInfo } from "@/services/professionals"
import ProfessionalStats from "./profesionalStats"
import { Mail, Star } from 'lucide-react'
import ProfesionalInfo from "./profesionalInfo"
import ProfessionalDocuments from "./profesionalDocuments"
import { getProfessionalDocuments } from "@/services/professionals"
import { Document } from "@/utils/interfaces/documentsInterfaces"
import { DocumentType } from "@/utils/interfaces/documentsInterfaces"
import Avatar from "@/components/ui/avata"


const documentTypes: Record<DocumentType, string> = {
    acta_nacimiento: "Acta de Nacimiento",
    comprobante_domicilio: "Comprobante de Domicilio",
    constancia_fiscal: "Constancia Fiscal",
    ine_pasaporte: "INE / Pasaporte",
    profile_image: "Foto de Perfil"
}

export interface ProfessionalViewProps {
    id: string | null
}

interface ProfessionalInfo {
    id: string;
    email: string;
    profesionalname: string;
    phoneNumber: string;
    auditado: boolean;
    // Puedes añadir más campos según tu API
}

export default function ProfessionalView({ id }: ProfessionalViewProps) {
    const [professionalInfo, setProfessionalInfo] = useState<ProfessionalInfo | null>(null)
    const [documentsErrors, setDocumentsErrors] = useState<number>(0)
    const [documents, setDocuments] = useState<Document[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("info")
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        setToken(localStorage.getItem('tokenK'));
    }, []);

    const handleGetInfo = async () => {
        try {
            setIsLoading(true)
            const response = await getProfessionalInfo(id!, token ?? "")
            setProfessionalInfo(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleGetDocuments = async () => {
        try {
            const response = await getProfessionalDocuments(id!, token ?? "");
            setDocuments(response);
            if (!Array.isArray(response)) {
                setDocumentsErrors(Object.keys(documentTypes).length);
                return;
            }

            // 1. Obtener tipos de documentos existentes (manejo seguro cuando response es vacío)
            const existingTypes = response?.map((doc: { tipo: DocumentType }) => doc.tipo) || [];

            // 2. Calcular documentos faltantes (seguro contra undefined/null)
            const missing = (Object.keys(documentTypes) as DocumentType[])
                .filter(type => !existingTypes?.includes(type));

            // 3. Contar documentos no auditados (seguro contra response vacío)
            const unverifiedCount = response?.filter((doc: { auditado: boolean }) => !doc.auditado).length || 0;

            // 4. Sumar documentos faltantes + no auditados
            const totalErrors = (missing?.length || 0) + unverifiedCount;

            setDocumentsErrors(totalErrors);

        } catch (error) {
            console.error(error);
            // Si hay error, considerar todos los documentos como faltantes
            setDocumentsErrors(Object.keys(documentTypes).length);
        }
    };

    useEffect(() => {
        if (id && token) {
            handleGetInfo()
            handleGetDocuments()
        }
    }, [id, token])

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
        <div className="">
            {/* Cabecera con gradiente */}
            <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]  p-6 text-white">
                <h1 className="text-2xl font-bold">Perfil Profesional</h1>
                <p className="text-sm opacity-80">Información detallada de tu perfil en Kualify</p>
            </div>

            <div className="bg-white  shadow-lg -mt-6">
                <div className="flex flex-col md:flex-row p-6">
                    {/* Columna izquierda - Información de perfil */}
                    <div className="md:w-1/3 flex flex-col items-center justify-start pt-10">
                        {/* Avatar */}
                        <Avatar documents={documents} userInfo={professionalInfo} handleGetInfo={handleGetInfo} handleGetDocuments={handleGetDocuments}/>

                        <div className="mt-4 text-center">
                            <h2 className="text-xl font-bold text-[#1e3a8a]">{professionalInfo.profesionalname}</h2>
                            <div className="flex items-center justify-center mt-1 text-gray-600">
                                <Mail className="h-4 w-4 mr-1" />
                                <span className="text-sm">{professionalInfo.email}</span>
                            </div>

                            {/* Badge */}
                            <div className="mt-4">
                                {professionalInfo?.auditado ? (
                                    <span className="inline-flex items-center rounded-full bg-[#10b981]/10 px-2.5 py-0.5 text-xs font-semibold text-[#10b981]">
                                        Profesional Verificado
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center rounded-full bg-[#f59e0b]/10 px-2.5 py-0.5 text-xs font-semibold text-[#f59e0b]">
                                        Pendiente de verificación
                                    </span>
                                )}
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

                    </div>

                    {/* Columna derecha - Contenido principal */}
                    <div className="md:w-2/3 mt-8 md:mt-0">
                        {/* Tabs */}
                        <div className="w-full">
                            {/* Tab headers */}
                            <div className="flex space-x-1 rounded-lg bg-[#1e3a8a]/10 p-1">
                                <button
                                    onClick={() => setActiveTab("info")}
                                    className={`flex-1 cursor-pointer py-2 px-3 text-sm font-medium rounded-md transition-colors ${activeTab === "info"
                                        ? "bg-[#1e3a8a] text-white"
                                        : "text-gray-700 hover:bg-[#1e3a8a]/20"
                                        }`}
                                >
                                    Información
                                </button>
                                {/* <button
                                    onClick={() => setActiveTab("stats")}
                                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${activeTab === "stats"
                                        ? "bg-[#1e3a8a] text-white"
                                        : "text-gray-700 hover:bg-[#1e3a8a]/20"
                                        }`}
                                >
                                    Estadísticas
                                </button> */}
                                <button
                                    onClick={() => setActiveTab("services")}
                                    className={`flex-1 cursor-pointer py-2 px-3 text-sm font-medium rounded-md transition-colors ${activeTab === "services"
                                        ? "bg-[#1e3a8a] text-white"
                                        : "text-gray-700 hover:bg-[#1e3a8a]/20"
                                        }`}
                                >
                                    Servicios
                                </button>
                                <button
                                    onClick={() => setActiveTab("documentos")}
                                    className={`flex cursor-pointer items-center justify-center gap-2 flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${activeTab === "documentos"
                                        ? "bg-[#1e3a8a] text-white"
                                        : "text-gray-700 hover:bg-[#1e3a8a]/20"
                                        }`}
                                >
                                    Documentos
                                    {documentsErrors > 0 && (
                                        <span className="flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
                                            {documentsErrors}
                                        </span>
                                    )}
                                </button>
                            </div>

                            {/* Tab content */}
                            <div className="mt-4">
                                {/* Info tab */}
                                {activeTab === "info" && (
                                    <ProfesionalInfo refetch={handleGetInfo} professionalInfo={professionalInfo}
                                    />
                                )}

                                {activeTab === "stats" && (
                                    <ProfessionalStats />
                                )}

                                {activeTab === "documentos" && (
                                    <ProfessionalDocuments id={id} />
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