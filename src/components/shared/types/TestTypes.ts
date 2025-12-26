import type { User } from "./AuthTypes";
import type { QuestionType } from "./QuestionTypes";

export type CategoryType = {
  id: number;
  name: string;
  created_at?: string;
  questions_count?: number;
  user_tests_count?: number;
};

export interface StartTestPayload {
  category_id: number;
  min_difficulty: number;
  max_difficulty: number;
}

export type UserTestAnswer = {
  id: number;
  user_test_id: number;
  question_id: number;
  question: QuestionType;
  answer: (string | number)[] | null;
  user_id: number;
  is_correct: boolean;
  created_at: string;
  updated_at: string;
};

export type TestType = {
  id: number;
  title: string;
  description: string | null;
  category_id: number;
  category: CategoryType;
  questions?: QuestionType[];
  is_available: boolean;
  author_id: number;
  author: User;
  closed_at: string;
  created_at: string;
  updated_at: string;
};

export type UserTestType = {
  id: number;
  test_id: number | null;
  test?: TestType;
  user_id: number;
  user?: User;
  closed_at: string | null;
  is_completed?: boolean;
  score?: number;
  is_available: boolean;
  answers?: UserTestAnswer[];
  created_at: string;
  updated_at: string;
};

export type SubmitAnswerPayload = {
  answerId: number;
  answer: (string | number)[];
};

export type PaginatedTests = {
  data: TestType[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      page: number | null;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
  };
};
