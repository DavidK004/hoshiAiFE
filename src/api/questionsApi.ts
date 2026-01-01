import type { Variant } from "../components/shared/types/QuestionTypes";
import axiosInstance from "./axiosInstance";

type GetQuestionsParams = {
  page?: number;
  id?: number;
};

export type QuestionPayload = {
  title: string;
  description?: string;
  type: "single" | "multiple" | "text";
  difficulty: number;
  variants: Variant[];
  correct_answers: number[] | string[];
  category_id: number;
};

export type OpenaiPayload = {
  type: "single" | "multiple" | "text";
  category_id: number;
  language: string;
  difficulty: number;
  promt: string;
};

type OpenaiGenerateResponse = {
  question: QuestionPayload;
};

export const getQuestions = async ({ page = 1, id }: GetQuestionsParams) => {
  const params: Record<string, any> = { page };
  if (id) params.category_id = id;

  const { data } = await axiosInstance.get("/api/questions", { params });

  return data;
};

export const getQuestionById = async (id: number) => {
  const response = await axiosInstance.get(`/api/questions/${id}`);
  return response.data.data;
};

export const createQuestion = async (payload: QuestionPayload) => {
  const res = await axiosInstance.post("/api/questions", payload);
  return res.data;
};

export const updateQuestion = async (id: number, payload: QuestionPayload) => {
  const res = await axiosInstance.put(`/api/questions/${id}`, payload);
  return res.data;
};

export const deleteQuestion = async (id: number) => {
  const res = await axiosInstance.delete(`/api/questions/${id}`);
  return res.data;
};

export const openaiGenerateQuestion = async (
  payload: OpenaiPayload
): Promise<QuestionPayload> => {
  const res = await axiosInstance.post<OpenaiGenerateResponse>(
    '/api/questions/openai-generate',
    payload
  );

  return res.data.question;
};
