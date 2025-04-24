"use client"
export default function Perfil() {
    const userToken = localStorage.getItem('tokenK');
    console.log(userToken)
    return (
        <div>
            <span>Perfil</span>
        </div>
    )
}