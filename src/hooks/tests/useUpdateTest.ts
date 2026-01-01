import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTest, type TestPayload } from "../../api/testApi";

import { toast } from "react-toastify";

export const useUpdateTest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: TestPayload }) =>
      updateTest(id, payload),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tests"] });
      queryClient.invalidateQueries({ queryKey: ["tests", variables.id] });
      toast.success("Test updated");
    },

    onError: (error: any) => {
      toast.error(error.message ?? "Failed to update test");
    },
  });
};
