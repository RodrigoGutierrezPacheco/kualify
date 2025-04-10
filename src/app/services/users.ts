import { User } from "../utils/interfaces/usertInterfaces";
const APP_URL = process.env.NEXT_PUBLIC_API_URL;

export const createUser = async (form: User) => {
  try {
    const response = await fetch(`${APP_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(form),
    });
    return response.json();
  } catch (error) {
    return error;
  }
};
