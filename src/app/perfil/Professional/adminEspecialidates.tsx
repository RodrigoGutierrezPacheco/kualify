"use client"

import { X, Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { asignarEspecialidad } from "@/services/professionals"

export interface AddSpecialtiesModalProps {
    professionalId: string
    onClose: () => void
    onSuccess: () => void
    especialidades: string[]
}

export default function AddSpecialtiesModal({
    professionalId,
    especialidades = [],
    onClose,
    onSuccess,
}: AddSpecialtiesModalProps) {
    const token = localStorage.getItem('tokenK')
    const [newSpecialty, setNewSpecialty] = useState("")
    const [specialties, setSpecialties] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        setSpecialties(especialidades)
    }, [especialidades])

    const handleAddSpecialty = () => {
        if (newSpecialty.trim() && !specialties.includes(newSpecialty.trim())) {
            setSpecialties([...specialties, newSpecialty.trim()])
            setNewSpecialty("")
            setError("")
        }
    }

    const handleSubmit = async () => {
        if (specialties.length === 0) {
            setError("Debe agregar al menos una especialidad")
            return
        }

        setIsSubmitting(true)
        setError("")

        try {
            const response = await asignarEspecialidad(specialties, professionalId, token ?? "")
            if (response.statusCode === 200 || response.ok) {
                onSuccess()
                onClose()
            } else {
                throw new Error(response.message || "Error al guardar las especialidades")
            }
        } catch (err) {
            setError("Error al guardar las especialidades: " + (err instanceof Error ? err.message : String(err)))
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleRemoveSpecialty = (specialtyToRemove: string) => {
        setSpecialties(specialties.filter(s => s !== specialtyToRemove))
    }


    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md flex flex-col shadow-xl">
                {/* Header */}
                <div className="p-3 flex justify-between items-center bg-[#1e3a8a] text-white rounded-t-lg">
                    <h3 className="font-medium text-base">Gestionar especialidades</h3>
                    <button
                        onClick={onClose}
                        className="text-white cursor-pointer hover:text-gray-200 w-7 h-7 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                        aria-label="Cerrar"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-4 bg-gray-50 border-b border-gray-200">
                    <div className="mb-4">
                        <p className="text-xs text-red-500 mb-3">
                            Agrega las especialidades que describan tus capacidades profesionales.
                            Esto mejorará tu visibilidad cuando los clientes busquen expertos en tu área.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newSpecialty}
                                onChange={(e) => setNewSpecialty(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAddSpecialty()}
                                placeholder="Nombre de especialidad"
                                maxLength={15}
                                className="flex-1 text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleAddSpecialty}
                                className="px-3 py-2 bg-[#1e3a8a] text-white rounded hover:bg-[#2563eb] transition-colors flex items-center gap-1"
                            >
                                <Plus size={16} />
                                Agregar
                            </button>
                        </div>
                    </div>

                    <div className="mb-2">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Especialidades</h4>
                        {specialties.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {specialties.map((specialty) => (
                                    <div
                                        key={specialty}
                                        className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                    >
                                        {specialty}
                                        <button
                                            onClick={() => handleRemoveSpecialty(specialty)}
                                            className="ml-2 text-blue-600 hover:text-blue-800"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">No se han agregado nuevas especialidades</p>
                        )}
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
                </div>

                {/* Footer */}
                <div className="p-3 flex justify-between items-center bg-gray-50 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-1.5 text-sm border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || specialties.length === 0}
                        className="px-4 py-1.5 text-sm bg-[#1e3a8a] text-white rounded hover:bg-[#2563eb] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                    >
                        {isSubmitting ? (
                            <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            "Guardar especialidades"
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}