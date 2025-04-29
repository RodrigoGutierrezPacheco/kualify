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
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-[#1e3a8a]" />
                </div>
                {isEditing ? (
                    <input
                        type="date"
                        id="fecha_nacimiento"
                        name="fecha_nacimiento"
                        value={localDate}
                        onChange={handleDateChange}
                        className="w-full text-black pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                    />
                ) : (
                    <div className="w-full pl-10 text-black pr-3 py-2 border border-transparent bg-gray-50 rounded-md">
                        {userInfo.fecha_nacimiento
                            ? formatDateWithoutTimeZone(userInfo.fecha_nacimiento)
                            : 'No especificada'}
                    </div>
                )}
                {(errors.fecha_nacimiento || ageError) && (
                    <p className="mt-1 text-xs text-red-500">{errors.fecha_nacimiento || ageError}</p>
                )}
            </div>
        </div>
    );
}