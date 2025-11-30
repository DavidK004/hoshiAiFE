import { Chip, Typography } from "@mui/material";
import {
  AuthorMeta,
  QuestionMetadata,
  QuestionTitle,
  QuestionWrapper,
} from "./Question.styles";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import type { QuestionType } from "../shared/types/QuestionTypes";

interface QuestionProps {
  question: QuestionType;
}

const Question = ({ question }: QuestionProps) => {
  return (
    <QuestionWrapper to={`/questions/${question.id}`}>
      <QuestionTitle>
        <Typography sx={{ mr: "10px" }} variant="h5">
          {question.title}
        </Typography>
        <Chip
          variant="outlined"
          icon={<CategoryIcon />}
          color="primary"
          label={question.category.name}
        />
      </QuestionTitle>

      <Typography variant="body1">{question.description}</Typography>

      <QuestionMetadata>
        <Typography variant="body1">
          Difficulty: {question.difficulty}
        </Typography>

        <AuthorMeta>
          <PersonIcon />
          <Typography variant="body1">{question.author.username}</Typography>
        </AuthorMeta>
      </QuestionMetadata>
    </QuestionWrapper>
  );
};

export default Question;
