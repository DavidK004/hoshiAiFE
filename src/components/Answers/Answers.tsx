import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { arraysEqual } from "../../utils/functions";

interface Variant {
  id: number;
  text: string;
}

interface LearningAnswersProps {
  variants?: Variant[];
  correctAnswers: number[] | string[];
  type: "single" | "multiple" | "text";
  userAnswers?: number[];
}

const LearningAnswers = ({
  variants = [],
  correctAnswers = [],
  type,
  userAnswers,
}: LearningAnswersProps) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const hasAnswered = userAnswers !== null && userAnswers !== undefined;
  const isEmptyAnswer = hasAnswered && userAnswers.length === 0;
  const isCorrect = hasAnswered
    ? arraysEqual(correctAnswers as number[], userAnswers as number[])
    : false;
  const normalizedUserAnswers = userAnswers ?? [];

  const getUserAnswerText = () => {
    if (!normalizedUserAnswers.length) return "";
    const selectedVariants = variants.filter((v) =>
      normalizedUserAnswers.includes(v.id)
    );
    return selectedVariants.map((v) => v.text).join(", ");
  };

  if (type === "text") {
    return (
      <Box sx={{ mt: 2 }}>
        {hasAnswered ? (
          isEmptyAnswer ? (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 1, p: 1, border: "1px solid #ccc", borderRadius: 2 }}
            >
              You didn’t answer
            </Typography>
          ) : (
            <Typography
              variant="body1"
              color="primary"
              sx={{ mt: 1, p: 1, border: "1px solid #ccc", borderRadius: 2 }}
            >
              Your answer: {userAnswers.join(", ")}
            </Typography>
          )
        ) : null}

        {(hasAnswered || showAnswer) && (
          <Typography
            variant="body1"
            color="success.main"
            sx={{ mt: 1, p: 1, border: "1px solid #ccc", borderRadius: 2 }}
          >
            Correct answer: {correctAnswers.join(", ")}
          </Typography>
        )}

        {!hasAnswered && (
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => setShowAnswer(!showAnswer)}
          >
             {showAnswer ? "Hide Answer" : "Reveal Answer"}
          </Button>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      {hasAnswered ? (
        isEmptyAnswer ? (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            You didn’t answer
          </Typography>
        ) : (
          <Typography
            variant="body1"
            color={isCorrect ? "success.main" : "error.main"}
            sx={{ mb: 1 }}
          >
            Your answer: {getUserAnswerText()} —{" "}
            {isCorrect ? "Correct" : "Incorrect"}
          </Typography>
        )
      ) : null}

      {variants.map((variant) => (
        <Box
          key={variant.id}
          sx={{
            p: 2,
            my: 1,
            borderRadius: 2,
            border: "1px solid #ccc",
            backgroundColor:
              showAnswer || hasAnswered
                ? (correctAnswers as number[]).includes(variant.id)
                  ? "success.light"
                  : normalizedUserAnswers.includes(variant.id)
                  ? "error.light"
                  : "background.paper"
                : "background.paper",
          }}
        >
          <Typography>{variant.text}</Typography>
        </Box>
      ))}

      {!hasAnswered && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {showAnswer ? "Hide Answer" : "Reveal Answer"}
        </Button>
      )}
    </Box>
  );
};

export default LearningAnswers;
