import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllEstados, getCiudades } from "@/services/ciudades";

export interface SelectCiudadesEstados {
  userInfo: {
    ciudad: string;
    estado: string;
  };
  isEditing: boolean;
  onLocationChange: (ciudad: string, estado?: string) => void;
  errors: {
    ciudad?: string;
    estado?: string;
  };
}

export default function SelectCiudadesEstados({ userInfo, onLocationChange, isEditing, errors }: SelectCiudadesEstados) {
  const [estados, setEstados] = useState<string[]>([]);
  const [ciudades, setCiudades] = useState<string[]>([]);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(userInfo.estado || "");
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(userInfo.ciudad || "");
  const [loadingEstados, setLoadingEstados] = useState(true);
  const [loadingCiudades, setLoadingCiudades] = useState(false);

  useEffect(() => {
    const cargarEstados = async () => {
      try {
        setLoadingEstados(true);
        const estadosData = await getAllEstados();
        const nombresEstados = estadosData.map((e: { nombre: string }) => e.nombre).sort();
        setEstados(nombresEstados);

        if (userInfo.estado && nombresEstados.includes(userInfo.estado)) {
          setEstadoSeleccionado(userInfo.estado);
        }
      } catch (error) {
        console.error("Error cargando estados:", error);
      } finally {
        setLoadingEstados(false);
      }
    };

    cargarEstados();
  }, [userInfo.estado]);

  useEffect(() => {
    const cargarCiudades = async () => {
      if (!estadoSeleccionado) {
        setCiudades([]);
        return;
      }

      try {
        setLoadingCiudades(true);
        const ciudadesData = await getCiudades(estadoSeleccionado);
        const nombresCiudades = ciudadesData.map((e: { nombre: string }) => e.nombre).sort();
        setCiudades(nombresCiudades);

        if (userInfo.ciudad && nombresCiudades.includes(userInfo.ciudad)) {
          setCiudadSeleccionada(userInfo.ciudad);
        } else {
          setCiudadSeleccionada("");
        }
      } catch (error) {
        console.error("Error cargando ciudades:", error);
      } finally {
        setLoadingCiudades(false);
      }
    };

    cargarCiudades();
  }, [estadoSeleccionado, userInfo.ciudad]);

  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevoEstado = e.target.value;
    setEstadoSeleccionado(nuevoEstado);
    onLocationChange("", nuevoEstado);
  };

  const handleCiudadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevaCiudad = e.target.value;
    setCiudadSeleccionada(nuevaCiudad);
    onLocationChange(nuevaCiudad, estadoSeleccionado);
  };

  if (!isEditing) {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Ubicación</label>
        <div className="relative pb-5"> {/* Añadido pb-5 para espacio del error */}
          <div className="absolute inset-y-0 mb-5 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-4 w-4 text-[#1e3a8a]" />
          </div>
          <div className={`w-full pl-10 text-black pr-3 py-2 border rounded-md ${
            errors.ciudad || errors.estado ? "border-red-300 bg-red-50" : "border-transparent bg-gray-50"
          }`}>
            {userInfo.ciudad && userInfo.estado ? `${userInfo.ciudad}, ${userInfo.estado}` : "No especificada"}
          </div>
          {(errors.ciudad || errors.estado) && (
            <p className="absolute -bottom-1 left-0 text-xs text-red-500">
              {errors.ciudad || errors.estado}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Estado</label>
        <div className="relative pb-5"> {/* Añadido pb-5 para espacio del error */}
          <div className="absolute inset-y-0 left-0 mb-5 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-4 w-4 text-[#1e3a8a]" />
          </div>
          {loadingEstados ? (
            <div className="w-full text-black pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50">
              Cargando estados...
            </div>
          ) : (
            <div>
              <select
                value={estadoSeleccionado}
                onChange={handleEstadoChange}
                className={`w-full text-black pl-10 pr-3 py-2 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.estado ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"
                }`}
              >
                <option value="">Selecciona un estado</option>
                {estados.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
              {errors.estado && (
                <p className="absolute -bottom-1 left-0 text-xs text-red-500">
                  {errors.estado}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {estadoSeleccionado && (
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Ciudad</label>
          <div className="relative pb-5"> {/* Añadido pb-5 para espacio del error */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-4 w-4 mb-5 text-[#1e3a8a]" />
            </div>
            {loadingCiudades ? (
              <div className="w-full text-black pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                Cargando ciudades...
              </div>
            ) : (
              <div>
                <select
                  value={ciudadSeleccionada}
                  onChange={handleCiudadChange}
                  className={`w-full text-black pl-10 pr-3 py-2 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.ciudad ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"
                  }`}
                >
                  <option value="">Selecciona una ciudad</option>
                  {ciudades.map((ciudad) => (
                    <option key={ciudad} value={ciudad}>
                      {ciudad}
                    </option>
                  ))}
                </select>
                {errors.ciudad && (
                  <p className="absolute -bottom-1 left-0 text-xs text-red-500">
                    {errors.ciudad}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}