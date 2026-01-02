import { useParams } from "react-router-dom";
import { useGetTestById } from "../../hooks/tests/useGetTestById";
import Container from "../../components/shared/Container";
import {
  Box,
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import LearningAnswers from "../../components/Answers/Answers";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useGetAllUserTests } from "../../hooks/tests/useGetAllUserTests";
import UserTestRow from "../../components/UserTestRow/UserTestRow";
import TestQrModal from "../../components/TestQrModal/TestQrModal";

export const SingleTestPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const { data: tests } = useGetAllUserTests(currentPage, Number(id));

  const [qrOpen, setQrOpen] = useState(false);


  const { data: test } = useGetTestById(Number(id));
  if (!test) {
    return <NotFoundPage />;
  }
  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h2">{test.title}</Typography>

        {(user?.type === "admin" || user?.type === "creator") && (
          <Button variant="outlined" onClick={() => setQrOpen(true)}>
            Show QR
          </Button>
        )}
      </Box>

      {test?.questions?.map((q) => (
        <Box key={q.id} sx={{ mb: 4 }}>
          <Typography variant="h6">{q.title}</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {q.description}
          </Typography>

          <LearningAnswers
            type={q.type as "single" | "multiple" | "text"}
            variants={q.variants}
            correctAnswers={q.correct_answers}
          />
        </Box>
      ))}
      {(user?.type == "admin" || user?.type == "creator") && (
        <span>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h4">{test.title} results</Typography>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Test</TableCell>
                  <TableCell>Test Taker</TableCell>
                  <TableCell>Test Author</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Closed At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tests?.data && tests.data.length > 0 ? (
                  tests.data.map((ut) => (
                    <UserTestRow
                      key={ut.id}
                      userTest={ut}
                      onDelete={() => {}}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" color="text.secondary">
                        No results found for this test.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            color="primary"
            shape="rounded"
            count={tests?.meta.last_page}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            sx={{
              mt: 3,
              mb: 3,
              display: "flex",
              justifyContent: "center",
            }}
          />
          
        </span>
      )}
      <TestQrModal open={qrOpen} onClose={() => setQrOpen(false)} test={test} />
    </Container>
  );
};
