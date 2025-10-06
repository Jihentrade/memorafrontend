import React from "react";
import {
  Button,
  Typography,
  Grid,
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import video1 from "../../assets/video.mp4";
import image2 from "../../assets/8.jpg";
import family from "../../assets/6.jpg";
import { useNavigate } from "react-router-dom";
import "./ThreeByTwoGrid.css";

const ThreeByTwoGrid = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleButtonClick = () => {
    navigate("/aimants-photo-carrés");
  };

  const features = [
    {
      video: video1,
      title: "Produits haut de gamme",
      description: [
        "Chaque aimant est minutieusement imprimé",
        "sur du papier photo de qualité supérieure.",
      ],
      imageFirst: true,
    },
    {
      image: image2,
      title: "Fabrication artisanale",
      description: [
        "Chaque aimant est découpé à la main avec soin,",
        "ajoutant une touche artisanale à chaque pièce.",
      ],
      imageFirst: false,
    },
    {
      image: family,
      title: "Durabilité et longévité",
      description: [
        "Nos aimants sont conçus pour durer,",
        "offrant une façon durable de partager vos moments préférés avec vos proches.",
      ],
      imageFirst: true,
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 4, sm: 6, md: 8 },
        backgroundColor: "#FFFFEC",
      }}
    >
      <Container maxWidth="lg">
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
          Pourquoi Choisir Nos Aimants Photo ?
        </Typography>

        {features.map((feature, index) => (
          <Grid
            container
            key={index}
            spacing={4}
            sx={{
              mb: { xs: 4, sm: 6, md: 8 },
              flexDirection: {
                xs: "column",
                sm: feature.imageFirst ? "row" : "row-reverse",
              },
              alignItems: "center",
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "500px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                {feature.video ? (
                  <video
                    src={feature.video}
                    controls
                    autoPlay
                    muted
                    loop
                    className="threebytwogrid-media"
                    style={{
                      width: "100%",
                      height: "auto",
                      minHeight: "200px",
                      maxHeight: "250px",
                      display: "block",
                      objectFit: "cover",
                      borderRadius: "12px",
                      background: "#f3f3f3",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      margin: "0 auto",
                    }}
                  />
                ) : (
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="threebytwogrid-media"
                    style={{
                      width: "100%",
                      height: "auto",
                      minHeight: "200px",
                      maxHeight: "250px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      background: "#f3f3f3",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                )}
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: { xs: 2, sm: 4 },
              }}
            >
              <Typography
                variant="h3"
                component="h3"
                sx={{
                  mb: 2,
                  fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                  fontWeight: "bold",
                  color: "#176B87",
                }}
              >
                {feature.title}
              </Typography>
              {feature.description.map((text, idx) => (
                <Typography
                  key={idx}
                  variant="body1"
                  sx={{
                    mb: 1,
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                    color: "#333",
                    lineHeight: 1.6,
                  }}
                >
                  {text}
                </Typography>
              ))}
              <Button
                variant="contained"
                onClick={handleButtonClick}
                sx={{
                  mt: 3,
                  py: { xs: 1, sm: 1.5 },
                  px: { xs: 2, sm: 3 },
                  backgroundColor: "#597E52",
                  color: "white",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  fontWeight: "bold",
                  borderRadius: "8px",
                  textTransform: "uppercase",
                  boxShadow: "0 4px 6px rgba(89, 126, 82, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#4A6B45",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 8px rgba(89, 126, 82, 0.3)",
                  },
                  "&:active": {
                    transform: "translateY(0)",
                  },
                }}
              >
                Sélectionner des photos
              </Button>
            </Grid>
          </Grid>
        ))}
      </Container>
    </Box>
  );
};

export default ThreeByTwoGrid;
