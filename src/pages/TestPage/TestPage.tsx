import { useParams } from "react-router-dom";
import Container from "../../components/shared/Container";
import { useUserTestById } from "../../hooks/Tests/useUserTestById";
import { useState } from "react";
import { Box, Button, Pagination, Typography } from "@mui/material";
import TestQuestion from "../../components/TestQuestion/TestQuestion";
import { useSubmitAnswer } from "../../hooks/Tests/useSubmitAnswer";
import { useCompleteTest } from "../../hooks/Tests/useCompleteTest";
import LearningAnswers from "../../components/Answers/Answers";
import { formatDate } from "../../utils/functions";

export const TestPage = () => {
  const { id } = useParams();
  const { data: test, isLoading, error } = useUserTestById(Number(id));
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const submitAnswerMutation = useSubmitAnswer();
  const completeTestMutation = useCompleteTest();
  const allAnswered = test?.answers?.every((ans) => ans.answer !== null);

  const handleCompleteTest = () => {
    if (test) completeTestMutation.mutate(test.id);
  };

  if (isLoading)
    return (
      <Container>
        <Typography variant="h6" color="textSecondary">
          Loading your test, please wait...
        </Typography>
      </Container>
    );

  if (error)
    return (
      <Container>
        <Typography variant="h6" color="error">
          Oops! An error occurred: {error.message}
        </Typography>
      </Container>
    );

  if (!test)
    return (
      <Container>
        <Typography variant="h6" color="textSecondary">
          No test found.
        </Typography>
      </Container>
    );

  if (!test.is_available && !test.is_completed)
    return (
      <Container>
        <Typography variant="h6" color="textSecondary">
          This test is no longer available.
        </Typography>
      </Container>
    );

  if (test.is_completed) {
    return (
      <Container>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Results
        </Typography>
        <Typography variant="h5" color="secondary" sx={{ mb: 3 }}>
          Your score: {test.score}%
        </Typography>

        {test?.answers?.map((ans) => (
          <Box key={ans.question_id} sx={{ mb: 4 }}>
            <Typography variant="h6">{ans.question.title}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {ans.question.description}
            </Typography>

            <LearningAnswers
              type={ans.question.type as "single" | "multiple" | "text"}
              variants={ans.question.variants}
              correctAnswers={ans.question.correct_answers}
              userAnswers={ans.answer as number[]}
            />
          </Box>
        ))}
      </Container>
    );
  }
  const questionsAndAnswers = test.answers;
  const currentQA = questionsAndAnswers?.[currentQuestion - 1];

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h2">{test.test?.title ?? "User Test"}</Typography>
        <Typography variant="subtitle1">
          Expires at: {test.closed_at ? formatDate(test.closed_at) : "N/A"}
        </Typography>
      </Box>
      {currentQA ? (
        <TestQuestion
          qa={questionsAndAnswers[currentQuestion - 1]}
          onSubmit={(ans) =>
            submitAnswerMutation.mutate({
              answerId: questionsAndAnswers[currentQuestion - 1].id,
              answer: ans,
            })
          }
        />
      ) : (
        <Typography>No question found.</Typography>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Pagination
          count={questionsAndAnswers?.length}
          shape="rounded"
          color="primary"
          page={currentQuestion}
          onChange={(_, page) => setCurrentQuestion(page)}
        />

        {currentQuestion == questionsAndAnswers?.length && (
          <Button
            onClick={handleCompleteTest}
            variant="contained"
            color="success"
            disabled={!allAnswered}
            sx={{ mt: 15, fontSize: "32px" }}
          >
            Complete test
          </Button>
        )}
        {currentQuestion == questionsAndAnswers?.length && !allAnswered && (
          <Typography
            variant="body2"
            color="error"
            sx={{ fontWeight: 500, textAlign: "center", mt: 2 }}
          >
            You must answer all questions before completing the test
          </Typography>
        )}
      </Box>
    </Container>
  );
};
