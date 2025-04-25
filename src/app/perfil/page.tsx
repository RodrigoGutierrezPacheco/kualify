"use client"

import { useAuth } from "@/context/AuthContext";

export default function Perfil() {
    const { user } = useAuth();
    console.log(user)
    return (
        <div>
            <span>Perfil</span>
        </div>
    )
}