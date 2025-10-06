import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion.div;

const AboutUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

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
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <MotionBox variants={itemVariants}>
                <Box
                  className="about-section"
                  sx={{
                    p: { xs: 2, sm: 3, md: 4 },
                    height: "100%",
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Typography
                    variant="h2"
                    component="h2"
                    sx={{
                      mb: 3,
                      fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
                      fontWeight: "bold",
                      color: "#176B87",
                    }}
                  >
                    À propos
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#333",
                      fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                      lineHeight: 1.6,
                    }}
                  >
                    Nous sommes une sœur et un frère, tous deux jeunes et
                    passionnés par la création. Originaires de Tunisie, nous
                    avons uni nos forces pour réaliser notre projet : Custom
                    Photo Magnets. Notre objectif est de proposer des aimants
                    photo personnalisés de haute qualité, conçus avec soin pour
                    capturer vos moments les plus précieux et les transformer en
                    souvenirs durables.
                  </Typography>
                </Box>
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionBox variants={itemVariants}>
                <Box
                  sx={{
                    p: { xs: 2, sm: 3, md: 4 },
                    height: "100%",
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                    direction: "rtl",
                  }}
                >
                  <Typography
                    variant="h2"
                    component="h2"
                    sx={{
                      mb: 3,
                      fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
                      fontWeight: "bold",
                      color: "#176B87",
                    }}
                  >
                    من نحن
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#333",
                      fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                      lineHeight: 1.6,
                    }}
                  >
                    لتحقيق مشروعنا: Custom Photo Magnets. هدفنا هو تقديم
                    مغناطيسات صور مخصصة عالية الجودة، مصممة بعناية لالتقاط أروع
                    لحظاتك وتحويلها إلى ذكريات دائمة. بإبداعنا وتفانينا
                    واهتمامنا بالتفاصيل، نسعى لتقديم منتجات فريدة تضيف لمسة خاصة
                    إلى حياتك اليومية. مرحبًا بكم في Custom Photo Magnets، حيث
                    تحكي كل مغناطيس قصة.
                  </Typography>
                </Box>
              </MotionBox>
            </Grid>
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default AboutUs;
