import { useEffect, useState } from 'react';
import Button from "./button";
import { useRouter } from 'next/navigation';

const profesiones = [
    "Médico",
    "Enfermero",
    "Fontanero",
    "Electricista",
    "Carpintero",
    "Pintor",
    "Jardinería",
    "Limpieza del hogar",
    "Niñera",
    "Chef a domicilio"
];

const ubicaciones = [
    "Madrid",
    "Barcelona",
    "Valencia",
    "Sevilla",
    "Zaragoza",
    "Málaga",
    "Murcia",
    "Palma de Mallorca",
    "Bilbao",
    "Alicante",
    "Cuernavaca",
    "Puebla"
];

export default function SearchSection() {
    const [servicio, setServicio] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [sugerenciasServicio, setSugerenciasServicio] = useState<string[]>([]);
    const [sugerenciasUbicacion, setSugerenciasUbicacion] = useState<string[]>([]);
    const [error, setError] = useState("")
    const router = useRouter()

    const handleServicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setServicio(value);

        if (value.length > 0) {
            const filtrado = profesiones.filter(profesion =>
                profesion.toLowerCase().includes(value.toLowerCase())
            );
            setSugerenciasServicio(filtrado);
        } else {
            setSugerenciasServicio([]);
        }
    };

    const handleUbicacionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUbicacion(value);

        if (value.length > 0) {
            const filtrado = ubicaciones.filter(ubic =>
                ubic.toLowerCase().includes(value.toLowerCase())
            );
            setSugerenciasUbicacion(filtrado);
        } else {
            setSugerenciasUbicacion([]);
        }
    };

    const seleccionarServicio = (profesion: string) => {
        setServicio(profesion);
        setSugerenciasServicio([]);
    };

    const seleccionarUbicacion = (ubic: string) => {
        setUbicacion(ubic);
        setSugerenciasUbicacion([]);
    };

    const handleSearch = () => {
        if (!servicio || !ubicacion) {
            setError("Selecciona un servicio y una ubicación")
            return
        }
        router.push(`/profesionales?servicio=${servicio}&ubicacion=${ubicacion}`)
    }

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError("")
            }, 3000);
        }
    }, [error])

    return (
        <section className="py-8 bg-    ">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg p-6 -mt-12 md:-mt-16 relative z-20 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <div className="relative">
                                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-black"></i>
                                <input
                                    type="text"
                                    value={servicio}
                                    onChange={handleServicioChange}
                                    placeholder="¿Qué servicio necesitas?"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] placeholder:text-black text-gray-900"
                                />
                            </div>
                            {sugerenciasServicio.length > 0 && (
                                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto text-black">
                                    {sugerenciasServicio.map((profesion, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => seleccionarServicio(profesion)}
                                        >
                                            {profesion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="flex-1 relative">
                            <div className="relative">
                                <i className="fas fa-building absolute left-3 top-1/2 transform -translate-y-1/2 text-black"></i>
                                <input
                                    type="text"
                                    value={ubicacion}
                                    onChange={handleUbicacionChange}
                                    placeholder="¿Dónde lo necesitas?"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] placeholder:text-black text-gray-900"
                                />
                            </div>
                            {sugerenciasUbicacion.length > 0 && (
                                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto text-black">
                                    {sugerenciasUbicacion.map((ubic, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => seleccionarUbicacion(ubic)}
                                        >
                                            {ubic}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <Button className='cursor-pointer' onClick={() => {
                            handleSearch()
                        }}>Buscar</Button>
                    </div>
                    {error && (
                        <div className="mt-4 text-red-600 text-sm flex items-center justify-center ml-auto mr-auto w-full">
                            <i className="fas fa-exclamation-circle mr-2"></i>
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}