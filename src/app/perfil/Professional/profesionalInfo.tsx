import { UserCheck, Mail, Phone, MapPin } from "lucide-react";

export interface ProfessionalInfo {
    professionalInfo: { id: string; email: string; profesionalname: string; phoneNumber: string; auditado: boolean };
}

export default function ProfesionalInfo({ professionalInfo }: ProfessionalInfo) {
    return (
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
                            <p className="font-medium text-black">{professionalInfo.phoneNumber}</p>
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
    )
}