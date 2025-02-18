import {
  Tier,
  TierFormData,
} from "@/components/features/creators/contributors/types/tier";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export class TierService {
  static async getTiers(): Promise<Tier[]> {
    try {
      const response = await fetch(`${BASE_URL}/tier`);
      if (!response.ok) throw new Error("Failed to fetch tiers");
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  static async createTier(data: TierFormData): Promise<Tier> {
    try {
      const response = await fetch(`${BASE_URL}/tier`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create tier");
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  static async updateTier(
    id: string,
    data: Partial<TierFormData>
  ): Promise<Tier> {
    try {
      const response = await fetch(`${BASE_URL}/tier/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update tier");
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  static async deleteTier(id: string): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}/tier/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete tier");
    } catch (error) {
      throw error;
    }
  }
}
