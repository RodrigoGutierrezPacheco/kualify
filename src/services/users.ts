import { User } from "../utils/interfaces/usertInterfaces";
const APP_URL = process.env.NEXT_PUBLIC_API_URL;

export interface UpdateUserInfo{
  username: string
  email: string
  phoneNumber: string
}

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

export const getUserInfo = async (id:string,token:string) =>{
  try {
    const response = await fetch(`${APP_URL}/users/${id}`, {
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
}

export const updateUserInfo = async (
  id: string,
  form: UpdateUserInfo,
  token: string
) => {
  try {
    const response = await fetch(`${APP_URL}/users/${id}`, {
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
