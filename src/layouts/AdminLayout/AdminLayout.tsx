import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../../components/AdminSidebar/AdminSidebar";
import { LayoutWrapper } from "../MainLayout/Layout.styles";
import Header from "../../components/Header/Header";
import { StyledDistance } from "../../components/shared/StyledDistance";
import Cholecounter from "../../components/Cholecounter/Cholecounter";

const AdminLayout = () => {
  return (
    <LayoutWrapper>
      <Header />
      <StyledDistance />
      <AdminSidebar />
      <Cholecounter/>
      <Outlet />
    </LayoutWrapper>
  );
};

export default AdminLayout;
