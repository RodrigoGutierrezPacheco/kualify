"use client"

import { useState, useEffect } from "react"
import { Search, Filter, ChevronDown, ChevronRight, Star, Users, ArrowRight, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Tipos de datos
type ServiceCategory = {
  id: string
  name: string
  icon: string
  description: string
  services: Service[]
}

type Service = {
  id: string
  name: string
  description: string
  price: string
  priceType: "fixed" | "hourly" | "variable"
  rating: number
  reviews: number
  providers: number
  image: string
  popular: boolean
  featured?: boolean
}

export default function Servicios() {
  // Estado para búsqueda y filtros
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [priceFilter, setPriceFilter] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Datos de ejemplo - en un caso real vendrían de una API
  const serviceCategories: ServiceCategory[] = [
    {
      id: "health",
      name: "Salud y bienestar",
      icon: "🏥",
      description: "Servicios médicos, terapias y cuidado personal",
      services: [
        {
          id: "medical-consultation",
          name: "Consulta médica general",
          description: "Atención médica para diagnóstico y tratamiento de enfermedades comunes",
          price: "60€ - 120€",
          priceType: "fixed",
          rating: 4.8,
          reviews: 342,
          providers: 87,
          image: "/placeholder.svg?height=200&width=300",
          popular: true,
          featured: true,
        },
        {
          id: "physiotherapy",
          name: "Fisioterapia",
          description: "Tratamiento para lesiones musculares y rehabilitación física",
          price: "45€ - 80€",
          priceType: "fixed",
          rating: 4.7,
          reviews: 215,
          providers: 62,
          image: "/placeholder.svg?height=200&width=300",
          popular: true,
        },
        {
          id: "psychology",
          name: "Psicología",
          description: "Terapia y apoyo para la salud mental y emocional",
          price: "70€ - 110€",
          priceType: "hourly",
          rating: 4.9,
          reviews: 189,
          providers: 45,
          image: "/placeholder.svg?height=200&width=300",
          popular: false,
        },
      ],
    },
    {
      id: "home",
      name: "Hogar y reformas",
      icon: "🏠",
      description: "Servicios para mantenimiento y mejora de tu hogar",
      services: [
        {
          id: "cleaning",
          name: "Limpieza del hogar",
          description: "Servicio profesional de limpieza para casas y apartamentos",
          price: "15€ - 25€",
          priceType: "hourly",
          rating: 4.6,
          reviews: 427,
          providers: 156,
          image: "/placeholder.svg?height=200&width=300",
          popular: true,
          featured: true,
        },
        {
          id: "plumbing",
          name: "Fontanería",
          description: "Reparación e instalación de sistemas de agua y desagüe",
          price: "50€ - 120€",
          priceType: "variable",
          rating: 4.5,
          reviews: 312,
          providers: 78,
          image: "/placeholder.svg?height=200&width=300",
          popular: true,
        },
        {
          id: "electricity",
          name: "Electricidad",
          description: "Instalación y reparación de sistemas eléctricos",
          price: "60€ - 150€",
          priceType: "variable",
          rating: 4.7,
          reviews: 287,
          providers: 65,
          image: "/placeholder.svg?height=200&width=300",
          popular: false,
        },
      ],
    },
    {
      id: "education",
      name: "Educación y formación",
      icon: "📚",
      description: "Clases particulares y formación profesional",
      services: [
        {
          id: "private-lessons",
          name: "Clases particulares",
          description: "Apoyo académico personalizado para estudiantes de todas las edades",
          price: "20€ - 35€",
          priceType: "hourly",
          rating: 4.8,
          reviews: 356,
          providers: 124,
          image: "/placeholder.svg?height=200&width=300",
          popular: true,
        },
        {
          id: "language-courses",
          name: "Cursos de idiomas",
          description: "Aprende nuevos idiomas con profesores nativos",
          price: "25€ - 40€",
          priceType: "hourly",
          rating: 4.9,
          reviews: 278,
          providers: 93,
          image: "/placeholder.svg?height=200&width=300",
          popular: true,
          featured: true,
        },
        {
          id: "music-lessons",
          name: "Clases de música",
          description: "Aprende a tocar instrumentos musicales con profesionales",
          price: "30€ - 50€",
          priceType: "hourly",
          rating: 4.7,
          reviews: 198,
          providers: 67,
          image: "/placeholder.svg?height=200&width=300",
          popular: false,
        },
      ],
    },
    {
      id: "tech",
      name: "Tecnología e informática",
      icon: "💻",
      description: "Soporte técnico y servicios digitales",
      services: [
        {
          id: "computer-repair",
          name: "Reparación de ordenadores",
          description: "Solución de problemas hardware y software para tu equipo",
          price: "40€ - 100€",
          priceType: "variable",
          rating: 4.6,
          reviews: 245,
          providers: 58,
          image: "/placeholder.svg?height=200&width=300",
          popular: true,
        },
        {
          id: "web-development",
          name: "Desarrollo web",
          description: "Creación y mantenimiento de sitios web profesionales",
          price: "35€ - 60€",
          priceType: "hourly",
          rating: 4.8,
          reviews: 187,
          providers: 42,
          image: "/placeholder.svg?height=200&width=300",
          popular: false,
        },
        {
          id: "digital-marketing",
          name: "Marketing digital",
          description: "Estrategias para mejorar tu presencia online",
          price: "40€ - 70€",
          priceType: "hourly",
          rating: 4.7,
          reviews: 156,
          providers: 38,
          image: "/placeholder.svg?height=200&width=300",
          popular: true,
        },
      ],
    },
    {
      id: "legal",
      name: "Servicios legales",
      icon: "⚖️",
      description: "Asesoramiento jurídico y trámites legales",
      services: [
        {
          id: "legal-advice",
          name: "Asesoría legal",
          description: "Consulta con abogados especializados en diferentes áreas",
          price: "80€ - 150€",
          priceType: "hourly",
          rating: 4.9,
          reviews: 178,
          providers: 47,
          image: "/placeholder.svg?height=200&width=300",
          popular: true,
        },
        {
          id: "document-processing",
          name: "Gestión de documentos",
          description: "Trámites administrativos y gestión de documentación legal",
          price: "50€ - 120€",
          priceType: "variable",
          rating: 4.6,
          reviews: 134,
          providers: 39,
          image: "/placeholder.svg?height=200&width=300",
          popular: false,
        },
        {
          id: "tax-advice",
          name: "Asesoría fiscal",
          description: "Consultoría especializada en impuestos y obligaciones fiscales",
          price: "70€ - 130€",
          priceType: "hourly",
          rating: 4.8,
          reviews: 145,
          providers: 32,
          image: "/placeholder.svg?height=200&width=300",
          popular: true,
        },
      ],
    },
  ]

  // Expandir todas las categorías al inicio
  useEffect(() => {
    setExpandedCategories(serviceCategories.map((category) => category.id))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Filtrar servicios según la búsqueda y categoría seleccionada
  const filteredCategories = serviceCategories.filter((category) => {
    // Si hay una categoría seleccionada y no es esta, filtrarla
    if (selectedCategory && selectedCategory !== category.id) {
      return false
    }

    // Si hay una búsqueda, verificar si algún servicio coincide
    if (searchQuery) {
      const matchingServices = category.services.filter(
        (service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      return matchingServices.length > 0
    }

    return true
  })

  // Función para alternar la expansión de categorías
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  // Obtener servicios destacados
  const featuredServices = serviceCategories
    .flatMap((category) => category.services)
    .filter((service) => service.featured)

  // Obtener servicios populares
  const popularServices = serviceCategories
    .flatMap((category) => category.services)
    .filter((service) => service.popular)
    .slice(0, 6)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#1e3a8a] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Servicios disponibles</h1>
          <p className="text-xl max-w-3xl">
            Explora nuestra amplia gama de servicios profesionales para todas tus necesidades.
          </p>

          {/* Barra de búsqueda */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 max-w-4xl">
            <div className="relative flex-grow">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Buscar servicios..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-800 font-medium shadow-lg border-2 border-white/20 focus:border-[#10b981] focus:outline-none transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Limpiar búsqueda"
                >
                  <span className="sr-only">Limpiar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-[#10b981] hover:bg-[#0d9668] text-white font-medium py-4 px-6 rounded-xl flex items-center justify-center shadow-lg transition-all duration-200 whitespace-nowrap"
            >
              <Filter className="mr-2 h-5 w-5" />
              Filtrar
            </button>
          </div>

          {/* Panel de filtros */}
          {showFilters && (
            <div className="mt-4 p-6 bg-white rounded-xl shadow-lg max-w-4xl text-gray-800 animate-fadeIn">
              <h3 className="font-medium text-lg mb-4">Filtrar por:</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Categoría</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="all-categories"
                        name="category"
                        checked={selectedCategory === null}
                        onChange={() => setSelectedCategory(null)}
                        className="mr-2"
                      />
                      <label htmlFor="all-categories">Todas las categorías</label>
                    </div>
                    {serviceCategories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <input
                          type="radio"
                          id={`category-${category.id}`}
                          name="category"
                          checked={selectedCategory === category.id}
                          onChange={() => setSelectedCategory(category.id)}
                          className="mr-2"
                        />
                        <label htmlFor={`category-${category.id}`}>{category.name}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Precio</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="all-prices"
                        name="price"
                        checked={priceFilter === null}
                        onChange={() => setPriceFilter(null)}
                        className="mr-2"
                      />
                      <label htmlFor="all-prices">Todos los precios</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="price-low"
                        name="price"
                        checked={priceFilter === "low"}
                        onChange={() => setPriceFilter("low")}
                        className="mr-2"
                      />
                      <label htmlFor="price-low">Económico</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="price-medium"
                        name="price"
                        checked={priceFilter === "medium"}
                        onChange={() => setPriceFilter("medium")}
                        className="mr-2"
                      />
                      <label htmlFor="price-medium">Precio medio</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="price-high"
                        name="price"
                        checked={priceFilter === "high"}
                        onChange={() => setPriceFilter("high")}
                        className="mr-2"
                      />
                      <label htmlFor="price-high">Premium</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedCategory(null)
                    setPriceFilter(null)
                    setSearchQuery("")
                    setShowFilters(false)
                  }}
                  className="text-gray-600 hover:text-gray-800 mr-4"
                >
                  Limpiar filtros
                </button>
                <button onClick={() => setShowFilters(false)} className="bg-[#1e3a8a] text-white px-4 py-2 rounded-lg">
                  Aplicar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Servicios destacados */}
        {featuredServices.length > 0 && !searchQuery && !selectedCategory && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Servicios destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <Image src={service.image || "/placeholder.svg"} alt={service.name} fill className="object-cover" />
                    <div className="absolute top-3 right-3">
                      <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-sm transition-colors">
                        <Heart className="h-5 w-5 text-gray-600 hover:text-[#1e3a8a]" />
                      </button>
                    </div>
                    {service.featured && (
                      <div className="absolute top-3 left-3 bg-[#1e3a8a] text-white text-sm px-3 py-1 rounded-full">
                        Destacado
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#1e3a8a] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 font-medium">{service.rating}</span>
                        <span className="ml-1 text-gray-500 text-sm">({service.reviews} reseñas)</span>
                      </div>
                      <div className="text-gray-600 text-sm flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {service.providers} profesionales
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-gray-900">
                        {service.price}
                        <span className="text-gray-500 text-sm ml-1">
                          {service.priceType === "hourly" ? "/hora" : service.priceType === "fixed" ? "/sesión" : ""}
                        </span>
                      </div>
                      <Link
                        href={`/servicios/${service.id}`}
                        className="text-[#1e3a8a] font-medium hover:underline flex items-center"
                      >
                        Ver detalles
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Servicios populares */}
        {popularServices.length > 0 && !searchQuery && !selectedCategory && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Servicios populares</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-40">
                    <Image src={service.image || "/placeholder.svg"} alt={service.name} fill className="object-cover" />
                    <div className="absolute top-3 right-3">
                      <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-sm transition-colors">
                        <Heart className="h-5 w-5 text-gray-600 hover:text-[#1e3a8a]" />
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 hover:text-[#1e3a8a] transition-colors">
                      {service.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1">{service.rating}</span>
                      <span className="mx-1">•</span>
                      <span>{service.reviews} reseñas</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-gray-900">{service.price}</div>
                      <Link
                        href={`/servicios/${service.id}`}
                        className="text-[#1e3a8a] text-sm font-medium hover:underline"
                      >
                        Ver más
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Todas las categorías de servicios */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {searchQuery
              ? `Resultados de búsqueda: "${searchQuery}"`
              : selectedCategory
                ? `Categoría: ${serviceCategories.find((c) => c.id === selectedCategory)?.name}`
                : "Todas las categorías de servicios"}
          </h2>

          {filteredCategories.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <p className="text-gray-600 text-lg">No se encontraron servicios que coincidan con tu búsqueda.</p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory(null)
                  setPriceFilter(null)
                }}
                className="mt-4 text-[#1e3a8a] font-medium hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              {filteredCategories.map((category) => (
                <div key={category.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div
                    className="flex items-center justify-between p-6 cursor-pointer border-b border-gray-100"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{category.icon}</span>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    {expandedCategories.includes(category.id) ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>

                  {expandedCategories.includes(category.id) && (
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.services
                          .filter((service) =>
                            searchQuery
                              ? service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                service.description.toLowerCase().includes(searchQuery.toLowerCase())
                              : true,
                          )
                          .map((service) => (
                            <Link
                              href={`/servicios/${service.id}`}
                              key={service.id}
                              className="border border-gray-200 rounded-lg p-4 hover:border-[#1e3a8a] hover:shadow-sm transition-all"
                            >
                              <h4 className="font-medium text-gray-800 mb-2">{service.name}</h4>
                              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
                              <div className="flex justify-between items-center">
                                <div className="text-[#1e3a8a] font-medium">{service.price}</div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                                  {service.rating}
                                </div>
                              </div>
                            </Link>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA - Encuentra profesionales */}
        <section className="mt-16 bg-gradient-to-r from-[#1e3a8a] to-[#2d4eaa] rounded-2xl overflow-hidden shadow-lg">
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">¿Necesitas un servicio específico?</h2>
              <p className="text-white/90 text-lg mb-6">
                Encuentra profesionales cualificados para cualquier servicio que necesites. Compara perfiles, lee
                reseñas y elige el mejor profesional para ti.
              </p>
              <Link
                href="/profesionales"
                className="inline-flex items-center bg-[#10b981] hover:bg-[#0d9668] text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Buscar profesionales
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="relative w-64 h-64">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Profesionales"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Sección de preguntas frecuentes */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Preguntas frecuentes sobre nuestros servicios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">¿Cómo funciona el proceso de contratación?</h3>
              <p className="text-gray-600">
                Explora los servicios disponibles, selecciona el que necesitas, elige un profesional basándote en su
                perfil y reseñas, y contacta directamente para acordar los detalles.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">¿Cómo se garantiza la calidad de los servicios?</h3>
              <p className="text-gray-600">
                Todos los profesionales pasan por un proceso de verificación. Además, el sistema de reseñas y
                calificaciones te permite conocer la experiencia de otros clientes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">¿Puedo solicitar un presupuesto personalizado?</h3>
              <p className="text-gray-600">
                Sí, puedes contactar directamente con los profesionales para solicitar un presupuesto adaptado a tus
                necesidades específicas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">¿Qué ocurre si no estoy satisfecho con el servicio?</h3>
              <p className="text-gray-600">
                Contamos con un proceso de resolución de disputas. Contacta con nuestro servicio de atención al cliente
                y te ayudaremos a resolver cualquier problema.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/ayuda" className="text-[#1e3a8a] font-medium hover:underline">
              Ver todas las preguntas frecuentes
            </Link>
          </div>
        </div>
      </div>

      {/* Estilos adicionales */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
