import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const MainHeader = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const isLogin = useAuth();
  let navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCompany = () => {
    setAnchorElNav(null);
    navigate("/");
  };

  const handleJob = () => {
    setAnchorElNav(null);
    navigate("/job");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogOut = () => {
    setAnchorElUser(null);
    isLogin.logout();
  };

  const handleFavorite = () => {
    setAnchorElUser(null);
    navigate(`favorite`);
  };
  return (
    <AppBar position="static" sx={{ bgcolor: "#292827", color: "aliceblue" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Module Test
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem key="browser" onClick={handleCompany}>
                <Typography textAlign="center">Company</Typography>
              </MenuItem>
              <MenuItem key="home" onClick={handleJob}>
                <Typography textAlign="center">Job</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            MODULE TEST
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="company"
              onClick={handleCompany}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Typography textAlign="center">Company</Typography>
            </Button>
            <Button
              key="job"
              onClick={handleJob}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Typography textAlign="center">Job</Typography>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isLogin.isAuthenticated ? (
              <Box display="inline-flex" alignItems="center">
                <Typography
                  variant="body2"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "none", sm: "block" } }}
                  mr={2}
                >
                  {isLogin.user.username}
                </Typography>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem key="farovite" onClick={handleFavorite}>
                    <Typography textAlign="center">
                      Favorite Companies
                    </Typography>
                  </MenuItem>
                  <MenuItem key="logout" onClick={handleLogOut}>
                    <Typography textAlign="center">Log Out</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button onClick={() => navigate(`/login`)}>Log in</Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MainHeader;
