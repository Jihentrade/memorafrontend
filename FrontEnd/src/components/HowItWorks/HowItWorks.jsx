import React from "react";
import {
  Box,
  Typography,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Container,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const MotionBox = motion.div;
  const steps = [
    {
      icon: CloudUploadIcon,
      title: "1. Téléchargez vos photos",
      description:
        "Téléchargez vos photos en utilisant notre interface simple. Recadrez, modifiez et prévisualisez les images avant de les soumettre.",
    },
    {
      icon: ShoppingCartCheckoutIcon,
      title: "2. Passer la commande",
      description:
        "Lorsque vous êtes satisfait de votre choix de photos, ajoutez-les simplement au panier, entrez vos informations d'expédition et votre e-mail et passez votre commande.",
    },
    {
      icon: LocalShippingIcon,
      title: "3. Suivez votre commande",
      description:
        "Une fois la commande passée, nous imprimerons, découperons, emballerons et expédierons votre commande.",
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
        backgroundColor: "#FFFFEC",
      }}
    >
      <Container maxWidth="lg">
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <Typography
            variant="h2"
            component="h2"
            align="center"
            sx={{
              mb: { xs: 3, sm: 4, md: 6 },
              fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
              fontWeight: "bold",
              color: "#176B87",
            }}
          >
            Comment ça fonctionne
          </Typography>

          <Stepper
            alternativeLabel
            sx={{
              mb: { xs: 4, sm: 6, md: 8 },
              "& .MuiStepLabel-label": {
                fontSize: { xs: "0.875rem", sm: "1rem", md: "1.1rem" },
                fontWeight: "medium",
                color: "#176B87",
              },
              "& .MuiStepIcon-root": {
                color: "#597E52",
                "&.Mui-active": {
                  color: "#176B87",
                },
                "&.Mui-completed": {
                  color: "#597E52",
                },
              },
            }}
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel StepIconComponent={step.icon}>
                  {step.title}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <MotionBox variants={itemVariants}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: { xs: 2, sm: 3 },
                      height: "100%",
                      borderRadius: "12px",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-5px)",
                      },
                      backgroundColor: "white",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Box
                        sx={{
                          mb: 2,
                          color: "#176B87",
                          "& svg": {
                            fontSize: { xs: "2.5rem", sm: "3rem" },
                          },
                        }}
                      >
                        <step.icon />
                      </Box>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          mb: 2,
                          color: "#176B87",
                          fontWeight: "bold",
                          fontSize: { xs: "1.1rem", sm: "1.25rem" },
                        }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#333",
                          lineHeight: 1.6,
                          fontSize: { xs: "0.9rem", sm: "1rem" },
                        }}
                      >
                        {step.description}
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

export default HowItWorks;
