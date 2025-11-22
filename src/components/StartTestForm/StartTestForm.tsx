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
import { notifyError, notifySuccess } from "../shared/toastify";

const StartTestForm = () => {
  const [category, setCategory] = useState("");
  const [minDifficulty, setMinDifficulty] = useState(1);
  const [maxDifficulty, setMaxDifficulty] = useState(10);

  const handleChangeMinDifficulty = (e: SelectChangeEvent<number>) => {
    const value = Number(e.target.value);
    if(value <= maxDifficulty){
      setMinDifficulty(value);
    } else{
      notifyError("Min difficulty should be smaller than max difficulty!")
    }
  }

   const handleChangeMaxDifficulty = (e: SelectChangeEvent<number>) => {
    const value = Number(e.target.value);
    if(value >= minDifficulty){
      setMaxDifficulty(value);
    } else{
      notifyError("Max difficulty should be bigger than min difficulty!")
    }
  }
  return (
    <StartTestWrapper>
      <FormControl sx={{ minWidth: "300px" }} variant="filled">
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value as string)}
        >
          <MenuItem value={10}>Physics</MenuItem>
          <MenuItem value={20}>Microcontrollers</MenuItem>
          <MenuItem value={30}>English</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: "200px" }} variant="filled">
        <InputLabel id="min-difficulty-select-label">Min Difficulty</InputLabel>
        <Select
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
        <Button onClick={() => notifySuccess("Started")} variant="contained">Start Test</Button>
      </Tooltip>
      <Tooltip title="Random category and difficulty test.">
        <Button sx={{ backgroundColor: "#6610F2" }} variant="contained">
          Im Feeling Lucky
        </Button>
      </Tooltip>
    </StartTestWrapper>
  );
};

export default StartTestForm;
