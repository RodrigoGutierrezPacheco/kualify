"use client"

import {
  Search,
  Calendar,
  CheckCircle,
  Star,
  Shield,
  Clock,
  Users,
  Award,
  ThumbsUp,
  ArrowRight,
  ChevronDown,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function ComoFunciona() {
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  const faqs = [
    {
      id: "faq1",
      question: "¿Cómo se verifica a los profesionales?",
      answer:
        "Todos los profesionales pasan por un riguroso proceso de verificación que incluye validación de identidad, credenciales profesionales, antecedentes y referencias. Solo los que cumplen con nuestros estándares de calidad son aceptados en la plataforma.",
    },
    {
      id: "faq2",
      question: "¿Qué ocurre si necesito cancelar una cita?",
      answer:
        "Puedes cancelar o reprogramar tu cita hasta 24 horas antes de la hora programada sin ningún cargo. Las cancelaciones con menos de 24 horas de antelación pueden estar sujetas a una tarifa según la política del profesional.",
    },
    {
      id: "faq3",
      question: "¿Cómo funcionan los pagos?",
      answer:
        "Ofrecemos múltiples métodos de pago seguros. Puedes pagar directamente al profesional después del servicio o utilizar nuestra plataforma de pago seguro. En algunos casos, se puede solicitar un depósito por adelantado para reservar la cita.",
    },
    {
      id: "faq4",
      question: "¿Qué hago si no estoy satisfecho con el servicio?",
      answer:
        "Tu satisfacción es nuestra prioridad. Si no estás conforme con el servicio recibido, contáctanos dentro de las 48 horas siguientes y nuestro equipo de atención al cliente te ayudará a resolver el problema o encontrar una alternativa.",
    },
    {
      id: "faq5",
      question: "¿Puedo solicitar el mismo profesional para futuros servicios?",
      answer:
        "¡Por supuesto! Puedes guardar a tus profesionales favoritos en tu perfil y contactarlos directamente para futuros servicios. También puedes configurar citas recurrentes con los profesionales que prefieras.",
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "María García",
      role: "Cliente",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "Encontré un excelente médico especialista en menos de 5 minutos. La plataforma es súper intuitiva y las reseñas me ayudaron a elegir al mejor profesional.",
      rating: 5,
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: "Cliente",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "Necesitaba un fontanero urgentemente y gracias a Kualify pude encontrar uno disponible el mismo día. El proceso de reserva fue rápido y sin complicaciones.",
      rating: 5,
    },
    {
      id: 3,
      name: "Ana Martínez",
      role: "Profesional",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "Como arquitecta, Kualify me ha permitido conectar con nuevos clientes y gestionar mis citas de forma eficiente. Ha sido un gran impulso para mi negocio.",
      rating: 5,
    },
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#1e3a8a] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Servicios profesionales en <span className="text-[#10b981]">3 simples pasos</span>
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Conectamos talento con necesidad de forma rápida y sencilla. Encuentra el profesional perfecto para
                cualquier servicio que necesites.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/servicios"
                  className="bg-[#10b981] hover:bg-[#0d9668] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
                >
                  Explorar servicios
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/profesionales"
                  className="bg-white text-[#1e3a8a] hover:bg-gray-100 font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
                >
                  Buscar profesionales
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-80 md:h-96">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Kualify conecta profesionales con clientes"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - Steps */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Cómo funciona Kualify</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conectar con profesionales cualificados nunca ha sido tan fácil. Sigue estos simples pasos para encontrar
              el servicio que necesitas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Step 1 */}
            <div className="bg-white rounded-xl shadow-sm p-8 border-t-4 border-[#1e3a8a] relative">
              <div className="absolute -top-6 left-8 bg-[#1e3a8a] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div className="mb-6 flex justify-center">
                <div className="bg-[#1e3a8a]/10 p-4 rounded-full">
                  <Search className="h-10 w-10 text-[#1e3a8a]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Busca un profesional</h3>
              <p className="text-gray-600 text-center">
                Explora nuestra amplia red de profesionales verificados. Filtra por especialidad, ubicación, precio o
                disponibilidad para encontrar el que mejor se adapte a tus necesidades.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl shadow-sm p-8 border-t-4 border-[#1e3a8a] relative">
              <div className="absolute -top-6 left-8 bg-[#1e3a8a] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div className="mb-6 flex justify-center">
                <div className="bg-[#1e3a8a]/10 p-4 rounded-full">
                  <Calendar className="h-10 w-10 text-[#1e3a8a]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Agenda una cita</h3>
              <p className="text-gray-600 text-center">
                Selecciona la fecha y hora que mejor te convenga en el calendario del profesional. Recibe confirmación
                instantánea y recordatorios para tu tranquilidad.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl shadow-sm p-8 border-t-4 border-[#1e3a8a] relative">
              <div className="absolute -top-6 left-8 bg-[#1e3a8a] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div className="mb-6 flex justify-center">
                <div className="bg-[#1e3a8a]/10 p-4 rounded-full">
                  <CheckCircle className="h-10 w-10 text-[#1e3a8a]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Recibe el servicio</h3>
              <p className="text-gray-600 text-center">
                Disfruta de un servicio profesional de calidad. Después, comparte tu experiencia dejando una reseña para
                ayudar a otros usuarios a tomar mejores decisiones.
              </p>
            </div>
          </div>

          {/* Video or animation placeholder */}
          <div className="mt-20 bg-gray-100 rounded-2xl overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 relative h-[400px] md:h-[500px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Ver cómo funciona</h3>
                  <p className="text-gray-600 mb-6">Mira nuestro video explicativo para entender mejor el proceso</p>
                  <button className="bg-[#1e3a8a] hover:bg-[#15296b] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center mx-auto transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Reproducir video
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">¿Por qué elegir Kualify?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestra plataforma ofrece ventajas únicas para conectar con los mejores profesionales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="mb-4 flex justify-center">
                <div className="bg-[#1e3a8a]/10 p-3 rounded-full">
                  <Shield className="h-8 w-8 text-[#1e3a8a]" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Profesionales verificados</h3>
              <p className="text-gray-600 text-center">
                Todos los profesionales pasan por un riguroso proceso de verificación para garantizar su calidad y
                confiabilidad.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="mb-4 flex justify-center">
                <div className="bg-[#1e3a8a]/10 p-3 rounded-full">
                  <Clock className="h-8 w-8 text-[#1e3a8a]" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Ahorro de tiempo</h3>
              <p className="text-gray-600 text-center">
                Encuentra y agenda servicios en minutos, sin llamadas interminables ni búsquedas complicadas.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="mb-4 flex justify-center">
                <div className="bg-[#1e3a8a]/10 p-3 rounded-full">
                  <Star className="h-8 w-8 text-[#1e3a8a]" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Reseñas verificadas</h3>
              <p className="text-gray-600 text-center">
                Lee opiniones reales de otros clientes para tomar decisiones informadas sobre qué profesional elegir.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="mb-4 flex justify-center">
                <div className="bg-[#1e3a8a]/10 p-3 rounded-full">
                  <Users className="h-8 w-8 text-[#1e3a8a]" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Amplia selección</h3>
              <p className="text-gray-600 text-center">
                Accede a miles de profesionales en diferentes áreas, desde médicos hasta mecánicos y arquitectos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Servicios disponibles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encuentra profesionales para cualquier servicio que necesites.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {/* Category 1 */}
            <Link
              href="/servicios#health"
              className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-[#1e3a8a] hover:shadow-sm transition-all"
            >
              <div className="text-4xl mb-3">🏥</div>
              <h3 className="font-medium text-gray-800">Salud</h3>
            </Link>

            {/* Category 2 */}
            <Link
              href="/servicios#home"
              className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-[#1e3a8a] hover:shadow-sm transition-all"
            >
              <div className="text-4xl mb-3">🏠</div>
              <h3 className="font-medium text-gray-800">Hogar</h3>
            </Link>

            {/* Category 3 */}
            <Link
              href="/servicios#education"
              className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-[#1e3a8a] hover:shadow-sm transition-all"
            >
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-medium text-gray-800">Educación</h3>
            </Link>

            {/* Category 4 */}
            <Link
              href="/servicios#tech"
              className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-[#1e3a8a] hover:shadow-sm transition-all"
            >
              <div className="text-4xl mb-3">💻</div>
              <h3 className="font-medium text-gray-800">Tecnología</h3>
            </Link>

            {/* Category 5 */}
            <Link
              href="/servicios#legal"
              className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-[#1e3a8a] hover:shadow-sm transition-all"
            >
              <div className="text-4xl mb-3">⚖️</div>
              <h3 className="font-medium text-gray-800">Legal</h3>
            </Link>

            {/* Category 6 */}
            <Link
              href="/servicios"
              className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-[#1e3a8a] hover:shadow-sm transition-all"
            >
              <div className="text-4xl mb-3">➕</div>
              <h3 className="font-medium text-gray-800">Ver todos</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#1e3a8a]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Lo que dicen nuestros usuarios</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Miles de personas ya han encontrado el profesional perfecto a través de Kualify.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic">{testimonial.quote}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-white/10 px-6 py-3 rounded-full text-white">
              <Award className="h-6 w-6 mr-2" />
              <span className="font-medium">Más de 10,000 servicios completados con éxito</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Preguntas frecuentes</h2>
            <p className="text-xl text-gray-600">Respuestas a las dudas más comunes sobre nuestro servicio.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <h3 className="font-medium text-lg text-gray-800">{faq.question}</h3>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${openFaq === faq.id ? "transform rotate-180" : ""}`}
                  />
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-6 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2d4eaa] rounded-2xl overflow-hidden shadow-xl">
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  ¿Listo para encontrar al profesional perfecto?
                </h2>
                <p className="text-white/90 text-lg mb-6">
                  Únete a miles de personas que ya han encontrado el servicio que necesitaban. Empieza a buscar ahora y
                  conecta con profesionales verificados en minutos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/registro"
                    className="bg-[#10b981] hover:bg-[#0d9668] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
                  >
                    Crear cuenta gratis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    href="/profesionales"
                    className="bg-white text-[#1e3a8a] hover:bg-gray-100 font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
                  >
                    Explorar profesionales
                  </Link>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="relative w-64 h-64">
                  <ThumbsUp className="h-32 w-32 text-white/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
