import { User } from "lucide-react";

interface userInfo {
    genero?: string;
}

interface Errors {
    genero?: string;
}

interface SelectGeneroProps {
    userInfo: userInfo;
    isEditing: boolean;
    errors: Errors;
    handleChange: (field: string, value: string) => void;
}

export default function SelectGenero({ userInfo, isEditing, errors, handleChange }: SelectGeneroProps) {
    const opcionesGenero = [
        { valor: "", etiqueta: "Seleccione una opción" },
        { valor: "masculino", etiqueta: "Masculino" },
        { valor: "femenino", etiqueta: "Femenino" },
        { valor: "otro", etiqueta: "Prefiero no especificarlo" }
    ];

    return (
        <div className="space-y-1">
            <label htmlFor="genero" className="block text-sm font-medium text-gray-700">
                Género
            </label>
            <div className="relative pb-5"> {/* Añadido pb-5 para espacio del error */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mb-5">
                    <User className="h-4 w-4 text-[#1e3a8a]" />
                </div>
                {isEditing ? (
                    <div>
                        <select
                            id="genero"
                            name="genero"
                            value={userInfo.genero || ""}
                            onChange={(e) => handleChange('genero', e.target.value)}
                            className={`w-full text-black pl-10 pr-3 py-2 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/30 focus:border-[#1e3a8a] ${
                                errors.genero ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"
                            }`}
                        >
                            {opcionesGenero.map((opcion) => (
                                <option key={opcion.valor} value={opcion.valor}>
                                    {opcion.etiqueta}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <div className={`w-full pl-10 text-black pr-3 py-2 border rounded-md ${
                        errors.genero ? "border-red-300 bg-red-50" : "border-transparent bg-gray-50"
                    }`}>
                        {userInfo.genero
                            ? opcionesGenero.find(o => o.valor === userInfo.genero)?.etiqueta
                            : 'No especificado'}
                    </div>
                )}
                {errors.genero && (
                    <p className="absolute -bottom-1 left-0 text-xs text-red-500">
                        {errors.genero}
                    </p>
                )}
            </div>
        </div>
    );
}