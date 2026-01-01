import { useMutation } from "@tanstack/react-query";
import { openaiGenerateQuestion } from "../../api/questionsApi";
import type { OpenaiPayload } from "../../api/questionsApi";
import type { QuestionPayload } from "../../api/questionsApi";

export const useOpenaiGenerateQuestion = () => {
  return useMutation<QuestionPayload, Error, OpenaiPayload>({
    mutationFn: openaiGenerateQuestion,
  });
};
