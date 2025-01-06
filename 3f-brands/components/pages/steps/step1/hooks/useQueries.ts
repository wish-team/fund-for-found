import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { FormData } from "../types";

export const useOptionsQuery = (field: string) => {
  return useQuery({
    queryKey: ["options", field],
    queryFn: () => api.getOptions(field),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

export const useSubmitRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => api.submitRegistration(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
  });
};
