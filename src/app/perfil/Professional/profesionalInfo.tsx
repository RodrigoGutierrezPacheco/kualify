"use client"

import { UserCheck, Mail, Phone, Save, CheckCircle, X, Edit2 } from 'lucide-react'
import { useState, useRef, useEffect } from "react"
import { updateProfessionalInfo } from '@/services/professionals'
import SelectCiudadesEstados from '@/components/ui/selectCiudadesEstados'
import SelectBirthDate from '@/components/ui/selectBirthDate'
import SelectGenero from '@/components/ui/selectGenero'

export interface ProfessionalInfo {
    professionalInfo: {
        id: string
        email: string
        profesionalname: string
        phoneNumber: string
        auditado: boolean
        estado?: string | undefined
        ciudad?: string
        fecha_nacimiento?: string
        genero?: string
    }
    refetch: () => void
}

export default function ProfesionalInfo({ professionalInfo, refetch }: ProfessionalInfo) {
    const token = localStorage.getItem('tokenK')
    const [isEditing, setIsEditing] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [errors, setErrors] = useState<Record<string, string>>({})
    const formRef = useRef<HTMLFormElement>(null)
    const [formData, setFormData] = useState({
        profesionalname: professionalInfo.profesionalname,
        email: professionalInfo.email,
        phoneNumber: professionalInfo.phoneNumber || "",
        ciudad: professionalInfo.ciudad || "",
        estado: professionalInfo.estado || "",
        fecha_nacimiento: professionalInfo.fecha_nacimiento || "",
        genero: professionalInfo.genero || ""
    })

    const handleCancel = () => {
        setFormData({
            profesionalname: professionalInfo.profesionalname,
            email: professionalInfo.email,
            phoneNumber: professionalInfo.phoneNumber || "",
            ciudad: professionalInfo.ciudad || "",
            estado: professionalInfo.estado || "",
            fecha_nacimiento: professionalInfo.fecha_nacimiento || "",
            genero: professionalInfo.genero || ""
        })
        setErrors({})
        setIsEditing(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.profesionalname.trim()) {
            newErrors.name = "El nombre es obligatorio"
        }

        if (!formData.email.trim()) {
            newErrors.email = "El email es obligatorio"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email inválido"
        }

        if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
            newErrors.phone = "Formato de teléfono inválido"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        try {
            const response = await updateProfessionalInfo(professionalInfo.id, formData, token ?? "")

            if (response.statusCode >= 200 && response.statusCode < 300) {
                setShowSuccess(true)
                setShowError(false)
                setIsEditing(false)
                setTimeout(() => {
                    setShowSuccess(false)
                }, 3000)
                setTimeout(() => {
                    refetch()
                }, 3000)
            } else {
                setErrorMessage(response.message || "Error al actualizar la información")
                setShowError(true)
                setTimeout(() => {
                    setShowError(false)
                }, 3000)
            }
        } catch (error) {
            console.error("Error al actualizar:", error)
            setErrorMessage("Error al conectar con el servidor")
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000)
        }
    }

    useEffect(() => {
        if (!isEditing) return

        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                if (
                    formData.profesionalname !== professionalInfo.profesionalname ||
                    formData.email !== professionalInfo.email ||
                    formData.phoneNumber !== professionalInfo.phoneNumber
                ) {
                    if (window.confirm("¿Deseas cancelar los cambios?")) {
                        handleCancel()
                    }
                } else {
                    setIsEditing(false)
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditing, formData, professionalInfo])

    return (
        <div className="bg-white rounded-lg border shadow-sm">
            <form ref={formRef} onSubmit={handleSubmit} className="relative">
                {/* Mensaje de éxito */}
                {showSuccess && (
                    <div className="absolute top-0 left-0 right-0 bg-green-50 text-green-700 p-3 rounded-t-lg flex items-center justify-between border-b border-green-200">
                        <span className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Información actualizada correctamente
                        </span>
                        <button
                            type="button"
                            onClick={() => setShowSuccess(false)}
                            className="text-green-700 hover:text-green-900"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                {/* Mensaje de error */}
                {showError && (
                    <div className="absolute top-0 left-0 right-0 bg-red-50 text-red-700 p-3 rounded-t-lg flex items-center justify-between border-b border-red-200">
                        <span className="flex items-center">
                            <X className="h-4 w-4 mr-2" />
                            {errorMessage}
                        </span>
                        <button
                            type="button"
                            onClick={() => setShowError(false)}
                            className="text-red-700 hover:text-red-900"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                <div className={`p-6 ${showSuccess || showError ? 'pt-16' : ''}`}>
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-[#1e3a8a]">Información Personal</h3>
                            <p className="text-sm text-gray-500">Detalles de tu perfil profesional</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
                            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md transition-colors ${isEditing
                                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                : "bg-[#1e3a8a]/10 text-[#1e3a8a] hover:bg-[#1e3a8a]/20"
                                }`}
                        >
                            {isEditing ? (
                                <>
                                    <X size={14} />
                                    Cancelar
                                </>
                            ) : (
                                <>
                                    <Edit2 size={14} />
                                    Editar
                                </>
                            )}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nombre
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserCheck className="h-4 w-4 text-[#1e3a8a]" />
                                </div>
                                {isEditing ? (
                                    <input
                                        id="name"
                                        type="text"
                                        name="profesionalname"
                                        value={formData.profesionalname}
                                        onChange={handleChange}
                                        className={`w-full text-black pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-[#1e3a8a]/30 focus:border-[#1e3a8a] transition-colors ${errors.name ? "border-red-300 bg-red-50" : "border-gray-300"
                                            }`}
                                    />
                                ) : (
                                    <div className="w-full pl-10 pr-3 py-2 border border-transparent text-black bg-gray-50 rounded-md">
                                        {formData.profesionalname}
                                    </div>
                                )}
                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-4 w-4 text-[#1e3a8a]" />
                                </div>
                                <div className="w-full pl-10 text-black pr-3 py-2 border border-transparent bg-gray-50 rounded-md">
                                    {formData.email}
                                </div>
                                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Teléfono
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-4 w-4 text-[#1e3a8a]" />
                                </div>
                                {isEditing ? (
                                    <input
                                        id="phone"
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="10 dígitos"
                                        className={`w-full text-black pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-[#1e3a8a]/30 focus:border-[#1e3a8a] transition-colors ${errors.phone ? "border-red-300 bg-red-50" : "border-gray-300"
                                            }`}
                                    />
                                ) : (
                                    <div className="w-full text-black pl-10 pr-3 py-2 border border-transparent bg-gray-50 rounded-md">
                                        {formData.phoneNumber || "No especificado"}
                                    </div>
                                )}
                                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                            </div>
                        </div>
                        <SelectCiudadesEstados userInfo={formData} onLocationChange={(ciudad, estado) => {
                            setFormData(prev => ({
                                ...prev,
                                ciudad,
                                estado: estado || prev.estado
                            }));
                        }}
                            isEditing={isEditing}
                        />

                        <SelectBirthDate
                            userInfo={formData}
                            isEditing={isEditing}
                            errors={errors}
                            handleChange={(field, value) => {
                                setFormData(prev => ({
                                    ...prev,
                                    [field]: value
                                }));
                            }}
                        />
                        <SelectGenero
                            userInfo={formData}
                            isEditing={isEditing}
                            errors={errors}
                            handleChange={(field, value) => {
                                setFormData(prev => ({
                                    ...prev,
                                    [field]: value
                                }));
                            }}
                        />
                    </div>

                    <div className="pt-6 mt-6 border-t">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-medium text-gray-700">Especialidades</h3>
                            {!isEditing && (
                                <button
                                    type="button"
                                    className="text-xs text-[#1e3a8a] hover:text-[#2563eb] transition-colors"
                                >
                                    Administrar
                                </button>
                            )}
                        </div>
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

                {isEditing && (
                    <div className="px-6 pb-6">
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-[#1e3a8a] hover:bg-[#2563eb] text-white py-2.5 px-4 rounded-md text-sm font-medium transition-colors shadow-sm"
                        >
                            <Save size={16} />
                            Guardar Cambios
                        </button>
                    </div>
                )}
            </form>
        </div>
    )
}