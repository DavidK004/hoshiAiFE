import styled from "@emotion/styled";

export const LayoutWrapper = styled("div")({
  minHeight: "100vh",     
  display: "flex",
  flexDirection: "column",
});

export const PageWrapper = styled("div")({
  flexGrow: 1,             
  display: "flex",
  justifyContent: "center",
  alignItems: "center", 
});