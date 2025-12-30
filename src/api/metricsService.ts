import axiosInstance from "./axiosInstance";

export const hitApi = async (url: string): Promise<void> => {
  await axiosInstance.post("/api/hit", { url });
};

export interface HitCountType {
  id: number;
  ip: string;
  device_type: string;
  user_agent: string;
  country: string | null;
  url: string;
  created_at?: string;
}

export interface HitCountsResponse {
  data: HitCountType[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const getHitCounts = async (page = 1) => {
  const res = await axiosInstance.get<HitCountsResponse>("/api/hitcounts", {
    params: { page },
  });
  return res.data;
};
