import { Box, Button, Chip, Tooltip, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import type { TestType } from "../shared/types/TestTypes";
import { useStartTestById } from "../../hooks/tests/useStartTestById";
import { useNavigate } from "react-router-dom";

interface TestCardProps {
  test: TestType;
}

const TestListCard = ({ test }: TestCardProps) => {
  const { mutate: startTest } = useStartTestById();
  const navigate = useNavigate();

  const title = test.title;

  let statusLabel = "";
  let statusColor: "primary" | "success" | "error" = "primary";

  if (!test.is_available) {
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
        flexDirection: {
          xs: "column",
          sm: "column",
          md: "row",
        },
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Tooltip title="View test details" placement="top" arrow>
            <Typography
              variant="h6"
              color="primary"
              sx={{ cursor: "pointer", color: "#000" }}
              onClick={() => navigate(`/tests/view/${test.id}`)}
            >
              {title}
            </Typography>
          </Tooltip>
          <Chip
            icon={<CategoryIcon />}
            label={test.category.name}
            color="primary"
            variant="outlined"
          />
        </Box>

        {test.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {test.description}
          </Typography>
        )}

        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          mt={1}
        >
          Closes: {new Date(test.closed_at).toLocaleDateString()}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
        <Chip label={statusLabel} color={statusColor} />
        {test.is_available && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => startTest(test.id)}
          >
            Start Test
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TestListCard;
