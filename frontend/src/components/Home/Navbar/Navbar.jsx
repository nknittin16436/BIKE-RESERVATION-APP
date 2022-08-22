import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const { isManager } = useSelector((state) => state.bikeReservation);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClickHome = () => {
    handleCloseNavMenu();
    navigate("/");
  };
  const handleClickReservations = () => {
    handleCloseNavMenu();
    navigate("reservation");
  };
  const handleClickAllReservations = () => {
    handleCloseNavMenu();
    navigate("reservations");
  };
  const handleClickUsers = () => {
    handleCloseNavMenu();
    navigate("users");
  };
  const handleClickLogout = () => {
    handleCloseNavMenu();
    localStorage.removeItem("bike-user");
    dispatch({ type: "loggedInUser", payload: {} });
    dispatch({ type: "isManager", payload: false });

    navigate("login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <EventSeatIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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
            BITCS
          </Typography>
          <EventSeatIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
            BITCS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleClickHome}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            <Button
              onClick={handleClickReservations}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              YOUR RESERVATIONS
            </Button>
            {isManager && (
              <Button
                onClick={handleClickAllReservations}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                ALL RESERVATIONS
              </Button>
            )}
            {isManager && (
              <Button
                onClick={handleClickUsers}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                USERS
              </Button>
            )}
            <Button
              onClick={handleClickLogout}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              LOGOUT
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
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
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to={"/"}>
                  <Typography textAlign="center">Home</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to={"/reservation"}>
                  <Typography textAlign="center">YOUR RESERVATIONS</Typography>
                </Link>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Link to={"/reservations"}>
                  <Typography textAlign="center">ALL RESERVATIONS</Typography>
                </Link>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Link to={"/users"}>
                  <Typography textAlign="center">USERS</Typography>
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  localStorage.removeItem("bike-user");
                  dispatch({ type: "loggedInUser", payload: {} });
                  dispatch({ type: "isManager", payload: false });
                }}
              >
                <Link to={"/login"}>
                  <Typography textAlign="center">LOGOUT</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
