const APP_URL = process.env.NEXT_PUBLIC_API_URL;


export const getAllEstados = async ()=>{
    try{
        const response = await fetch(`${APP_URL}/ubicaciones/estados`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
        })
        return response.json()
    } catch(error){
        return error
    }
}

export const getCiudades = async (estado:string) =>{
    try{
        const response = await fetch(`${APP_URL}/ubicaciones/estados/${estado}/ciudades`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
        })
        return response.json()
    }catch(error){
        return error
    }
}