"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import Button from "./Button"
import { User, LogOut, Menu, X, Settings, UserCircle } from "lucide-react"
import RegistrationModal from "./Modals/CreateUser"
import Login from "./Modals/Login"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenLogin, setIsOpenLogin] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState("")
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0)

    const userMenuRef = useRef<HTMLDivElement>(null)
    const userButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        // Solo ejecutar en el cliente
        if (typeof window !== "undefined") {
            // Check if user is logged in when component mounts
            const checkAuthStatus = () => {
                const token = localStorage.getItem("tokenK")
                if (token) {
                    setIsLoggedIn(true)
                    // Try to get user name from localStorage if available
                    const userInfo = localStorage.getItem("userInfo")
                    if (userInfo) {
                        try {
                            const parsedUserInfo = JSON.parse(userInfo)
                            setUserName(parsedUserInfo.name || "Usuario")
                        } catch (e) {
                            console.log(e)
                            setUserName("Usuario")
                        }
                    }
                } else {
                    setIsLoggedIn(false)
                    setUserName("")
                }
            }

            checkAuthStatus()

            // Add event listener for storage changes (in case user logs in/out in another tab)
            window.addEventListener("storage", checkAuthStatus)

            // Handle window resize
            const handleResize = () => {
                setWindowWidth(window.innerWidth)
                // Close mobile menu on larger screens
                if (window.innerWidth >= 640) {
                    setMobileMenuOpen(false)
                }
            }

            window.addEventListener("resize", handleResize)
            handleResize()

            // Handle clicks outside user menu to close it
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    userMenuRef.current &&
                    !userMenuRef.current.contains(event.target as Node) &&
                    userButtonRef.current &&
                    !userButtonRef.current.contains(event.target as Node)
                ) {
                    setUserMenuOpen(false)
                }
            }

            document.addEventListener("mousedown", handleClickOutside)

            return () => {
                window.removeEventListener("storage", checkAuthStatus)
                window.removeEventListener("resize", handleResize)
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("tokenK")
        localStorage.removeItem("userInfo")
        setIsLoggedIn(false)
        setUserName("")
        setUserMenuOpen(false)
        // Redirect to home or login page if needed
        window.location.href = "/"
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
        if (userMenuOpen) setUserMenuOpen(false)
    }

    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen)
        if (mobileMenuOpen) setMobileMenuOpen(false)
    }

    const isMobile = windowWidth < 640
    const isTablet = windowWidth >= 640 && windowWidth < 768
    const isSmallDesktop = windowWidth >= 768 && windowWidth < 1024

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-2 sm:px-4 lg:px-6">
                <div className="flex justify-between items-center h-14 sm:h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/images/kualify.png"
                                alt="Logo"
                                width={isMobile ? 36 : isTablet ? 40 : 50}
                                height={isMobile ? 36 : isTablet ? 40 : 50}
                                className="object-contain"
                            />
                            <span
                                className={`font-bold text-[#1E3A8A] ml-2 ${isMobile ? "text-base" : isTablet ? "text-lg" : "text-xl"}`}
                            >
                                Kualify
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation - Hidden on mobile, visible on tablet and up */}
                    <nav className={`hidden ${isTablet ? "sm:flex space-x-2" : "md:flex space-x-4 lg:space-x-6"}`}>
                        <Link
                            href="#servicios"
                            className="text-gray-600 hover:text-[#1E3A8A] font-medium transition-colors whitespace-nowrap text-sm sm:text-base"
                        >
                            Servicios
                        </Link>
                        <Link
                            href="#como-funciona"
                            className="text-gray-600 hover:text-[#1E3A8A] font-medium transition-colors whitespace-nowrap text-sm sm:text-base"
                        >
                            Cómo funciona
                        </Link>
                        <Link
                            href="#profesionales"
                            className="text-gray-600 hover:text-[#1E3A8A] font-medium transition-colors whitespace-nowrap text-sm sm:text-base"
                        >
                            Profesionales
                        </Link>
                        <Link
                            href="#contacto"
                            className="text-gray-600 hover:text-[#1E3A8A] font-medium transition-colors whitespace-nowrap text-sm sm:text-base"
                        >
                            Contacto
                        </Link>
                    </nav>

                    {/* Right side buttons/user menu */}
                    <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4 flex-shrink-0">
                        {isLoggedIn ? (
                            <div className="relative">
                                <button
                                    ref={userButtonRef}
                                    onClick={toggleUserMenu}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-[#1E3A8A] focus:outline-none transition-colors p-1 rounded-full hover:bg-gray-100"
                                    aria-expanded={userMenuOpen}
                                    aria-haspopup="true"
                                >
                                    {/* On larger screens show name and avatar */}
                                    <div className="hidden sm:flex items-center space-x-2">
                                        <div className="h-8 w-8 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white">
                                            <User className="h-5 w-5" />
                                        </div>
                                        {isSmallDesktop ? (
                                            <span className="font-medium max-w-[80px] truncate">{userName}</span>
                                        ) : (
                                            <span className="font-medium">{userName}</span>
                                        )}
                                    </div>
                                    {/* On mobile just show avatar */}
                                    <div className="sm:hidden h-8 w-8 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white">
                                        <User className="h-5 w-5" />
                                    </div>
                                </button>

                                {/* User dropdown menu */}
                                {userMenuOpen && (
                                    <div
                                        ref={userMenuRef}
                                        className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200 animate-in fade-in duration-200"
                                    >
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
                                        </div>
                                        <Link
                                            href="/perfil"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <UserCircle className="h-4 w-4 mr-2 text-gray-500" />
                                            Mi Perfil
                                        </Link>
                                        <Link
                                            href="/configuracion"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <Settings className="h-4 w-4 mr-2 text-gray-500" />
                                            Configuración
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors flex items-center"
                                        >
                                            <LogOut className="h-4 w-4 mr-2" />
                                            Cerrar sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                {/* Login/Register buttons - Adapt size based on screen */}
                                <Button
                                    onClick={() => {
                                        setIsOpenLogin(true)
                                    }}
                                    variant="outline"
                                    className={`
                    hidden sm:flex border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white transition-colors
                    text-xs sm:text-sm md:text-base
                    px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2
                  `}
                                >
                                    {isTablet ? "Iniciar" : isSmallDesktop ? "Iniciar" : "Iniciar sesión"}
                                </Button>
                                <Button
                                    onClick={() => setIsOpen(true)}
                                    variant="emerald"
                                    className={`
                    hidden sm:flex transition-colors
                    text-xs sm:text-sm md:text-base
                    px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2
                  `}
                                >
                                    {isTablet ? "Registro" : isSmallDesktop ? "Registro" : "Registrarse"}
                                </Button>
                            </>
                        )}

                        {/* Mobile menu toggle button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="sm:hidden"
                            onClick={toggleMobileMenu}
                            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu - Slide down animation */}
                {mobileMenuOpen && (
                    <div className="sm:hidden py-4 border-t animate-in slide-in-from-top duration-300 max-h-[calc(100vh-4rem)] overflow-y-auto">
                        <nav className="flex flex-col space-y-4">
                            <Link
                                href="#servicios"
                                className="text-gray-600 hover:text-[#1E3A8A] font-medium px-4 py-2 hover:bg-gray-50 rounded-md transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Servicios
                            </Link>
                            <Link
                                href="#como-funciona"
                                className="text-gray-600 hover:text-[#1E3A8A] font-medium px-4 py-2 hover:bg-gray-50 rounded-md transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Cómo funciona
                            </Link>
                            <Link
                                href="#profesionales"
                                className="text-gray-600 hover:text-[#1E3A8A] font-medium px-4 py-2 hover:bg-gray-50 rounded-md transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Profesionales
                            </Link>
                            <Link
                                href="#contacto"
                                className="text-gray-600 hover:text-[#1E3A8A] font-medium px-4 py-2 hover:bg-gray-50 rounded-md transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contacto
                            </Link>

                            {isLoggedIn ? (
                                <div className="px-4 pt-2 space-y-2 border-t border-gray-100 mt-2">
                                    <div className="flex items-center space-x-2 py-2">
                                        <div className="h-8 w-8 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <span className="font-medium">{userName}</span>
                                    </div>
                                    <Link
                                        href="/perfil"
                                        className="flex items-center py-2 text-gray-700 hover:text-[#1E3A8A] transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <UserCircle className="h-4 w-4 mr-2 text-gray-500" />
                                        Mi Perfil
                                    </Link>
                                    <Link
                                        href="/configuracion"
                                        className="flex items-center py-2 text-gray-700 hover:text-[#1E3A8A] transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Settings className="h-4 w-4 mr-2 text-gray-500" />
                                        Configuración
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left py-2 text-red-600 hover:text-red-700 transition-colors flex items-center"
                                    >
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Cerrar sesión
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col space-y-2 px-4 pt-2 border-t border-gray-100 mt-2">
                                    <Button
                                        onClick={() => {
                                            setIsOpenLogin(true)
                                            setMobileMenuOpen(false)
                                        }}
                                        variant="outline"
                                        className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white w-full transition-colors"
                                    >
                                        Iniciar sesión
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setIsOpen(true)
                                            setMobileMenuOpen(false)
                                        }}
                                        variant="emerald"
                                        className="w-full transition-colors"
                                    >
                                        Registrarse
                                    </Button>
                                </div>
                            )}
                        </nav>
                    </div>
                )}
            </div>
            {isOpen && <RegistrationModal isOpen={isOpen} setIsOpen={setIsOpen} />}
            {isOpenLogin && <Login isOpen={isOpenLogin} setIsOpen={setIsOpenLogin} />}
        </header>
    )
}
