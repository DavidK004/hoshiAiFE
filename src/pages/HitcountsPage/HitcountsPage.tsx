import { useState } from "react";
import {
  Box,
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
} from "@mui/material";
import Container from "../../components/shared/Container";
import { useHitcounts } from "../../hooks/hitcounts/useHitcounts";

const HitCountsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useHitcounts(currentPage);

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Error loading hitcounts.</Typography>;

  return (
    <Container>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Hit Counts</Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>IP</TableCell>
              <TableCell>Device</TableCell>
              <TableCell>User Agent</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((hit) => (
              <TableRow key={hit.id}>
                <TableCell>{hit.id}</TableCell>
                <TableCell>{hit.ip}</TableCell>
                <TableCell>{hit.device_type}</TableCell>
                <TableCell>{hit.user_agent}</TableCell>
                <TableCell>{hit.country || "-"}</TableCell>
                <TableCell>{hit.url}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        color="primary"
        shape="rounded"
        count={data?.meta.last_page || 1}
        page={currentPage}
        onChange={(_, value) => setCurrentPage(value)}
        sx={{ mt: 3, display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
};

export default HitCountsPage;
