import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import fridgeImage from "../../assets/frigidaire.jpg";

const FridgePreview = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const data = new URLSearchParams(location.search).get("data");
      if (data) {
        const decodedData = JSON.parse(decodeURIComponent(data));
        setImages(decodedData.images);
      }
    } catch (error) {
      navigate("/");
    }
  }, [location.search, navigate]);

  // Limite à 9 aimants max pour la grille 3x3
  const magnets = images.slice(0, 9);
  while (magnets.length < 9) magnets.push(null);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        bgcolor: "linear-gradient(135deg, #e0f7fa 0%, #f7f5f2 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 0,
        m: 0,
      }}
    >
      <Navbar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1400px",
          mx: "auto",
          py: { xs: 2, md: 6 },
          gap: { xs: 4, md: 8 },
          minHeight: "90vh",
        }}
      >
        {/* Frigo stylisé */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 0,
            m: 0,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: { xs: 260, sm: 340, md: 420, lg: 500 },
              height: { xs: 420, sm: 540, md: "75vh", lg: "75vh" },
              borderRadius: "40px",
              boxShadow:
                "0 8px 32px 0 rgba(30,136,229,0.08), 0 2px 8px 0 rgba(0,0,0,0.06)",
              background: "linear-gradient(135deg, #e3f0fa 0%, #cfd8dc 100%)",
              border: "4px solid #e0e0e0",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 0,
              m: 0,
              boxShadow:
                "inset 0 8px 32px 0 rgba(30,136,229,0.06), 0 8px 32px 0 rgba(30,136,229,0.08), 0 2px 8px 0 rgba(0,0,0,0.06)",
            }}
          >
            {/* Poignée stylisée nette et glossy */}
            <Box
              sx={{
                position: "absolute",
                left: "8%",
                bottom: "12%",
                width: "18%",
                height: "5%",
                borderRadius: "20px",
                background:
                  "linear-gradient(90deg, #f5f5f5 0%, #e0e0e0 40%, #bdbdbd 100%)",
                boxShadow:
                  "0 2px 8px 0 rgba(0,0,0,0.10), 0 1px 4px 0 rgba(7, 7, 7, 0.25) inset",
                border: "1.5px solid #e0e0e0",
                zIndex: 2,
              }}
            />
            {/* Frigo stylisé net (pas de flou) */}
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "40px",
                background: "linear-gradient(135deg, #b2ebf2 0%, #e0f7fa 100%)",
                zIndex: 1,
              }}
            />
            {/* Grille d'aimants */}
            <Box
              sx={{
                position: "absolute",
                top: "9%",
                left: "50%",
                width: "60%",
                height: "54%",
                transform: "translateX(-50%)",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(3, 1fr)",
                gap: { xs: 1, sm: 2 },
                pointerEvents: "none",
                zIndex: 3,
              }}
            >
              {magnets.map((image, i) => (
                <Box
                  key={i}
                  component={image ? "img" : "div"}
                  src={image ? image.preview : undefined}
                  alt={image ? `Aimant ${i + 1}` : ""}
                  sx={{
                    width: { xs: "90%", sm: "90%", md: "80%", lg: "80%" },
                    height: { xs: "90%", sm: "90%", md: "80%", lg: "80%" },
                    justifySelf: "center",
                    alignSelf: "center",
                    objectFit: "cover",
                    borderRadius: 3,
                    boxShadow: image
                      ? "0 4px 16px 0 rgba(30,136,229,0.10)"
                      : "none",
                    bgcolor: image ? "#fff" : "transparent",
                    border: image ? "2px solid #e0e0e0" : "none",
                    opacity: image ? 1 : 0,
                    transition: "all 0.2s",
                    p: 0,
                    m: 0,
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
        {/* Colonne Prix + Bouton */}
        <Box
          sx={{
            flex: { xs: "unset", md: 0.33 },
            width: { xs: "100%", md: "32%" },
            minWidth: { md: 320 },
            maxWidth: 420,
            bgcolor: "white",
            borderRadius: 6,
            boxShadow:
              "0 8px 32px 0 rgba(30,136,229,0.10), 0 2px 8px 0 rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            p: { xs: 3, md: 5 },
            mt: { xs: 2, md: 2 },
            mx: { xs: "auto", md: 0 },
            border: "2px solid #e0f2f1",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#176B87",
              mb: 2,
              letterSpacing: 1,
            }}
          >
            12,49 €
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#176B87",
              mb: 2,
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            9 aimants photo personnalisés
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#666", mb: 2, textAlign: "center" }}
          >
            Livraison rapide & qualité premium
          </Typography>
          <Divider sx={{ width: "100%", my: 2 }} />
          <Button
            variant="contained"
            onClick={() => {
              // Passer les images au panier si elles existent
              if (images && images.length > 0) {
                const imagesString = JSON.stringify(images);
                navigate(`/panier?images=${encodeURIComponent(imagesString)}`);
              } else {
                navigate("/panier");
              }
            }}
            sx={{
              background: "linear-gradient(90deg, #176B87 0%, #64b5f6 100%)",
              color: "white",
              py: 1.5,
              px: 4,
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: "12px",
              boxShadow: "0 4px 16px 0 rgba(30,136,229,0.10)",
              width: "100%",
              mt: 2,
              letterSpacing: 1,
              textTransform: "uppercase",
              transition: "all 0.2s",
              "&:hover": {
                background: "linear-gradient(90deg, #176B87 60%, #90caf9 100%)",
                transform: "translateY(-2px) scale(1.03)",
                boxShadow: "0 8px 24px 0 rgba(30,136,229,0.18)",
              },
            }}
          >
            Ajouter au panier
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default FridgePreview;
