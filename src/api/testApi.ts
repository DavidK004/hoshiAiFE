import {
  type TestType,
  type PaginatedTests,
  type StartTestPayload,
  type SubmitAnswerPayload,
  type UserTestType,
} from "../components/shared/types/TestTypes";
import axiosInstance from "./axiosInstance";

export const startTest = async (data: StartTestPayload) => {
  const res = await axiosInstance.post<{ data: UserTestType }>(
    "/api/user-tests",
    data
  );
  return res.data.data;
};

export const startTestById = async (id: number) => {
  const res = await axiosInstance.post<{ data: UserTestType }>(
    "/api/user-tests/by-test",
    { test_id: id }
  );
  return res.data.data;
};

export const completeUserTest = async (userTestId: number) => {
  const res = await axiosInstance.post<{ message: string }>(
    `/api/user-tests/${userTestId}/complete`
  );
  return res.data;
};

export const getUserTestById = async (userTestId: number) => {
  const res = await axiosInstance.get<{ data: UserTestType }>(
    `/api/user-tests/${userTestId}`
  );
  return res.data.data;
};

export const getUserTests = async () => {
  const res = await axiosInstance.get<{ data: UserTestType[] }>(
    "/api/user-tests/me"
  );
  return res.data.data;
};

export const submitAnswer = async (data: SubmitAnswerPayload) => {
  const res = await axiosInstance.post<{ message: string }>(
    `/api/user-test-answers/${data.answerId}/submit`,
    { answer: data.answer }
  );
  return res.data;
};

export const getTests = async (categoryId?: number, page = 1) => {
  const params: Record<string, number> = { page };
  if (categoryId !== undefined) params.category_id = categoryId;

  const res = await axiosInstance.get<PaginatedTests>("/api/tests", { params });
  return res.data;
};

export const getTestById = async (id: number) => {
  const res = await axiosInstance.get<{ data: TestType }>(`/api/tests/${id}`);
  return res.data.data;
};
