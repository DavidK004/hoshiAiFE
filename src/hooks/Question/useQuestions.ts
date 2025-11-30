import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../../api/questionsApi";

type UseQuestionsParams = {
  page?: number;
  id?: number;
};

export const useQuestions = ({ page = 1, id }: UseQuestionsParams) => {
  return useQuery({
    queryKey: ["questions", { page, id }],
    queryFn: () => getQuestions({ page, id }),
    staleTime: 1000 * 60,
  });
};
