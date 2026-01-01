import { useQuery } from "@tanstack/react-query";
import { getAllUserTests } from "../../api/testApi";

export const useGetAllUserTests = (
  page: number,
  test_id?: number,
  question_id?: number
) =>
  useQuery({
    queryKey: ["all-user-tests", page],
    queryFn: () => getAllUserTests(page, test_id, question_id),
  });
