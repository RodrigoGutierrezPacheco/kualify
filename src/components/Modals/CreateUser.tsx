"use client"

import { Phone, User, Mail } from "lucide-react"

export interface CreateUserModalProps {
  errors: {
    name?: string | null;
    email?: string;
    phoneNumber?: string;
  };
  formData: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: (fieldName: 'name' | 'email' | 'phoneNumber') => void;
  handleBlur: () => void;
  isSubmitting: boolean;
  activeField: string | null;
}

export default function CreateUser({ errors, formData, handleChange, handleFocus, handleBlur, isSubmitting, activeField }: CreateUserModalProps) {
  return (
    <>
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre completo
        </label>
        <div
          className={`relative rounded-md shadow-sm ${errors?.name ? "ring-1 ring-red-500" : activeField === "name" ? "ring-1 ring-[#1e3a8a]" : ""}`}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className={`h-4 w-4 ${activeField === "name" ? "text-[#1e3a8a]" : "text-gray-400"}`} />
          </div>
          <input
            id="name"
            name="name"
            placeholder="Juan Pérez"
            value={formData?.name}
            onChange={handleChange}
            onFocus={() => handleFocus("name")}
            onBlur={handleBlur}
            disabled={isSubmitting}
            className={`block w-full pl-9 pr-3 py-2.5 border ${errors?.name ? "border-red-300" : activeField === "name" ? "border-[#1e3a8a]" : "border-gray-300"} rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-0 focus:border-[#1e3a8a] sm:text-sm`}
          />
        </div>
        {errors?.name && <p className="text-red-500 text-xs mt-1">{errors?.name}</p>}
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Correo electrónico
        </label>
        <div
          className={`relative rounded-md shadow-sm ${errors?.email ? "ring-1 ring-red-500" : activeField === "email" ? "ring-1 ring-[#1e3a8a]" : ""}`}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className={`h-4 w-4 ${activeField === "email" ? "text-[#1e3a8a]" : "text-gray-400"}`} />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="juan@ejemplo.com"
            value={formData?.email}
            onChange={handleChange}
            onFocus={() => handleFocus("email")}
            onBlur={handleBlur}
            disabled={isSubmitting}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            className={`block w-full pl-9 pr-3 py-2.5 border ${errors?.email ? "border-red-300" : activeField === "email" ? "border-[#1e3a8a]" : "border-gray-300"} rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-0 focus:border-[#1e3a8a] sm:text-sm`}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Teléfono
          </label>
          <div
            className={`relative rounded-md shadow-sm ${errors?.phoneNumber ? "ring-1 ring-red-500" : activeField === "phoneNumber" ? "ring-1 ring-[#1e3a8a]" : ""}`}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className={`h-4 w-4 ${activeField === "phoneNumber" ? "text-[#1e3a8a]" : "text-gray-400"}`} />
            </div>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="+52 55 1234 5678"
              value={formData?.phoneNumber}
              onChange={handleChange}
              onFocus={() => handleFocus("phoneNumber")}
              onBlur={handleBlur}
              disabled={isSubmitting}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              className={`block w-full pl-9 pr-3 py-2.5 border ${errors?.phoneNumber ? "border-red-300" : activeField === "phoneNumber" ? "border-[#1e3a8a]" : "border-gray-300"} rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-0 focus:border-[#1e3a8a] sm:text-sm`}
            />
          </div>
          {errors?.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors?.phoneNumber}</p>}
        </div>
        {errors?.email && <p className="text-red-500 text-xs mt-1">{errors?.email}</p>}
      </div>
    </>
  )
}