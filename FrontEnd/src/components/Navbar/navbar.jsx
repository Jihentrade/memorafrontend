import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  const menuItems = [
    { label: "ACCUEIL", path: "/" },
    { label: "AVIS CLIENTS", path: "/avis-clients" },
    { label: "EXPÉDITION", path: "/expedition" },
    { label: "CONTACTEZ-NOUS", path: "/contactezNous" },
  ];

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          backgroundColor: "#FFFFEC",
          boxShadow: { xs: 2, sm: 0 },
          display: "flex",
          justifyContent: "space-between",
          padding: { xs: "4px 8px", sm: "8px 24px", md: "8px 32px" },
          minHeight: { xs: "56px", sm: "64px", md: "60px" },
          maxHeight: { xs: "56px", sm: "64px", md: "60px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: { xs: "auto", sm: "auto", md: "200px" },
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              width: isMobile
                ? window.innerWidth < 600
                  ? "38px"
                  : "50px"
                : "60px",
              height: "auto",
              marginRight: window.innerWidth < 600 ? "6px" : "10px",
            }}
          />
          <Typography
            variant={
              isMobile
                ? window.innerWidth < 600
                  ? "body1"
                  : "subtitle1"
                : "h6"
            }
            noWrap
            sx={{
              fontFamily: "monospace",
              fontWeight: "bold",
              color: "#176B87",
              textDecoration: "none",
              fontSize: {
                xs: window.innerWidth < 600 ? "0.95rem" : "1rem",
                sm: "1.1rem",
                md: "1.25rem",
              },
            }}
          >
            Memora
          </Typography>
        </Box>

        {isMobile ? (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                width: "auto",
              }}
            >
              <IconButton
                size="small"
                color="inherit"
                aria-label="shopping cart"
                sx={{ color: "#000000", padding: "4px" }}
              >
                <ShoppingCartIcon
                  sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem" } }}
                />
              </IconButton>
             
              <IconButton
                size="small"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                sx={{ color: "#000000", padding: "4px" }}
              >
                <MenuIcon sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem" } }} />
              </IconButton>
            </Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: "auto",
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  color: "#000000",
                  padding: "4px 8px",
                  minWidth: "auto",
                  fontSize: { sm: "0.875rem", md: "1rem" },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
            <IconButton
            onClick={() => handleNavigation("/panier")}
              size="small"
              color="inherit"
              aria-label="shopping cart"
              sx={{ color: "#000000", padding: "4px" }}
            >
              <ShoppingCartIcon
                sx={{ fontSize: { sm: "1.5rem", md: "1.75rem" } }}
              />
            </IconButton>
            
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
