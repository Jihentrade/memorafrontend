import {
  Box,
  Typography,
  IconButton,
  Button,
  Container,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  Tooltip,
  Alert,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import KitchenIcon from "@mui/icons-material/Kitchen";
import EditImageModal from "../../pages/Dropzone/editImage";
import { motion } from "framer-motion";
import Footer from "../../components/footer";
const MotionBox = motion.div;

const ProductPreview = () => {
  const [imageToEdit, setImageToEdit] = useState(null);
  const [modal, setModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const imagesString = new URLSearchParams(location.search).get("images");
  const images = imagesString
    ? JSON.parse(decodeURIComponent(imagesString))
    : [];
  const [selectedImages, setSelectedImages] = useState(images);
  const [originalImages] = useState(images);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleUpdateImage = (updatedItem) => {
    setSelectedImages((prevItems) =>
      prevItems.map((item) => {
        return item?.file?.path === updatedItem?.file?.name
          ? updatedItem
          : item?.file?.name === updatedItem?.file?.name
          ? updatedItem
          : item;
      })
    );
    setModal(false);
  };

  const handleUpdateOldImage = (updatedItem) => {
    setSelectedImages((prevItems) =>
      prevItems.map((item) => {
        return item?.file?.name === updatedItem?.file?.path
          ? updatedItem
          : item;
      })
    );
    setModal(false);
  };

  const EditImage = (image, index) => {
    if (!modal) {
      setModal(true);
      setImageToEdit({ image: image, index: index });
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleClose = () => {
    setModal(false);
  };

  const handleAddToCart = () => {
    // Passer les images au panier via l'URL
    const imagesString = JSON.stringify(selectedImages);
    console.log("Navigation vers panier avec images:", selectedImages);
    console.log("Images string:", imagesString);
    navigate(`/panier?images=${encodeURIComponent(imagesString)}`);
  };

  const handlePreviewOnFridge = () => {
    // Créer un objet avec les images pour la redirection
    const imagesData = {
      images: selectedImages.map((img) => ({
        preview: img.preview,
        name: img.file?.name || `image-${Date.now()}`,
      })),
    };

    // Encoder les données pour l'URL
    const encodedData = encodeURIComponent(JSON.stringify(imagesData));

    // Rediriger vers la page de prévisualisation du frigidaire
    navigate(`/fridge-preview?data=${encodedData}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFEC",
      }}
    >
      <Navbar />
      <Container maxWidth="lg" sx={{ flex: 1, py: { xs: 2, sm: 4, md: 6 } }}>
        {showAlert && (
          <Alert
            severity="success"
            sx={{
              mb: 2,
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Image supprimée avec succès
          </Alert>
        )}

        <MotionBox
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: "12px",
              backgroundColor: "white",
              mb: 4,
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                mb: 3,
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
                fontWeight: "bold",
                color: "#176B87",
                textAlign: "center",
              }}
            >
              Aperçu de vos aimants photo
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: "#666",
                textAlign: "center",
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Vérifiez vos photos avant de les ajouter au panier
            </Typography>

            <Grid container spacing={3}>
              {selectedImages?.map((image, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <MotionBox variants={itemVariants}>
                    <Box
                      sx={{
                        position: "relative",
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.02)",
                        },
                      }}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Box
                        component="img"
                        src={image?.preview}
                        alt={`Aimant photo ${index + 1}`}
                        sx={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          display: "flex",
                          gap: 1,
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "8px",
                          p: 0.5,
                          opacity: {
                            xs: 1,
                            sm: hoveredIndex === index ? 1 : 0.7,
                          },
                          transition: "opacity 0.3s ease",
                          "&:hover": {
                            opacity: 1,
                          },
                        }}
                      >
                        <Tooltip title="Modifier l'image">
                          <IconButton
                            onClick={() => EditImage(image, index)}
                            sx={{
                              color: "#597E52",
                              "&:hover": {
                                backgroundColor: "rgba(89, 126, 82, 0.1)",
                              },
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Supprimer l'image">
                          <IconButton
                            onClick={() => handleDeleteImage(index)}
                            sx={{
                              color: "#d32f2f",
                              "&:hover": {
                                backgroundColor: "rgba(211, 47, 47, 0.1)",
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </MotionBox>
                </Grid>
              ))}
            </Grid>

            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate(-1)}
                sx={{
                  py: { xs: 1.5, sm: 2 },
                  px: { xs: 3, sm: 4 },
                  color: "#597E52",
                  borderColor: "#597E52",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  fontWeight: "bold",
                  borderRadius: "8px",
                  "&:hover": {
                    borderColor: "#4A6B45",
                    backgroundColor: "rgba(89, 126, 82, 0.05)",
                  },
                }}
              >
                Retour
              </Button>
              <Button
                variant="contained"
                onClick={handlePreviewOnFridge}
                startIcon={<KitchenIcon />}
                sx={{
                  py: { xs: 1.5, sm: 2 },
                  px: { xs: 3, sm: 4 },
                  backgroundColor: "#176B87",
                  color: "white",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  fontWeight: "bold",
                  borderRadius: "8px",
                  textTransform: "uppercase",
                  boxShadow: "0 4px 6px rgba(23, 107, 135, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#145C73",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 8px rgba(23, 107, 135, 0.3)",
                  },
                  "&:active": {
                    transform: "translateY(0)",
                  },
                }}
              >
                Voir sur le frigidaire
              </Button>
              <Button
                variant="contained"
                onClick={handleAddToCart}
                startIcon={<ShoppingCartIcon />}
                sx={{
                  py: { xs: 1.5, sm: 2 },
                  px: { xs: 3, sm: 4 },
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
                Ajouter au panier
              </Button>
            </Box>
          </Paper>
        </MotionBox>

        {modal && (
          <EditImageModal
            image={imageToEdit}
            originalImages={originalImages}
            onUpdate={handleUpdateImage}
            handleUpdateOldImage={handleUpdateOldImage}
            open={modal}
            handleClose={handleClose}
          />
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default ProductPreview;
