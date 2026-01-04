import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useQuestions } from "../../hooks/questions/useQuestions";
import { useDeleteQuestion } from "../../hooks/questions/useDeleteQuestion";
import Container from "../../components/shared/Container";
import { useNavigate } from "react-router-dom";
import type { QuestionType } from "../../components/shared/types/QuestionTypes";
import { useAuth } from "../../context/AuthContext";

const QuestionsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteQuestionId, setDeleteQuestionId] = useState<number | null>(null);
  const { data, isLoading, isError } = useQuestions({ page: currentPage });
  const deleteMutation = useDeleteQuestion();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCreateQuestion = () => {
    navigate("/dashboard/questions/create");
  };

  const handleUpdateQuestion = (id: number) => {
    navigate(`/dashboard/questions/${id}/update`);
  };

  const handleViewQuestion = (id: number) => {
    navigate(`/questions/${id}`);
  };

  const handleDeleteQuestion = () => {
    if (deleteQuestionId !== null) {
      deleteMutation.mutate(deleteQuestionId, {
        onSuccess: () => setDeleteQuestionId(null),
      });
    }
  };

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Error loading questions.</Typography>;

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Questions</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateQuestion}
        >
          Create Question
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.data.map((question: QuestionType) => (
              <TableRow key={question.id}>
                <TableCell>{question.id}</TableCell>
                <TableCell>{question.title}</TableCell>
                <TableCell>{question.type}</TableCell>
                <TableCell>{question.difficulty}</TableCell>
                <TableCell>{question.category?.name ?? "—"}</TableCell>
                <TableCell>{question.author.username}</TableCell>

                <TableCell sx={{ display: "flex" }}>
                  <Button
                    variant="outlined"
                    color="info"
                    size="small"
                    onClick={() => handleViewQuestion(question.id)}
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>

                  {(user?.type === "admin" ||
                    user?.id == question.author.id) && (
                    <>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleUpdateQuestion(question.id)}
                        sx={{ mr: 1 }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => setDeleteQuestionId(question.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        color="primary"
        shape="rounded"
        count={data?.meta.last_page}
        page={currentPage}
        onChange={(_, value) => setCurrentPage(value)}
        sx={{ mt: 3, mb: 3, display: "flex", justifyContent: "center" }}
      />

      <Dialog
        open={deleteQuestionId !== null}
        onClose={() => setDeleteQuestionId(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this question?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteQuestionId(null)}>Cancel</Button>
          <Button
            color="error"
            onClick={handleDeleteQuestion}
            disabled={deleteMutation.isPending}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default QuestionsPage;
