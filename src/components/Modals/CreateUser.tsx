"use client"
import { useState } from "react"
import type React from "react"
import { X, Shield, Check, User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { createUser } from "./../../services/users"

interface RegistrationModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function RegistrationModal({ isOpen, setIsOpen }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria"
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await createUser({
        username: formData.name,
        email: formData.email,
        password: formData.password,
      })

      if (response.statusCode === 200 || response.statusCode === 201) {
        setSubmitSuccess(true)
      } else {
        console.log(response)
        setErrors((prev) => ({ ...prev, form: response.message || "El registro ha fallado" }))
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

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setErrors({})
    setIsSubmitting(false)
    setSubmitSuccess(false)
    setIsOpen(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => !isSubmitting && handleClose()}
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
                onClick={() => !isSubmitting && handleClose()}
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
            <h3 className="text-lg font-medium">Crear una cuenta</h3>
            <p className="text-white/80 mt-1 text-sm">
              Únete a nuestra plataforma y conecta con profesionales calificados
            </p>
          </div>

          {/* Scrollable content area */}
          <div className="p-5 overflow-y-auto">
            {submitSuccess ? (
              <div className="text-center py-6">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#10b981]/20 mb-4">
                  <Check className="h-8 w-8 text-[#10b981]" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-[#1e3a8a]">¡Registro Exitoso!</h3>
                <p className="text-gray-600 mb-6">Tu cuenta ha sido creada correctamente.</p>
                <button
                  onClick={() => handleClose()}
                  className="w-full py-2.5 px-4 rounded-md bg-[#1e3a8a] text-white font-medium hover:bg-[#1e3a8a]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:ring-offset-2"
                >
                  Continuar
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.form && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm flex items-start">
                    <div className="mr-2 mt-0.5 shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre completo
                  </label>
                  <div
                    className={`relative rounded-md shadow-sm ${errors.name ? "ring-1 ring-red-500" : activeField === "name" ? "ring-1 ring-[#1e3a8a]" : ""}`}
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className={`h-4 w-4 ${activeField === "name" ? "text-[#1e3a8a]" : "text-gray-400"}`} />
                    </div>
                    <input
                      id="name"
                      name="name"
                      placeholder="Juan Pérez"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus("name")}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className={`block w-full pl-9 pr-3 py-2.5 border ${errors.name ? "border-red-300" : activeField === "name" ? "border-[#1e3a8a]" : "border-gray-300"} rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-0 focus:border-[#1e3a8a] sm:text-sm`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

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
                      placeholder="juan@ejemplo.com"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus("email")}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      autoComplete="off"
                      // Agrega estos atributos adicionales:
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      // Nombre aleatorio para engañar al navegador:
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
                  {formData.password && !errors.password && (
                    <div className="mt-1.5">
                      <div className="flex space-x-1">
                        <div
                          className={`h-1 flex-1 rounded-full ${formData.password.length >= 8 ? "bg-[#10b981]" : "bg-gray-300"}`}
                        ></div>
                        <div
                          className={`h-1 flex-1 rounded-full ${/[A-Z]/.test(formData.password) ? "bg-[#10b981]" : "bg-gray-300"}`}
                        ></div>
                        <div
                          className={`h-1 flex-1 rounded-full ${/[0-9]/.test(formData.password) ? "bg-[#10b981]" : "bg-gray-300"}`}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">La contraseña debe tener al menos 8 caracteres</p>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirmar contraseña
                  </label>
                  <div
                    className={`relative rounded-md shadow-sm ${errors.confirmPassword ? "ring-1 ring-red-500" : activeField === "confirmPassword" ? "ring-1 ring-[#1e3a8a]" : ""}`}
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock
                        className={`h-4 w-4 ${activeField === "confirmPassword" ? "text-[#1e3a8a]" : "text-gray-400"}`}
                      />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onFocus={() => handleFocus("confirmPassword")}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className={`block w-full pl-9 pr-9 py-2.5 border ${errors.confirmPassword ? "border-red-300" : activeField === "confirmPassword" ? "border-[#1e3a8a]" : "border-gray-300"} rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-0 focus:border-[#1e3a8a] sm:text-sm`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
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
                        Procesando...
                      </span>
                    ) : (
                      "Registrarse"
                    )}
                  </button>
                </div>
              </form>
            )}

            <div className="mt-4 text-center text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <button className="text-[#1e3a8a] font-medium hover:underline focus:outline-none">Iniciar sesión</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
