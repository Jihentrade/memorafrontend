import React from "react";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Container,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import "./ServiceStyle.css";
import Money from "../../assets/money_925116.png";
import Delivery from "../../assets/fast-delivery_9561722.png";
import Mail from "../../assets/email_3178165.png";
import { Link } from "react-router-dom";

const MotionBox = motion.div;

const ServicesSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleEmailClick = () => {
    window.scrollTo(0, 0);
  };

  const services = [
    {
      icon: Delivery,
      title: "Politique de remboursement",
      description:
        "Votre satisfaction est notre priorité. En cas de souci avec votre commande, contactez-nous : nous trouverons une solution ou vous rembourserons..",
      bgColor: "#FFFFEC",
      link: "/contactezNous",
    },
    {
      icon: Money,
      title: "Livraison express",
      description:
        "Votre commande sera livrée à votre porte plus rapidement que vous ne le pensez.",
      bgColor: "#F1E4C3",
    },
    {
      icon: Mail,
      title: "Besoin d'aide ?",
      description: (
        <>
          N'hésitez pas à nous contacter par e-mail à{" "}
          <span style={{ color: "#597E52" }}>memero@gmail.com</span>. Nous
          sommes là pour répondre à toutes vos questions avec plaisir.
        </>
      ),
      bgColor: "#C6A969",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 4, sm: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <Grid container spacing={3}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <MotionBox variants={itemVariants}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: { xs: 2, sm: 3 },
                      height: "100%",
                      backgroundColor: service.bgColor,
                      borderRadius: "12px",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        height: "100%",
                      }}
                    >
                      {service.link ? (
                        <Link
                          to={service.link}
                          style={{ textDecoration: "none" }}
                          onClick={handleEmailClick}
                        >
                          <IconButton
                            sx={{
                              mb: 2,
                              "& img": {
                                width: { xs: "40px", sm: "50px" },
                                height: "auto",
                              },
                            }}
                          >
                            <img src={service.icon} alt={service.title} />
                          </IconButton>
                        </Link>
                      ) : (
                        <IconButton
                          sx={{
                            mb: 2,
                            "& img": {
                              width: { xs: "40px", sm: "50px" },
                              height: "auto",
                            },
                          }}
                        >
                          <img src={service.icon} alt={service.title} />
                        </IconButton>
                      )}
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          mb: 2,
                          fontWeight: "bold",
                          color: "#176B87",
                          fontSize: { xs: "1.1rem", sm: "1.25rem" },
                        }}
                      >
                        {service.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#333",
                          fontSize: { xs: "0.9rem", sm: "1rem" },
                          lineHeight: 1.6,
                        }}
                      >
                        {service.description}
                      </Typography>
                    </Box>
                  </Paper>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default ServicesSection;
