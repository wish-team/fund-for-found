import { Brand } from "../store/brandStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export class BrandService {
  static async getBrands(): Promise<Brand[]> {
    try {
      const response = await fetch(`${BASE_URL}/brand`);
      if (!response.ok) throw new Error("Failed to fetch brands");
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  static async getBrand(id: string): Promise<Brand> {
    try {
      const response = await fetch(`${BASE_URL}/brand/${id}`);
      if (!response.ok) throw new Error("Failed to fetch brand");
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  static async createBrand(data: Brand): Promise<Brand> {
    try {
      const response = await fetch(`${BASE_URL}/brand`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create brand");
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  static async updateBrand(id: string, data: Partial<Brand>): Promise<Brand> {
    try {
      const response = await fetch(`${BASE_URL}/brand/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update brand");
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  static async deleteBrand(id: string): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}/brand/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete brand");
    } catch (error) {
      throw error;
    }
  }
}
