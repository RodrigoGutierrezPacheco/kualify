/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useState } from "react"
import { getUserInfo } from "@/services/users"
import { Mail, Star } from 'lucide-react'
import UserInfo from "./UserInfo"
import Avatar from "@/components/ui/avata"

export interface UserViewProps {
    id: string | null
}

export interface UserInfoProps {
        id: string;
        email: string;
        username: string;
        phoneNumber: string;
        role: string;
        ciudad:string;
        estado:string;	
        fecha_nacimiento:string;
        genero:string;
}

export default function UserView({ id }: UserViewProps) {
    const [userInfo, setUserInfo] = useState<UserInfoProps | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        setToken(localStorage.getItem('tokenK'));
    }, []);

    const handleGetUserInfo = async () => {
        try {
            setIsLoading(true)
            const response = await getUserInfo(id!, token ?? "")
            setUserInfo(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (id && token) {
            handleGetUserInfo()
        }
    }, [id, token])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#10b981]"></div>
            </div>
        )
    }

    if (!userInfo) {
        return (
            <div className="text-center p-8">
                <p className="text-lg text-gray-600">No se pudo cargar la información del usuario.</p>
            </div>
        )
    }

    return (
        <div className="">
            {/* Cabecera con gradiente */}
            <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] p-6 text-white">
                <h1 className="text-2xl font-bold">Perfil de Usuario</h1>
                <p className="text-sm opacity-80">Información detallada del usuario en Kualify</p>
            </div>

            <div className="bg-white shadow-lg -mt-6">
                <div className="flex flex-col md:flex-row p-6">
                    {/* Columna izquierda - Información de perfil */}
                    <div className="md:w-1/3 flex flex-col items-center justify-start pt-10">
                        {/* Avatar - Versión simplificada sin documentos */}
                        <Avatar isUser={true} documents={[]} userInfo={userInfo} handleGetInfo={handleGetUserInfo} handleGetDocuments={handleGetUserInfo} />

                        <div className="mt-4 text-center">
                            <h2 className="text-xl font-bold text-[#1e3a8a]">{userInfo?.username}</h2>
                            <div className="flex items-center justify-center mt-1 text-gray-600">
                                <Mail className="h-4 w-4 mr-1" />
                                <span className="text-sm">{userInfo?.email}</span>
                            </div>

                            {/* Badge de rol */}
                            <div className="mt-4">
                                <span className="inline-flex items-center rounded-full bg-[#1e3a8a]/10 px-2.5 py-0.5 text-xs font-semibold text-[#1e3a8a]">
                                    {userInfo?.role === 'user' ? 'Usuario' : userInfo?.role}
                                </span>
                            </div>

                            {/* Rating - Opcional para usuarios */}
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
                                    className="flex-1 py-2 px-3 text-sm font-medium rounded-md bg-[#1e3a8a] text-white"
                                >
                                    Información
                                </button>
                            </div>

                            {/* Tab content */}
                            <div className="mt-4">
                                    <UserInfo userInfo={userInfo} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}