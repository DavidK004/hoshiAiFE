import { useQuery } from "@tanstack/react-query";
import { getQuestionById } from "../../api/questionsApi";

export const useQuestionById = (id?: number) => {
  return useQuery({
    queryKey: ["single-question", id],
    queryFn: () => getQuestionById(Number(id)),
  });
};
