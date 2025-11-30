export type Variant = {
  id: number;
  text: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Author = {
  id: number;
  username: string;
};

export type QuestionType = {
  id: number;
  title: string;
  description: string;
  type: "single" | "multiple" | "text";
  difficulty: number;
  variants: Variant[];
  correct_answers: number[] | string[];
  category: Category;
  author: Author;
};