import { FAQFormData } from '../types/accordion';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;

export const faqApi = {
  getAllFAQs: async () => {
    const response = await fetch(`${BASE_URL}/faq/2fe19d5d-767b-4640-beba-d2321df887f9`);
    if (!response.ok) throw new Error('Failed to fetch FAQs');
    return response.json();
  },

  createFAQ: async (data: FAQFormData) => {
    const response = await fetch(`${BASE_URL}/faq`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: data.title,
        answer: data.content
      })
    });
    if (!response.ok) throw new Error('Failed to create FAQ');
    return response.json();
  },

  updateFAQ: async (id: string, data: FAQFormData) => {
    const response = await fetch(`${BASE_URL}/faq/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: data.title,
        answer: data.content
      })
    });
    if (!response.ok) throw new Error('Failed to update FAQ');
    return response.json();
  },

  deleteFAQ: async (id: string) => {
    const response = await fetch(`${BASE_URL}/faq/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete FAQ');
    return response.json();
  }
}; 