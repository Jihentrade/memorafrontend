import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  Button,
  Grid,
  Typography,
  Box,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./Dropzone.css";
import Footer from "../../components/footer";
import Navbar from "../../components/Navbar/navbar";
import { useNavigate } from "react-router-dom";
import EditImageModal from "./editImage";
import { motion } from "framer-motion";

const MotionBox = motion.div;

const MyDropzone = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [modal, setModal] = useState(false);
  const [imageToEdit, setImageToEdit] = useState({ image: null, index: null });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (selectedImages.length + acceptedFiles.length > 9) {
        setShowAlert(true);
        return;
      }
      const newImages = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setSelectedImages([...selectedImages, ...newImages]);
    },
    [selectedImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxSize: 5242880, // 5MB
  });

  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const EditImage = (image, index) => {
    if (!modal) {
      setModal(true);
      setImageToEdit({ image: image, index: index });
    }
  };

  const navigate = useNavigate();

  const handleAddToCart = () => {
    const imagesString = JSON.stringify(selectedImages);
    navigate(`/productPreview?images=${encodeURIComponent(imagesString)}`);
  };

  const handleClose = () => {
    setModal(false);
  };

  useEffect(() => {
    setIsButtonDisabled(selectedImages.length !== 9);
  }, [selectedImages]);

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
            severity="warning"
            sx={{
              mb: 2,
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Vous ne pouvez pas ajouter plus de 9 images.
          </Alert>
        )}
        {modal && (
          <EditImageModal
            image={imageToEdit.image}
            index={imageToEdit.index}
            open={modal}
            handleClose={handleClose}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />
        )}
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <MotionBox variants={itemVariants}>
                <Paper
                  elevation={3}
                  sx={{
                    p: { xs: 2, sm: 3, md: 4 },
                    borderRadius: "12px",
                    backgroundColor: "white",
                  }}
                >
                  <Typography
                    variant="h2"
                    component="h1"
                    align="center"
                    sx={{
                      mb: 3,
                      fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
                      fontWeight: "bold",
                      color: "#176B87",
                    }}
                  >
                    Téléchargez vos photos
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    sx={{
                      mb: 4,
                      color: "#666",
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                    }}
                  >
                    Glissez-déposez jusqu'à 9 photos ou cliquez pour les
                    sélectionner
                  </Typography>
                  <Box
                    {...getRootProps()}
                    sx={{
                      border: "2px dashed",
                      borderColor: isDragActive ? "#597E52" : "#e2cfcf",
                      borderRadius: "12px",
                      p: { xs: 3, sm: 4 },
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      backgroundColor: isDragActive
                        ? "rgba(89, 126, 82, 0.1)"
                        : "transparent",
                      "&:hover": {
                        borderColor: "#597E52",
                        backgroundColor: "rgba(89, 126, 82, 0.05)",
                      },
                    }}
                  >
                    <input {...getInputProps()} />
                    <CloudUploadIcon
                      sx={{
                        fontSize: { xs: "3rem", sm: "4rem" },
                        color: "#597E52",
                        mb: 2,
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#666",
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                      }}
                    >
                      {isDragActive
                        ? "Déposez les fichiers ici..."
                        : "Glissez-déposez des fichiers ici, ou cliquez pour sélectionner"}
                    </Typography>
                  </Box>
                </Paper>
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionBox variants={itemVariants}>
                <Paper
                  elevation={3}
                  sx={{
                    p: { xs: 2, sm: 3, md: 4 },
                    borderRadius: "12px",
                    backgroundColor: "white",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      mb: 3,
                      fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                      fontWeight: "bold",
                      color: "#176B87",
                    }}
                  >
                    Aperçu des images ({selectedImages.length}/9)
                  </Typography>
                  <Grid container spacing={2}>
                    {selectedImages.map((image, index) => (
                      <Grid key={index} item xs={6} sm={4}>
                        <MotionBox variants={itemVariants}>
                          <Box
                            sx={{
                              position: "relative",
                              borderRadius: "8px",
                              overflow: "hidden",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              transition: "transform 0.3s ease",
                              "&:hover": {
                                transform: "scale(1.02)",
                              },
                            }}
                          >
                            <Box
                              component="img"
                              src={image?.preview}
                              alt={`Image ${index + 1}`}
                              sx={{
                                width: "100%",
                                height: "150px",
                                objectFit: "cover",
                                display: "block",
                              }}
                            />
                            <Tooltip title="Supprimer l'image">
                              <IconButton
                                onClick={() => removeImage(index)}
                                sx={{
                                  position: "absolute",
                                  top: 4,
                                  right: 4,
                                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                                  "&:hover": {
                                    backgroundColor: "rgba(255, 255, 255, 1)",
                                  },
                                }}
                              >
                                <ClearIcon sx={{ color: "#597E52" }} />
                              </IconButton>
                            </Tooltip>
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
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={handleAddToCart}
                      disabled={isButtonDisabled}
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
                        "&.Mui-disabled": {
                          backgroundColor: "#ccc",
                          color: "#666",
                        },
                      }}
                    >
                      {isButtonDisabled
                        ? "Sélectionnez 9 images"
                        : "Ajouter au panier"}
                    </Button>
                  </Box>
                </Paper>
              </MotionBox>
            </Grid>
          </Grid>
        </MotionBox>
      </Container>
      <Footer />
    </Box>
  );
};

export default MyDropzone;
