import { useParams } from "react-router-dom";
import Container from "../../components/shared/Container";
import { useUserTestById } from "../../hooks/Tests/useUserTestById";
import { useState } from "react";
import { Box, Button, Pagination, Typography } from "@mui/material";
import TestQuestion from "../../components/TestQuestion/TestQuestion";
import { useSubmitAnswer } from "../../hooks/Tests/useSubmitAnswer";
import { useCompleteTest } from "../../hooks/Tests/useCompleteTest";

export const TestPage = () => {
  const { id } = useParams();
  const { data: test, isLoading, error } = useUserTestById(Number(id));
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const submitAnswerMutation = useSubmitAnswer();
  const completeTestMutation = useCompleteTest();

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

  if (test.is_completed)
    return (
      <Container>
        <Typography variant="h6" color="textSecondary">
          You have already completed this test.
        </Typography>
      </Container>
    );

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
          Expires at:{" "}
          {test.closed_at
            ? new Date(test.closed_at).toLocaleString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            : "N/A"}
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
            sx={{ mt: 15, fontSize: "32px" }}
          >
            Complete test
          </Button>
        )}
      </Box>
    </Container>
  );
};
