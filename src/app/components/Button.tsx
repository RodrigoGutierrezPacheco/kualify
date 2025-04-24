// Componente Button personalizado con tipos correctos
import { type ReactNode, type ButtonHTMLAttributes } from "react"
// Definición de tipos para el componente Button
type ButtonVariant = "default" | "outline" | "ghost" | "emerald"
type ButtonSize = "default" | "sm" | "lg" | "icon"
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    className?: string
    variant?: ButtonVariant
    size?: ButtonSize
}
const Button = ({ children, className = "", variant = "default", size = "default", ...props }: ButtonProps) => {
    const baseStyles =
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

    const variants: Record<ButtonVariant, string> = {
        default: "bg-[#1E3A8A] text-white hover:bg-[#152C6C]",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        emerald: "bg-[#00C897] hover:bg-[#00A77D] text-white border-none",
    }

    const sizes: Record<ButtonSize, string> = {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-12 px-8 rounded-md text-lg",
        icon: "h-10 w-10",
    }

    return (
        <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button