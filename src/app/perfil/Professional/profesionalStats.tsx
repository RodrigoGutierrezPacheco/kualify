import { CalendarDays, MessageSquare } from "lucide-react"

export default function ProfessionalStats() {
    return (
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
    )
}