import axios from "axios";
import { FormData, ExtendedFormData } from "../types";
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

interface ExtendedRegistrationResponse extends ExtendedFormData {
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
    const { data } = await api.get<ExtendedRegistrationResponse>(
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

export const updateInfo = async (registrationId: string, formData: ExtendedFormData) => {
  try {
    const { data } = await api.put<ExtendedRegistrationResponse>(
      `/registrations/${registrationId}/info`,
      formData
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to update information');
    }
    throw error;
  }
};