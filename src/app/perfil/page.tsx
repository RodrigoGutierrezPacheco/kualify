"use client"

import { useAuth } from "@/context/AuthContext";
import UserView from "./User";
import ProfessionalView from "./Professional";

export default function Perfil() {
    const { user, userId } = useAuth();    
    console.log(userId)
    
    return (
        <div>
            {user?.role === "user" 
                ? <UserView id={userId} /> 
                : <ProfessionalView id={userId} />}
        </div>
    );
}