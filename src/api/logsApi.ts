import axiosInstance from "./axiosInstance";

export type LogType = {
  id: number;
  description: string;
  created_at: string;
};

interface LogsResponse {
  data: LogType[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const getLogs = async (page = 1) => {
  const res = await axiosInstance.get<LogsResponse>("/api/logs", {
    params: { page },
  });
  return res.data;
};
