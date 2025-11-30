import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const QuestionWrapper = styled(Link)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "15px",
  border: "3px solid #4B2981",
  borderRadius: "10px",
  marginBottom: "10px",
  textDecoration: "none",
  color: "inherit"
});

export const QuestionTitle = styled("div")({
  display: "flex",
  alignItems: "center",
  marginBottom: "10px"
});

export const QuestionMetadata = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  color: "#4c4c4c",
  marginTop: "10px"
});

export const AuthorMeta = styled("div")({
  display: "flex",
  justifyContent: "center",
});
