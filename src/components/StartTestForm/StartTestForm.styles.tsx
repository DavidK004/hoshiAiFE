import styled from "@emotion/styled";

export const StartTestWrapper = styled("div")({
  color: "#fff",
  minWidth: "600px",
  backgroundColor: "#fff",
  padding: "10px",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "36px",
  flexDirection: "row",

  "@media (max-width: 1024px)": {
    flexDirection: "column",
    minWidth: "auto",
    gap: "12px",
  },
});
