const APP_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await fetch(`${APP_URL}/auth/login/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ email, password }),
        });
        return response.json();
    } catch (error) {
        return error;
    }
};

export const loginProfessional = async (email: string, password: string) => {
    try {
        const response = await fetch(`${APP_URL}/auth/login/professional`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ email, password }),
        });
        return response.json();
    } catch (error) {
        return error;
    }
};