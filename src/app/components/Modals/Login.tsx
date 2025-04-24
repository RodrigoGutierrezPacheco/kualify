"use client"
import { useState } from "react"
import type React from "react"
import { X, Shield, Mail, Lock, Eye, EyeOff, User, Briefcase } from "lucide-react"
import { loginProfessional, loginUser } from "@/app/services/auth"

interface LoginModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function Login({ isOpen, setIsOpen }: LoginModalProps) {
  const [loginType, setLoginType] = useState<"user" | "professional">("user")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [activeField, setActiveField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpiar errores cuando el usuario edita
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName)
  }

  const handleBlur = () => {
    setActiveField(null)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      let response

      if (loginType === "user") {
        response = await loginUser(formData.email, formData.password)
      } else {
        response = await loginProfessional(formData.email, formData.password)
      }

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("tokenK", response.access_token)
        // Si la autenticación es exitosa, cerrar el modal
        setIsOpen(false)
        window.location.href = "/"
        // Aquí podrías redirigir al usuario o actualizar el estado global de autenticación
      } else {
        // Si hay un error en la respuesta
        setErrors((prev) => ({ ...prev, form: response.message || "Credenciales incorrectas" }))
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrors((prev) => ({ ...prev, form: error.message }))
      } else {
        setErrors((prev) => ({ ...prev, form: "Ha ocurrido un error inesperado" }))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => !isSubmitting && setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Modal Container with padding to ensure visibility */}
      <div className="relative z-10 my-4 flex items-center justify-center min-h-screen py-4">
        {/* Modal */}
        <div className="relative w-full max-w-md rounded-lg bg-white shadow-xl animate-in fade-in zoom-in duration-300 overflow-hidden max-h-[90vh] flex flex-col">
          {/* Header with blue background */}
          <div className="bg-[#1e3a8a] text-white p-5 relative shrink-0">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => !isSubmitting && setIsOpen(false)}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Cerrar modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-7 w-7 text-[#10b981]" />
              <h2 className="text-xl font-bold">Kualify</h2>
            </div>
            <h3 className="text-lg font-medium">Iniciar sesión</h3>
            <p className="text-white/80 mt-1 text-sm">Accede a tu cuenta para disfrutar de todos los servicios</p>
          </div>

          {/* Scrollable content area */}
          <div className="p-5 overflow-y-auto">
            {/* Toggle between user and professional */}
            <div className="flex rounded-md shadow-sm mb-6">
              <button
                type="button"
                onClick={() => setLoginType("user")}
                className={`flex items-center justify-center gap-2 flex-1 py-2.5 px-4 text-sm font-medium rounded-l-md border ${
                  loginType === "user"
                    ? "bg-[#1e3a8a] text-white border-[#1e3a8a]"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <User className="h-4 w-4" />
                Usuario
              </button>
              <button
                type="button"
                onClick={() => setLoginType("professional")}
                className={`flex items-center justify-center gap-2 flex-1 py-2.5 px-4 text-sm font-medium rounded-r-md border ${
                  loginType === "professional"
                    ? "bg-[#1e3a8a] text-white border-[#1e3a8a]"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Briefcase className="h-4 w-4" />
                Profesional
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.form && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm flex items-start">
                  <div className="mr-2 mt-0.5 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>{errors.form}</div>
                </div>
              )}

              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <div
                  className={`relative rounded-md shadow-sm ${errors.email ? "ring-1 ring-red-500" : activeField === "email" ? "ring-1 ring-[#1e3a8a]" : ""}`}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-4 w-4 ${activeField === "email" ? "text-[#1e3a8a]" : "text-gray-400"}`} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={loginType === "professional" ? "dr.juan@clinica.com" : "juan@ejemplo.com"}
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className={`block w-full pl-9 pr-3 py-2.5 border ${errors.email ? "border-red-300" : activeField === "email" ? "border-[#1e3a8a]" : "border-gray-300"} rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-0 focus:border-[#1e3a8a] sm:text-sm`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <div
                  className={`relative rounded-md shadow-sm ${errors.password ? "ring-1 ring-red-500" : activeField === "password" ? "ring-1 ring-[#1e3a8a]" : ""}`}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-4 w-4 ${activeField === "password" ? "text-[#1e3a8a]" : "text-gray-400"}`} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => handleFocus("password")}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className={`block w-full pl-9 pr-9 py-2.5 border ${errors.password ? "border-red-300" : activeField === "password" ? "border-[#1e3a8a]" : "border-gray-300"} rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-0 focus:border-[#1e3a8a] sm:text-sm`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#1e3a8a] focus:ring-[#1e3a8a] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Recordarme
                  </label>
                </div>

                <div className="text-sm">
                  <button type="button" className="font-medium text-[#1e3a8a] hover:underline">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-md bg-[#10b981] text-white font-medium hover:bg-[#10b981]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Iniciando sesión...
                    </span>
                  ) : (
                    `Iniciar sesión como ${loginType === "professional" ? "profesional" : "usuario"}`
                  )}
                </button>
              </div>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              {loginType === "professional" ? (
                <>
                  ¿No tienes una cuenta profesional?{" "}
                  <button className="text-[#1e3a8a] font-medium hover:underline focus:outline-none">
                    Regístrate como profesional
                  </button>
                </>
              ) : (
                <>
                  ¿No tienes una cuenta?{" "}
                  <button className="text-[#1e3a8a] font-medium hover:underline focus:outline-none">Regístrate</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
