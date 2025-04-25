export interface UserViewProps {
    id: string | null
}

export default function UserView({id}:UserViewProps) {
    console.log(id)
    return (
        <div>
            <span>Vista usuario</span>
        </div>
    )
}