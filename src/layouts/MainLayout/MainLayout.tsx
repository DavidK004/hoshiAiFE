import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import { LayoutWrapper } from "./Layout.styles";
import { StyledDistance } from "../../components/shared/StyledDistance";
import Cholecounter from "../../components/Cholecounter/Cholecounter";

const MainLayout = () => {
  return (
    <>
      <LayoutWrapper>
        <Header />
        <StyledDistance />
        <Cholecounter/>
        <Outlet />
      </LayoutWrapper>
    </>
  );
};

export default MainLayout;
