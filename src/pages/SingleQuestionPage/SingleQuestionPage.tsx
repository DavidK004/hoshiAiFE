import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuestionById } from "../../hooks/Question/useQuestionById";
import Question from "../../components/Question/Question";
import LearningAnswers from "../../components/Answers/Answers";

const SingleQuestionPage = () => {
  const { id } = useParams();
  const { data: question, isLoading, error } = useQuestionById(Number(id));

  if (isLoading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error.message}</Container>;
  if (!question) return <Container>No question found</Container>;

  return (
    <Container sx={{ mt: 4 }}>
      <Question question={question} />

      <LearningAnswers
        variants={question.variants}
        correctAnswers={question.correct_answers}
        type={question.type as "single" | "text"}
      />
    </Container>
  );
};

export default SingleQuestionPage;
