import { TableRow, TableCell, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { UserTestType } from "../../components/shared/types/TestTypes";
import { useGetTestById } from "../../hooks/Tests/useGetTestById";
import { formatDate } from "../../utils/functions";

type Props = {
  userTest: UserTestType;
  onDelete: (id: number) => void;
};

const UserTestRow = ({ userTest, onDelete }: Props) => {
  const navigate = useNavigate();

  const testId = userTest.test_id;
  let title = "User Test";
  let author = "—";

  if (testId) {
    const { data } = useGetTestById(testId);
    title = data?.title ?? "User Test";
    author = data?.author.username ?? "-";
  }

  return (
    <TableRow>
      <TableCell>{userTest.id}</TableCell>

      <TableCell>{title}</TableCell>

      <TableCell>{userTest.user?.username ?? "Unknown"}</TableCell>

      <TableCell>{author}</TableCell>

      <TableCell>
        {userTest.score !== undefined ? userTest.score : "—"}
      </TableCell>

      <TableCell>{userTest.is_completed ? "Yes" : "No"}</TableCell>

      <TableCell>
        {formatDate(userTest.created_at)}
      </TableCell>
      <TableCell>{formatDate(userTest.closed_at)}</TableCell>

      <TableCell>
        <Button
          size="small"
          variant="outlined"
          sx={{ mr: 1 }}
          onClick={() => navigate(`/tests/${userTest.id}`)}
        >
          View
        </Button>

        <Button
          size="small"
          color="error"
          variant="outlined"
          onClick={() => onDelete(userTest.id)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default UserTestRow;
