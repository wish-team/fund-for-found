import axios from "axios";
import { FormData } from "../types";
import i18next from "i18next";

const API_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const getOptions = async (endpoint: string) => {
  const currentLang = i18next.language || "en";
  
  try {
    const { data } = await api.get<{
      [key: string]: Array<{ id: number; name: string }>;
    }>(`/${endpoint}`);
    
    // Return the options for the current language, falling back to English if not available
    return (data[currentLang] || data["en"] || []).map((item) => ({
      id: item.id,
      name: item.name,
    }));
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
};

interface RegistrationResponse extends FormData {
  id: string;
}

export const submitRegistration = async (
  formData: FormData,
  registrationId?: string
) => {
  try {
    if (registrationId) {
      const { data } = await api.put<RegistrationResponse>(
        `/registrations/${registrationId}`,
        formData
      );
      return data;
    } else {
      const { data } = await api.post<RegistrationResponse>(
        "/registrations",
        formData
      );
      return data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'step1.toast.error.default');
    }
    throw error;
  }
};

export const getRegistration = async (registrationId: string) => {
  try {
    const { data } = await api.get<RegistrationResponse>(
      `/registrations/${registrationId}`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'step1.toast.error.server');
    }
    throw error;
  }
};