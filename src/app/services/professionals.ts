import { Professional } from "../utils/interfaces/professionalInterfaces";
const APP_URL = process.env.NEXT_PUBLIC_API_URL;

export const createProfessional = async (form: Professional) => {
  try {
    const response = await fetch(`${APP_URL}/profesionals`, {
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
