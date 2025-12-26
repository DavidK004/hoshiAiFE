import { Box, Button, Chip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/functions";
import type { UserTestType } from "../shared/types/TestTypes";
import { useGetTestById } from "../../hooks/Tests/useGetTestById";

interface TestCardProps {
  test: UserTestType;
}

const TestCard = ({ test }: TestCardProps) => {
  let title: string | undefined = "User Test";

  if (test.test_id) {
    const { data } = useGetTestById(test.test_id);
    title = data?.title;
  }

  let statusLabel = "";
  let statusColor: "primary" | "success" | "error" = "primary";

  if (test.is_completed) {
    statusLabel = "Completed";
    statusColor = "success";
  } else if (!test.is_available) {
    statusLabel = "Expired";
    statusColor = "error";
  } else {
    statusLabel = "Active";
    statusColor = "primary";
  }

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        p: 2,
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h6">{title}</Typography>
        {test.closed_at && (
          <Typography variant="body2" color="textSecondary">
            Expires at: {formatDate(test.closed_at)}
          </Typography>
        )}
        {test.is_completed && test.score !== undefined && (
          <Typography variant="body2" color="textSecondary">
            Score: {test.score}%
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Chip label={statusLabel} color={statusColor} />
        {test.is_available && !test.is_completed && (
          <Button
            component={Link}
            to={`/tests/${test.id}`}
            variant="contained"
            color="primary"
          >
            Continue Test
          </Button>
        )}
        {test.is_completed && (
          <Button
            component={Link}
            to={`/tests/${test.id}`}
            variant="contained"
            color="success"
          >
            View Results
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TestCard;
