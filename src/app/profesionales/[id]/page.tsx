"use client"

import { useState } from "react"
import {
  MapPin,
  Briefcase,
  Star,
  Calendar,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  Award,
  CheckCircle,
  ChevronLeft,
  Heart,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PerfilProfesional() {
  // En un caso real, cargarías los datos del profesional basado en el ID
  // Este es un ejemplo con datos de muestra
  const professional = {
    id: "1",
    name: "Ana Martínez",
    profession: "Médico General",
    rating: 4.8,
    reviews: 124,
    location: "Barcelona, España",
    image: "/placeholder.svg?height=200&width=200",
    verified: true,
    experience: "8 años",
    description:
      "Médico general con especialidad en medicina familiar. Ofrezco atención médica integral para toda la familia, desde niños hasta adultos mayores. Mi enfoque se centra en la prevención y el tratamiento de enfermedades comunes.",
    education: [
      { title: "Licenciatura en Medicina", institution: "Universidad de Barcelona", year: "2015" },
      { title: "Especialidad en Medicina Familiar", institution: "Hospital Clínic de Barcelona", year: "2018" },
    ],
    services: [
      "Consultas médicas generales",
      "Chequeos preventivos",
      "Atención a enfermedades crónicas",
      "Vacunación",
      "Certificados médicos",
    ],
    languages: ["Español", "Catalán", "Inglés"],
    availability: {
      monday: "9:00 - 17:00",
      tuesday: "9:00 - 17:00",
      wednesday: "9:00 - 17:00",
      thursday: "9:00 - 17:00",
      friday: "9:00 - 14:00",
    },
    pricing: [
      { service: "Consulta general", price: "60€" },
      { service: "Chequeo completo", price: "120€" },
      { service: "Consulta de seguimiento", price: "40€" },
    ],
    reviews1: [
      {
        id: "1",
        user: "Carlos Gómez",
        rating: 5,
        date: "15/04/2025",
        comment: "Excelente profesional. Muy atenta y dedicada. Resolvió mi problema de salud rápidamente.",
      },
      {
        id: "2",
        user: "María López",
        rating: 4,
        date: "02/03/2025",
        comment: "Buena atención y diagnóstico acertado. El único inconveniente fue el tiempo de espera.",
      },
      {
        id: "3",
        user: "Juan Rodríguez",
        rating: 5,
        date: "18/02/2025",
        comment: "Muy profesional y amable. Explica todo con claridad y paciencia. Totalmente recomendable.",
      },
    ],
  }

  const [activeTab, setActiveTab] = useState("servicios")
  const [showContactForm, setShowContactForm] = useState(false)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header con información básica */}
      <div className="bg-[#1e3a8a] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <Link
            href="/profesionales"
            className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Volver a profesionales
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative">
              <Image
                src={professional.image || "/placeholder.svg"}
                alt={professional.name}
                width={200}
                height={200}
                className="w-32 h-32 md:w-48 md:h-48 rounded-xl object-cover border-4 border-white shadow-lg"
              />
              {professional.verified && (
                <div className="absolute -bottom-3 -right-3 bg-[#10b981] text-white p-2 rounded-full">
                  <CheckCircle className="h-6 w-6" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">{professional.name}</h1>
                  <p className="text-xl flex items-center mt-2">
                    <Briefcase className="h-5 w-5 mr-2" />
                    {professional.profession}
                  </p>
                  <p className="flex items-center mt-2 text-white/90">
                    <MapPin className="h-5 w-5 mr-2" />
                    {professional.location}
                  </p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-2">
                  <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg">
                    <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                    <span className="ml-2 text-2xl font-bold">{professional.rating}</span>
                    {/* <span className="ml-2 text-white/80">({professional.reviews} reseñas)</span> */}
                  </div>
                  <p className="text-white/80 flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    {professional.experience} de experiencia
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="bg-[#10b981] hover:bg-[#0d9668] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors shadow-lg"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Contactar
                </button>
                <button className="bg-white text-[#1e3a8a] hover:bg-gray-100 font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors shadow-lg">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Enviar mensaje
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors border border-white/30">
                  <Heart className="mr-2 h-5 w-5" />
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación por pestañas */}
      <div className="border-b bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <nav className="flex overflow-x-auto">
            {["servicios", "sobre", "experiencia", "precios", "horarios", "reseñas"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-4 font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "text-[#1e3a8a] border-b-2 border-[#1e3a8a]"
                    : "text-gray-600 hover:text-[#1e3a8a]"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2">
            {/* Sección de servicios */}
            {activeTab === "servicios" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Servicios ofrecidos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {professional.services.map((service, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#10b981] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Idiomas</h3>
                <div className="flex flex-wrap gap-2">
                  {professional.languages.map((language, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sección sobre el profesional */}
            {activeTab === "sobre" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sobre {professional.name}</h2>
                <p className="text-gray-700 whitespace-pre-line">{professional.description}</p>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Educación</h3>
                  <div className="space-y-4">
                    {professional.education.map((edu, index) => (
                      <div key={index} className="border-l-2 border-[#1e3a8a] pl-4">
                        <h4 className="font-medium text-gray-800">{edu.title}</h4>
                        <p className="text-gray-600">{edu.institution}</p>
                        <p className="text-gray-500 text-sm">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Sección de experiencia */}
            {activeTab === "experiencia" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Experiencia profesional</h2>
                <div className="flex items-center mb-6">
                  <div className="bg-[#1e3a8a]/10 p-3 rounded-full mr-4">
                    <Briefcase className="h-6 w-6 text-[#1e3a8a]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Experiencia total</h3>
                    <p className="text-gray-700">{professional.experience}</p>
                  </div>
                </div>

                {/* Aquí podrías añadir un historial de experiencia laboral */}
                <p className="text-gray-700">
                  {professional.name} cuenta con amplia experiencia en el campo de la medicina general, habiendo
                  trabajado en diversos centros médicos y hospitales. Su trayectoria profesional incluye atención a
                  pacientes de todas las edades y condiciones.
                </p>
              </div>
            )}

            {/* Sección de precios */}
            {activeTab === "precios" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Precios de servicios</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Servicio</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {professional.pricing.map((item, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-4 px-4 text-gray-800">{item.service}</td>
                          <td className="py-4 px-4 text-right font-medium text-gray-800">{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-6 text-gray-600 text-sm">
                  * Los precios pueden variar según las necesidades específicas de cada caso. Consulta directamente con
                  el profesional para obtener un presupuesto personalizado.
                </p>
              </div>
            )}

            {/* Sección de horarios */}
            {activeTab === "horarios" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Horario de atención</h2>
                <div className="space-y-3">
                  {Object.entries(professional.availability).map(([day, hours]) => (
                    <div key={day} className="flex justify-between py-2 border-b border-gray-100">
                      <div className="font-medium text-gray-700 capitalize">
                        {day === "monday"
                          ? "Lunes"
                          : day === "tuesday"
                            ? "Martes"
                            : day === "wednesday"
                              ? "Miércoles"
                              : day === "thursday"
                                ? "Jueves"
                                : day === "friday"
                                  ? "Viernes"
                                  : day === "saturday"
                                    ? "Sábado"
                                    : "Domingo"}
                      </div>
                      <div className="flex items-center text-gray-800">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        {hours}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-[#1e3a8a]/5 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-[#1e3a8a]" />
                    Disponibilidad
                  </h3>
                  <p className="mt-2 text-gray-700">
                    Para agendar una cita, contacta directamente con el profesional o utiliza el botón de contacto.
                  </p>
                </div>
              </div>
            )}

            {/* Sección de reseñas */}
            {activeTab === "reseñas" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Reseñas de clientes</h2>
                  <div className="flex items-center mt-2 md:mt-0">
                    <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                    <span className="ml-2 text-xl font-bold">{professional.rating}</span>
                    {/* <span className="ml-2 text-gray-600">({professional.reviews} reseñas)</span> */}
                  </div>
                </div>

                <div className="space-y-6">
                  {professional.reviews1 &&
                    professional.reviews1.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-6">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-800">{review.user}</h3>
                          <span className="text-gray-500 text-sm">{review.date}</span>
                        </div>
                        <div className="flex items-center mt-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                  <button className="text-[#1e3a8a] font-medium hover:underline">Ver todas las reseñas</button>
                </div>
              </div>
            )}
          </div>

          {/* Columna lateral */}
          <div className="lg:col-span-1">
            {/* Tarjeta de contacto */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contactar con {professional.name}</h2>

              {showContactForm ? (
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] outline-none transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] outline-none transition-all"
                      placeholder="Tu email"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] outline-none transition-all"
                      placeholder="Tu teléfono"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] outline-none transition-all resize-none"
                      placeholder="Describe brevemente lo que necesitas"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#10b981] hover:bg-[#0d9668] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
                  >
                    Enviar solicitud
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Contacta directamente con este profesional para consultar disponibilidad y precios específicos.
                  </p>

                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-[#1e3a8a] mr-3" />
                    <span className="text-gray-800 font-medium">+34 612 345 678</span>
                  </div>

                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-[#1e3a8a] mr-3" />
                    <span className="text-gray-800 font-medium">contacto@ejemplo.com</span>
                  </div>

                  <button
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-[#10b981] hover:bg-[#0d9668] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors mt-4"
                  >
                    Solicitar información
                  </button>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-gray-500 text-sm">
                  Al contactar con este profesional, aceptas los términos y condiciones de Kualify.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
