import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  type SelectChangeEvent,
} from "@mui/material";
import { StartTestWrapper } from "./StartTestForm.styles";
import { useState } from "react";
import { useCategories } from "../../hooks/Question/useCategories";
import type { Category } from "../shared/types/QuestionTypes";
import { useStartTest } from "../../hooks/Tests/useStartTest";
import { toast } from "react-toastify";

const StartTestForm = () => {
  const [category, setCategory] = useState("");
  const [minDifficulty, setMinDifficulty] = useState(1);
  const [maxDifficulty, setMaxDifficulty] = useState(10);
  const { data: categories, isLoading, isError } = useCategories();
  const startTestMutation = useStartTest();

  const handleStartTest = () => {
    if (!category) {
      toast.error("Please select a category!");
      return;
    }

    startTestMutation.mutate({
      category_id: Number(category),
      min_difficulty: minDifficulty,
      max_difficulty: maxDifficulty,
    });
  };

  const handleFeelingLucky = () => {
    if (!categories || categories.length === 0) {
      toast.error("No categories available");
      return;
    }

    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];

    const minDifficulty = 1;
    const maxDifficulty = 10;

    startTestMutation.mutate({
      category_id: randomCategory.id,
      min_difficulty: minDifficulty,
      max_difficulty: maxDifficulty,
    });
  };

  const handleChangeMinDifficulty = (e: SelectChangeEvent<number>) => {
    const value = Number(e.target.value);
    if (value <= maxDifficulty) {
      setMinDifficulty(value);
    } else {
      toast.error("Min difficulty should be smaller than max difficulty!");
    }
  };

  const handleChangeMaxDifficulty = (e: SelectChangeEvent<number>) => {
    const value = Number(e.target.value);
    if (value >= minDifficulty) {
      setMaxDifficulty(value);
    } else {
      toast.error("Max difficulty should be bigger than min difficulty!");
    }
  };
  return (
    <StartTestWrapper>
      <FormControl sx={{ minWidth: "300px" }} variant="filled">
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          sx={{ maxWidth: "270px" }}
          labelId="category-select-label"
          id="category-select"
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
        >
          {isLoading && <MenuItem disabled>Loading...</MenuItem>}
          {isError && <MenuItem disabled>Error loading categories</MenuItem>}
          {categories?.map((cat: Category) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: "200px" }} variant="filled">
        <InputLabel id="min-difficulty-select-label">Min Difficulty</InputLabel>
        <Select
          sx={{ maxWidth: "270px" }}
          labelId="min-difficulty-select-label"
          id="min-difficulty-select"
          value={minDifficulty}
          label="Min Difficulty"
          onChange={handleChangeMinDifficulty}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <MenuItem key={i + 1} value={i + 1}>
              {i + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: "200px" }} variant="filled">
        <InputLabel id="max-difficulty-select-label">Max Difficulty</InputLabel>
        <Select
          sx={{ maxWidth: "270px" }}
          labelId="max-difficulty-select-label"
          id="max-difficulty-select"
          value={maxDifficulty}
          label="Max Difficulty"
          onChange={handleChangeMaxDifficulty}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <MenuItem key={i + 1} value={i + 1}>
              {i + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Tooltip title="Start a test based on selected parameters.">
        <Button onClick={handleStartTest} variant="contained">
          Start Test
        </Button>
      </Tooltip>
      <Tooltip title="Random category and difficulty test.">
        <Button
          onClick={handleFeelingLucky}
          sx={{ backgroundColor: "#6610F2" }}
          variant="contained"
        >
          Im Feeling Lucky
        </Button>
      </Tooltip>
    </StartTestWrapper>
  );
};

export default StartTestForm;
