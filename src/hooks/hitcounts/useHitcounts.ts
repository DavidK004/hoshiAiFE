import { useQuery } from "@tanstack/react-query";
import { getHitCounts } from "../../api/metricsService";

export const useHitcounts = (page: number) => {
  return useQuery({
    queryKey: ["hitcounts", page],
    queryFn: () => getHitCounts(page),
  });
};