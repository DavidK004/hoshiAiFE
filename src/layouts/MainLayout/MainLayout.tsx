import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import { LayoutWrapper } from "./Layout.styles";
import { StyledDistance } from "../../components/shared/StyledDistance";

const MainLayout = () => {
  return (
    <>
      <LayoutWrapper>
        <Header />
        <StyledDistance />
        <Outlet />
      </LayoutWrapper>
    </>
  );
};

export default MainLayout;
