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
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const drawerWidth = 240;

const menuItems = [
  {
    label: "Users",
    icon: <PeopleIcon />,
    to: "/dashboard/users",
  },
  {
    label: "Questions",
    icon: <HelpOutlineIcon />,
    to: "/dashboard/questions",
  },
  {
    label: "Tests",
    icon: <QuizIcon />,
    to: "/dashboard/tests",
  },
  {
    label: "User Tests",
    icon: <AssignmentIndIcon />,
    to: "/dashboard/userTests",
  },
  {
    label: "Categories",
    icon: <CategoryIcon />,
    to: "/dashboard/categories",
  },
  {
    label: "Logs",
    icon: <ArticleIcon />,
    to: "/dashboard/logs",
  },
];

export const AdminSidebar = () => {
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
