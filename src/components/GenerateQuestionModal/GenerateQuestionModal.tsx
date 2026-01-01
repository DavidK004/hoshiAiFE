import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import { useOpenaiGenerateQuestion } from "../../hooks/questions/useOpenaiGenerateQuestion";
import type { QuestionPayload } from "../../api/questionsApi";

type Props = {
  open: boolean;
  onClose: () => void;
  onGenerated: (question: QuestionPayload) => void;

};

const GenerateQuestionModal = ({ open, onClose, onGenerated }: Props) => {
  const generateMutation = useOpenaiGenerateQuestion();

  const [type, setType] = useState<"single" | "multiple" | "text">("single");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [language, setLanguage] = useState<"en" | "sr" | "hu" | "ru">("en");
  const [difficulty, setDifficulty] = useState(5);
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    if (!categoryId || !prompt.trim()) return;

    generateMutation.mutate(
      {
        type,
        category_id: Number(categoryId),
        language,
        difficulty,
        promt: prompt,
      },
      {
        onSuccess: (data) => {
          onGenerated(data);
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Generate Question (AI)</DialogTitle>

      <DialogContent dividers>
        <TextField
          select
          label="Type"
          value={type}
          onChange={(e) =>
            setType(e.target.value as "single" | "multiple" | "text")
          }
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="single">Single</MenuItem>
          <MenuItem value="multiple">Multiple</MenuItem>
          <MenuItem value="text">Text</MenuItem>
        </TextField>

        <TextField
          label="Category ID"
          type="number"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          select
          label="Language"
          value={language}
          onChange={(e) =>
            setLanguage(e.target.value as "en" | "sr" | "hu" | "ru")
          }
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="sr">Serbian</MenuItem>
          <MenuItem value="hu">Hungarian</MenuItem>
          <MenuItem value="ru">Russian</MenuItem>
        </TextField>

        <TextField
          label="Difficulty (1–10)"
          type="number"
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          fullWidth
          multiline
          rows={3}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleGenerate}
          disabled={generateMutation.isPending}
        >
          {generateMutation.isPending ? (
            <CircularProgress size={20} />
          ) : (
            "Generate"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenerateQuestionModal;
