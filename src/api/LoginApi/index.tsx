// src/api/auth.ts
import { BASIC_URL } from "../index";
interface LoginValues {
  username: string;
  password: string;
}

interface LoginResponse {
  token?: string;
  user?: Record<string, any>; // Optional: adjust if user data is returned
  message?: string;
}

export const Authentication = async (
  values: LoginValues
): Promise<{ data: LoginResponse }> => {
  try {
    const response = await fetch(`${BASIC_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const data: LoginResponse = await response.json();

    if (response.ok && data.token) {
      localStorage.setItem('TOKEN', data.token);
    }

    return { data };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
