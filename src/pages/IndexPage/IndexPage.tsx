import { Typography } from "@mui/material";
import Container from "../../components/shared/Container";
import { WelcomeContainer } from "./IndexPage.styles";
import StartTestForm from "../../components/StartTestForm/StartTestForm";
import Question from "../../components/Question/Question";

const IndexPage = () => {

const myQuestion = {
  title: "Example Question",
  category: "Math",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies, urna eu aliquet tincidunt, augue turpis gravida risus, sit amet posuere neque tellus sit amet justo. Curabitur non facilisis orci, vitae eleifend est. Cras fermentum, velit at scelerisque varius, mauris justo cursus lacus, ac porttitor ante metus sit amet nibh. Vivamus imperdiet, diam vel efficitur euismod, urna odio pharetra ipsum, vitae sollicitudin neque enim ut tortor. Donec gravida orci.",
  difficulty: 3,
  author: "David"
};


  return (
    <Container>
      <WelcomeContainer>
        <Typography variant="h2">Welcome To HoshiAI!</Typography>
        <Typography variant="subtitle1">The best place to learn!</Typography>
      </WelcomeContainer>
      <StartTestForm />
      <Typography sx={{mb:"36px"}} variant="h3">Browse Questions</Typography>
      <Question question={myQuestion} />
    </Container>
  );
};

export default IndexPage;
