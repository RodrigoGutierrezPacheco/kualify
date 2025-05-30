"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import RegistrationModal from "@/components/Modals/Create"
import RegistrationModalProfessional from "@/components/Modals/CreateProfessional"
import Login from "@/components/Modals/Login"
import Button from "@/components/ui/button"
import SearchSection from "@/components/ui/searchSection"
import { useRouter } from "next/navigation"
import Footer from "@/components/ui/footer"

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenProf, setIsOpenProf] = useState(false)
  const [isOpenLogin, setIsOpenLogin] = useState(false)
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1E3A8A] to-[#2C4A9A] text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Conectamos talento con necesidad</h1>
              <p className="text-lg md:text-xl mb-8 text-gray-100">
                Encuentra profesionales calificados para todos tus servicios: médicos, trabajos del hogar y mucho más.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => router.push("/profesionales")} className="cursor-pointer" variant="emerald" size="lg">
                  Buscar profesionales
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-[#1E3A8A] cursor-pointer"
                  onClick={() => {
                    setIsOpenProf(true)
                  }}
                >
                  Ofrecer mis servicios
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#00C897] rounded-full opacity-20"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#00C897] rounded-full opacity-20"></div>
                <Image
                  src="/images/kualify.png"
                  alt="Profesionales de Kualify"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <SearchSection />

      {/* Services Section */}
      <section id="servicios" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">Nuestros Servicios</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conectamos a personas con profesionales calificados en diversas áreas para satisfacer todas tus
              necesidades.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
              <div className="p-1 bg-[#1E3A8A]"></div>
              <div className="p-6">
                <div className="w-14 h-14 bg-[#1E3A8A]/10 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-stethoscope h-7 w-7 text-[#1E3A8A]"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Servicios Médicos</h3>
                <p className="text-gray-600 mb-4">
                  Consulta con médicos, enfermeros y especialistas de la salud desde la comodidad de tu hogar.
                </p>
                <Link href="#" className="text-[#00C897] font-medium flex items-center">
                  Ver profesionales <i className="fas fa-chevron-right h-4 w-4 ml-1"></i>
                </Link>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
              <div className="p-1 bg-[#00C897]"></div>
              <div className="p-6">
                <div className="w-14 h-14 bg-[#00C897]/10 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-home h-7 w-7 text-[#00C897]"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Servicios del Hogar</h3>
                <p className="text-gray-600 mb-4">
                  Encuentra profesionales para reparaciones, limpieza, jardinería y todo lo que tu hogar necesite.
                </p>
                <Link href="#" className="text-[#00C897] font-medium flex items-center">
                  Ver profesionales <i className="fas fa-chevron-right h-4 w-4 ml-1"></i>
                </Link>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
              <div className="p-1 bg-[#1E3A8A]"></div>
              <div className="p-6">
                <div className="w-14 h-14 bg-[#1E3A8A]/10 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-tools h-7 w-7 text-[#1E3A8A]"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Servicios Técnicos</h3>
                <p className="text-gray-600 mb-4">
                  Técnicos especializados en electrónica, computación, instalaciones y más a tu disposición.
                </p>
                <Link href="#" className="text-[#00C897] font-medium flex items-center">
                  Ver profesionales <i className="fas fa-chevron-right h-4 w-4 ml-1"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button onClick={() => {
              router.push('/servicios')
            }} className="cursor-pointer">Ver todos los servicios</Button>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">¿Cómo funciona?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conectarte con profesionales calificados nunca ha sido tan fácil. Sigue estos simples pasos:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1E3A8A] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Busca el servicio</h3>
              <p className="text-gray-600">Explora nuestra amplia gama de servicios y encuentra el que necesitas.</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00C897] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Conecta con profesionales</h3>
              <p className="text-gray-600">
                Revisa perfiles, calificaciones y elige al profesional que mejor se adapte a tus necesidades.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1E3A8A] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Recibe el servicio</h3>
              <p className="text-gray-600">
                Coordina la cita, recibe el servicio y califica tu experiencia para ayudar a otros usuarios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <Image
                src="/images/kualify.png"
                alt="Beneficios de Kualify"
                width={500}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-6">¿Por qué elegir Kualify?</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-[#00C897]/10 rounded-full flex items-center justify-center">
                      <i className="fas fa-shield-alt h-5 w-5 text-[#00C897]"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">Profesionales verificados</h3>
                    <p className="mt-2 text-gray-600">
                      Todos nuestros profesionales pasan por un riguroso proceso de verificación.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-[#1E3A8A]/10 rounded-full flex items-center justify-center">
                      <i className="fas fa-heart h-5 w-5 text-[#1E3A8A]"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">Calidad garantizada</h3>
                    <p className="mt-2 text-gray-600">
                      Sistema de calificaciones y reseñas para asegurar la mejor experiencia.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-[#00C897]/10 rounded-full flex items-center justify-center">
                      <i className="fas fa-clock h-5 w-5 text-[#00C897]"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">Rápido y conveniente</h3>
                    <p className="mt-2 text-gray-600">
                      Encuentra profesionales disponibles cerca de ti en cuestión de minutos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1E3A8A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Listo para encontrar el profesional que necesitas?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Únete a miles de personas que ya confían en Kualify para conectar con los mejores profesionales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="emerald" size="lg">
                Buscar profesionales
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white hover:text-[#1E3A8A]"
              >
                Ofrecer mis servicios
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      {isOpen && <RegistrationModal isOpen={isOpen} setIsOpen={setIsOpen} />}
      {isOpenProf && <RegistrationModalProfessional isOpen={isOpenProf} setIsOpen={setIsOpenProf} />}
      {isOpenLogin && <Login isOpen={isOpenLogin} setIsOpen={setIsOpenLogin} />}
    </div>
  )
}
