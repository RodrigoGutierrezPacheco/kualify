import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <Link href="/" className="flex items-center mb-4">
                            <div className="relative h-10 w-10 mr-2">
                                <div className="absolute inset-0 bg-[#1E3A8A] rounded-full"></div>
                                <div className="absolute inset-[3px] bg-white rounded-full flex items-center justify-center">
                                    <span className="text-[#00C897] font-bold text-lg">K</span>
                                </div>
                            </div>
                            <span className="text-xl font-bold text-white">Kualify</span>
                        </Link>
                        <p className="mb-4">Conectamos talento con necesidad</p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-300 hover:text-white">
                                <i className="fab fa-facebook-f h-6 w-6"></i>
                            </Link>
                            <Link href="#" className="text-gray-300 hover:text-white">
                                <i className="fab fa-twitter h-6 w-6"></i>
                            </Link>
                            <Link href="#" className="text-gray-300 hover:text-white">
                                <i className="fab fa-instagram h-6 w-6"></i>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Servicios</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Servicios Médicos
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Servicios del Hogar
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Servicios Técnicos
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Servicios Educativos
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Ver todos
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Empresa</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Sobre nosotros
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Cómo funciona
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Testimonios
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Términos de servicio
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Política de privacidad
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Política de cookies
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Preguntas frecuentes
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                    <p>&copy; {new Date().getFullYear()} Kualify. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}