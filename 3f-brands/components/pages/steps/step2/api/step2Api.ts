// src/components/pages/steps/step2/api/step2Api.ts
import { Step2FormData } from "../types";

export const submitStep2Data = async (data: Step2FormData): Promise<void> => {
  try {
    const response = await fetch("/api/step2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit step 2 data");
    }
  } catch (error) {
    console.error("Error submitting step 2 data:", error);
    throw error;
  }
};