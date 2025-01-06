import axios from "axios";
import { FormData } from "../types";

const API_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const getOptions = async (endpoint: string) => {
  const { data } = await api.get<Array<{ id: number; name: string }>>(
    `/${endpoint}`
  );
  return data.map((item) => item.name);
};

interface RegistrationResponse extends FormData {
  id: string;
}

export const submitRegistration = async (
  formData: FormData,
  registrationId?: string
) => {
  if (registrationId) {
    // Update existing registration
    const { data } = await api.put<RegistrationResponse>(
      `/registrations/${registrationId}`,
      formData
    );
    return data;
  } else {
    // Create new registration
    const { data } = await api.post<RegistrationResponse>(
      "/registrations",
      formData
    );
    return data;
  }
};

export const getRegistration = async (registrationId: string) => {
  const { data } = await api.get<RegistrationResponse>(
    `/registrations/${registrationId}`
  );
  return data;
};