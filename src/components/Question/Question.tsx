import { Chip, Typography } from "@mui/material";
import {
  AuthorMeta,
  QuestionMetadata,
  QuestionTitle,
  QuestionWrapper,
} from "./Question.styles";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";

type Question = {
  title: string;
  category: string;
  description: string;
  difficulty: number;
  author: string;
};

type QuestionProps = {
  question: Question;
};

const Question = ({ question }: QuestionProps) => {
  return (
    <QuestionWrapper>
      <QuestionTitle>
        <Typography sx={{ mr: "10px" }} variant="h5">
          {question.title}
        </Typography>
        <Chip
          variant="outlined"
          icon={<CategoryIcon />}
          color="primary"
          label={`${question.category}`}
        />
      </QuestionTitle>
      <Typography variant="body1">{question.description}</Typography>
      <QuestionMetadata>
        <Typography variant="body1">
          Difficulty: {question.difficulty}
        </Typography>
        <AuthorMeta>
          <PersonIcon />
          <Typography variant="body1">{question.author}</Typography>
        </AuthorMeta>
      </QuestionMetadata>
    </QuestionWrapper>
  );
};

export default Question;
