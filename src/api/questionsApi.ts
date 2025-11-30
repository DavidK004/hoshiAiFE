import axiosInstance from "./axiosInstance";



type GetQuestionsParams = {
  page?: number;
  id?: number;
};

export const getQuestions = async ({ page = 1, id }: GetQuestionsParams) => {
  const params: Record<string, any> = { page };
  if (id) params.category_id = id;

  const { data } = await axiosInstance.get(
    "/api/questions",
    { params }
  );

  return data;
};

export const getQuestionById = async (id: number) => {
  const response = await axiosInstance.get(`/api/questions/${id}`);
  return response.data.data;
};
