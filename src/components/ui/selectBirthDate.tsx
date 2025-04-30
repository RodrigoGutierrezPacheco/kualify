import { Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { formatDateWithoutTimeZone } from "@/utils/formatDate";

interface UserInfo {
    fecha_nacimiento?: string | null;
}

interface Errors {
    fecha_nacimiento?: string;
}

interface SelectBirthDateProps {
    userInfo: UserInfo;
    isEditing: boolean;
    errors: Errors;
    handleChange: (field: string, value: string, error?: string) => void;
}

export default function SelectBirthDate({
    userInfo,
    isEditing,
    errors,
    handleChange
}: SelectBirthDateProps) {
    const [localDate, setLocalDate] = useState<string>(userInfo.fecha_nacimiento || '');
    const [ageError, setAgeError] = useState<string>('');

    useEffect(() => {
        setLocalDate(userInfo.fecha_nacimiento || '');
    }, [userInfo.fecha_nacimiento]);

    const calculateAge = (birthDate: string): number => {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }

        return age;
    };

    const validateAge = (dateString: string): boolean => {
        if (!dateString) return false;

        try {
            const age = calculateAge(dateString);
            return age >= 18;
        } catch {
            return false;
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalDate(value);

        if (value) {
            const isValidAge = validateAge(value);
            if (!isValidAge) {
                setAgeError('Debes tener al menos 18 años');
                handleChange('fecha_nacimiento', value, 'Debes tener al menos 18 años');
            } else {
                setAgeError('');
                handleChange('fecha_nacimiento', value);
            }
        } else {
            setAgeError('');
            handleChange('fecha_nacimiento', value);
        }
    };

    return (
        <div className="space-y-1">
            <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700">
                Fecha de nacimiento
            </label>
            <div className="relative pb-5"> {/* Añadido pb-5 para espacio del error */}
                <div className="absolute inset-y-0 left-0 pl-3 mb-5 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-[#1e3a8a]" />
                </div>
                {isEditing ? (
                    <div>
                        <input
                            type="date"
                            id="fecha_nacimiento"
                            name="fecha_nacimiento"
                            value={localDate}
                            onChange={handleDateChange}
                            className={`w-full text-black pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-[#1e3a8a]/30 focus:border-[#1e3a8a] transition-colors ${
                                errors.fecha_nacimiento ? "border-red-300 bg-red-50" : "border-gray-300"
                            }`}
                            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                        />
                    </div>
                ) : (
                    <div className={`w-full pl-10 text-black pr-3 py-2 border rounded-md ${
                        errors.fecha_nacimiento ? "border-red-300 bg-red-50" : "border-transparent bg-gray-50"
                    }`}>
                        {userInfo.fecha_nacimiento
                            ? formatDateWithoutTimeZone(userInfo.fecha_nacimiento)
                            : 'No especificada'}
                    </div>
                )}
                {(errors.fecha_nacimiento || ageError) && (
                    <p className="absolute -bottom-1 left-0 text-xs text-red-500">
                        {errors.fecha_nacimiento || ageError}
                    </p>
                )}
            </div>
        </div>
    );
}