import { useQuery } from "@tanstack/react-query";
import { getLogs } from "../../api/logsApi";

export const useLogs = (page: number) => {
  return useQuery({
    queryKey: ["logs", page],
    queryFn: () => getLogs(page),
  });
};
