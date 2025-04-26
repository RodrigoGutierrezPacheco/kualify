"use client"

import { ChangeEvent } from 'react';
import { User, Mail, Phone } from "lucide-react";

export interface CreateProfModalProps {
    errors: {
        professionalName?: string;
        professionalEmail?: string;
        phoneNumber?: string;
    };
    formData: {
        professionalName: string;
        professionalEmail: string;
        phoneNumber: string;
    };
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleFocus: (field: 'professionalName' | 'professionalEmail' | 'phoneNumber') => void;
    handleBlur: () => void;
    isSubmitting: boolean;
    activeField: 'professionalName' | 'professionalEmail' | 'phoneNumber' | null;
}

export default function CreateProf({ errors, formData, handleChange, handleFocus, handleBlur, isSubmitting, activeField }: CreateProfModalProps) {
    return (
        <>
            <div className="space-y-1">
                <label htmlFor="professionalName" className="block text-sm font-medium text-gray-700">
                    Nombre profesional completo
                </label>
                <div
                    className={`relative rounded-md shadow-sm ${errors.professionalName ? "ring-1 ring-red-500" : activeField === "professionalName" ? "ring-1 ring-[#1e3a8a]" : ""}`}
                >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className={`h-4 w-4 ${activeField === "professionalName" ? "text-[#1e3a8a]" : "text-gray-400"}`} />
                    </div>
                    <input
                        id="professionalName"
                        name="professionalName"
                        placeholder="Dr. Juan Pérez"
                        value={formData.professionalName}
                        onChange={handleChange}
                        onFocus={() => handleFocus("professionalName")}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        className={`block w-full pl-9 pr-3 py-2.5 border ${errors.professionalName ? "border-red-300" : activeField === "professionalName" ? "border-[#1e3a8a]" : "border-gray-300"} rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-0 focus:border-[#1e3a8a] sm:text-sm`}
                    />
                </div>
                {errors.professionalName && <p className="text-red-500 text-xs mt-1">{errors.professionalName}</p>}
            </div>

            <div className="space-y-1">
                <label htmlFor="professionalEmail" className="block text-sm font-medium text-gray-700">
                    Correo electrónico profesional
                </label>
                <div
                    className={`relative rounded-md shadow-sm ${errors.professionalEmail ? "ring-1 ring-red-500" : activeField === "professionalEmail" ? "ring-1 ring-[#1e3a8a]" : ""}`}
                >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className={`h-4 w-4 ${activeField === "professionalEmail" ? "text-[#1e3a8a]" : "text-gray-400"}`} />
                    </div>
                    <input
                        id="professionalEmail"
                        name="professionalEmail"
                        type="email"
                        placeholder="dr.juan@clinica.com"
                        value={formData.professionalEmail}
                        onChange={handleChange}
                        onFocus={() => handleFocus("professionalEmail")}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        className={`block w-full pl-9 pr-3 py-2.5 border ${errors.professionalEmail ? "border-red-300" : activeField === "professionalEmail" ? "border-[#1e3a8a]" : "border-gray-300"} rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-0 focus:border-[#1e3a8a] sm:text-sm`}
                    />
                </div>
                {errors.professionalEmail && <p className="text-red-500 text-xs mt-1">{errors.professionalEmail}</p>}
            </div>

            <div className="space-y-1">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Teléfono
                </label>
                <div
                    className={`relative rounded-md shadow-sm ${errors.phoneNumber ? "ring-1 ring-red-500" : activeField === "phoneNumber" ? "ring-1 ring-[#1e3a8a]" : ""}`}
                >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className={`h-4 w-4 ${activeField === "phoneNumber" ? "text-[#1e3a8a]" : "text-gray-400"}`} />
                    </div>
                    <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        placeholder="+52 55 1234 5678"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        onFocus={() => handleFocus("phoneNumber")}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        className={`block w-full pl-9 pr-3 py-2.5 border ${errors.phoneNumber ? "border-red-300" : activeField === "phoneNumber" ? "border-[#1e3a8a]" : "border-gray-300"} rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-0 focus:border-[#1e3a8a] sm:text-sm`}
                    />
                </div>
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>
        </>
    )
}