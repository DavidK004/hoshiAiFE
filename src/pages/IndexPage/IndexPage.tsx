import { Typography } from "@mui/material";
import Container from "../../components/shared/Container";
import { WelcomeContainer } from "./IndexPage.styles";
import StartTestForm from "../../components/StartTestForm/StartTestForm";

const IndexPage = () => {
  return (
    <Container>
      <WelcomeContainer>
        <Typography variant="h2">Welcome To HoshiAI!</Typography>
        <Typography variant="subtitle1">The best place to learn!</Typography>
      </WelcomeContainer>
      <StartTestForm/>
      {/* <ButtonGroup>
        <Button sx={{ backgroundColor: "#6610F2" }} variant="contained">
          Im Feeling Lucky
        </Button>
      </ButtonGroup> */}
      <Typography variant="h3">Browse Questions</Typography>
    </Container>
  );
};

export default IndexPage;
