import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import PeopleIcon from "@mui/icons-material/People";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import QuizIcon from "@mui/icons-material/Quiz";
import CategoryIcon from "@mui/icons-material/Category";
import ArticleIcon from "@mui/icons-material/Article";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import { useAuth } from "../../context/AuthContext";
type MenuItem = {
  label: string;
  icon: React.ReactNode;
  to: string;
};

const drawerWidth = 240;

const adminMenu: MenuItem[] = [
  { label: "Users", icon: <PeopleIcon />, to: "/dashboard/users" },
  { label: "Questions", icon: <HelpOutlineIcon />, to: "/dashboard/questions" },
  { label: "Tests", icon: <QuizIcon />, to: "/dashboard/tests" },
  {
    label: "User Tests",
    icon: <AssignmentIndIcon />,
    to: "/dashboard/user-tests",
  },
  { label: "Categories", icon: <CategoryIcon />, to: "/dashboard/categories" },
  { label: "Hitcounts", icon: <FmdBadIcon />, to: "/dashboard/hitcounts" },
  { label: "Logs", icon: <ArticleIcon />, to: "/dashboard/logs" },
];

const creatorMenu: MenuItem[] = [
  { label: "Questions", icon: <HelpOutlineIcon />, to: "/dashboard/questions" },
  { label: "Tests", icon: <QuizIcon />, to: "/dashboard/tests" },
];

export const AdminSidebar = () => {
  const { user } = useAuth();

  const menuItems =
    user?.type === "admin"
      ? adminMenu
      : user?.type === "creator"
      ? creatorMenu
      : [];
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          top: 70,
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.label}
            component={NavLink}
            to={item.to}
            sx={{
              "&.active": {
                bgcolor: "action.selected",
                "& .MuiListItemIcon-root": {
                  color: "primary.main",
                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};
