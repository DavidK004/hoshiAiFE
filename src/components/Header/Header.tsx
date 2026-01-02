import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "../../components/shared/Container";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const goToDashboard = () => navigate("/dashboard");

  return (
    <AppBar sx={{ backgroundColor: "#4b2981" }} position="static">
      <Container>
        <Toolbar disableGutters>
          <StarIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HoshiAI
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {!user && (
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate("/login");
                  }}
                >
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              )}
              {user && (
                <span>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/profile");
                    }}
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  {(user.type === "admin" || user.type === "creator") && (
                    <MenuItem
                      onClick={() => {
                        handleCloseNavMenu();
                        goToDashboard();
                      }}
                    >
                      <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                  )}
                </span>
              )}

              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/tests");
                }}
              >
                <Typography textAlign="center">Tests</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <StarIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HoshiAI
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {!user && (
              <Button
                onClick={() => navigate("/login")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Login
              </Button>
            )}

            {user && (
              <>
                <Button
                  onClick={() => navigate("/profile")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Profile
                </Button>
                {(user.type === "admin" || user.type === "creator") && (
                  <Button
                    onClick={goToDashboard}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Dashboard
                  </Button>
                )}
              </>
            )}
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => {
                handleCloseNavMenu();
                navigate("/tests");
              }}
            >
              Tests
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
