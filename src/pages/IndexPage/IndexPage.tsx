import { Typography, Pagination } from "@mui/material";
import { useState } from "react";
import Container from "../../components/shared/Container";
import {  WelcomeContainer } from "./IndexPage.styles";
import StartTestForm from "../../components/StartTestForm/StartTestForm";
import Question from "../../components/Question/Question";
import { useQuestions } from "../../hooks/Question/useQuestions";
import type { QuestionType } from "../../components/shared/types/QuestionTypes";

const IndexPage = () => {
  const [page, setPage] = useState(1);
  const questionsQuery = useQuestions({ page });

  const questions = questionsQuery.data?.data ?? [];
  const loading = questionsQuery.isLoading;
  const error = questionsQuery.error?.message ?? null;
  const meta = questionsQuery.data?.meta ?? null;


  return (
    <Container>
      <WelcomeContainer>
        <Typography variant="h2">Welcome To HoshiAI!</Typography>
        <Typography variant="subtitle1">The best place to learn!</Typography>
      </WelcomeContainer>

      <StartTestForm />

      <Typography sx={{ mb: "36px" }} variant="h3">
        Browse Questions
      </Typography>

      {loading && <Typography>Loading questions...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {questions.map((q: QuestionType) => (
        <Question key={q.id} question={q} />
      ))}

      {meta && meta.last_page > 1 && (
        <Pagination
          count={meta.last_page}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          shape="rounded"
          sx={{ mt: 3, mb: 3, display: "flex", justifyContent: "center" }}
        />
      )}
    </Container>
  );
};

export default IndexPage;
