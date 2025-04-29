import {
  Professional,
  UpdateProfessionalBasicInfo,
} from "../utils/interfaces/professionalInterfaces";
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

export const getProfessionalInfo = async (id: string, token: string) => {
  try {
    const response = await fetch(`${APP_URL}/profesionals/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    return error;
  }
};

export const getProfessionalDocuments = async (id: string, token: string) => {
  try {
    const response = await fetch(`${APP_URL}/profesionales/${id}/documentos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    return error;
  }
};

export const uploadProfessionalDocument = async (
  id: string,
  formData: FormData,
  token: string
) => {
  try {
    const response = await fetch(`${APP_URL}/profesionales/${id}/documentos`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    return response.json();
  } catch (error) {
    return error;
  }
};

export const updateProfessionalInfo = async (
  id: string,
  form: UpdateProfessionalBasicInfo,
  token: string
) => {
  try {
    const response = await fetch(`${APP_URL}/profesionals/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    return response.json();
  } catch (error) {
    return error;
  }
};
