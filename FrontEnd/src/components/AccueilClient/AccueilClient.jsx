import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import Navbar from "../Navbar";
import Footer from "../footer/footer";
import image from "../../assets/couverture.jpg";
import { motion } from "framer-motion";

const MotionBox = motion.div;

function AccueilClient() {
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        component="header"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.3s ease-in-out",
          backgroundColor: scrolled
            ? "rgba(255, 255, 255, 0.95)"
            : "transparent",
          boxShadow: scrolled ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <Navbar />
      </Box>

      <Box
        component="main"
        sx={{
          flex: 1,
          pt: { xs: "64px", sm: "80px" }, // Ajustement pour la navbar fixe
        }}
      >
        <Box
          component="section"
          className="hero"
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "50vh", sm: "60vh", md: "70vh" },
            overflow: "hidden",
          }}
        >
          <MotionBox
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            sx={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <Box
              component="img"
              src={image}
              alt="Description de l'image"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Container maxWidth="lg">
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    color: "white",
                    textAlign: "center",
                    fontSize: {
                      xs: "2rem",
                      sm: "3rem",
                      md: "4rem",
                    },
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  Custom Photo Magnets
                </Typography>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    color: "white",
                    textAlign: "center",
                    mt: 2,
                    fontSize: {
                      xs: "1.25rem",
                      sm: "1.5rem",
                      md: "2rem",
                    },
                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  Transformez vos moments précieux en souvenirs magnétiques
                </Typography>
              </Container>
            </Box>
          </MotionBox>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}

export default AccueilClient;
