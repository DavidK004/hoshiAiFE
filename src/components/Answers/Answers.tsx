import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

interface Variant {
  id: number;
  text: string;
}

interface LearningAnswersProps {
  variants?: Variant[];
  correctAnswers: number[] | string[];
  type: "single" | "text";
}

const LearningAnswers = ({
  variants = [],
  correctAnswers = [],
  type,
}: LearningAnswersProps) => {
  const [showAnswer, setShowAnswer] = useState(false);

  if (type === "text") {
    return (
      <Box sx={{ mt: 2 }}>
        {showAnswer && (
          <Typography
            variant="body1"
            color="success.main"
            sx={{ mt: 1, p: 1, border: "1px solid #ccc", borderRadius: 2 }}
          >
            Correct answer:{" "}
            {Array.isArray(correctAnswers)
              ? correctAnswers.join(", ")
              : correctAnswers}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => setShowAnswer(true)}
        >
          Reveal Answer
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      {variants.map((variant) => (
        <Box
          key={variant.id}
          sx={{
            p: 2,
            my: 1,
            borderRadius: 2,
            border: "1px solid #ccc",
            backgroundColor:
              showAnswer && (correctAnswers as number[]).includes(variant.id)
                ? "success.light"
                : "background.paper",
          }}
        >
          <Typography>{variant.text}</Typography>
        </Box>
      ))}

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => setShowAnswer(true)}
      >
        Reveal Answer
      </Button>
    </Box>
  );
};

export default LearningAnswers;
