import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "../../components/shared/Container";
import StarIcon from '@mui/icons-material/Star';
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar sx={{backgroundColor: "#4b2981"}} position="static">
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
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem onClick={handleCloseNavMenu} component="a" href="/categories">
                <Typography textAlign="center">Categories</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component="a" href="/profile">
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component="a" href="/create">
                <Typography textAlign="center">Create</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <StarIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#home"
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
            <Button href="/categories" sx={{ my: 2, color: "white", display: "block" }}>
              Categories
            </Button>
            <Button href="/profile" sx={{ my: 2, color: "white", display: "block" }}>
              Profile
            </Button>
            <Button href="/create" sx={{ my: 2, color: "white", display: "block" }}>
              Create
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
