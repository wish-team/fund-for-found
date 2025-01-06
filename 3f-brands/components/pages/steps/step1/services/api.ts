import axios from "axios";
import { FormData } from "../types";

const API_URL = "http://localhost:8000";

export const api = {
  // Fetch options for autocomplete
  getOptions: async (field: string) => {
    try {
      const response = await axios.get(`${API_URL}/${field}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${field} options:`, error);
      throw error;
    }
  },

  // Submit form data
  submitRegistration: async (data: FormData) => {
    try {
      const response = await axios.post(`${API_URL}/registrations`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error details:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
      }
      throw error;
    }
  },
};