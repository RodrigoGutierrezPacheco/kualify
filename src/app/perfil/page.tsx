"use client"

import { useAuth } from "@/context/AuthContext";
import UserView from "./User";
import ProfessionalView from "./Professional/Professional";

export default function Perfil() {
    const { user, userId } = useAuth();    

    return (
        <div>
            {user?.role === "user" 
                ? <UserView id={userId} /> 
                : <ProfessionalView id={userId} />}
        </div>
    );
}