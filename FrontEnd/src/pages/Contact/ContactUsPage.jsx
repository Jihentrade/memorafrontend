import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  AccessTime as AccessTimeIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";

const ContactUsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Données structurées pour le SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact - Magnets Photo Personnalisés",
    description:
      "Contactez-nous pour toute question concernant vos magnets photo personnalisés",
    mainEntity: {
      "@type": "Organization",
      name: "Magnets Photo Personnalisés",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+33-1-23-45-67-89",
        contactType: "customer service",
        email: "contact@votre-site.com",
        availableLanguage: ["French", "English"],
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Rue des Magnets",
        addressLocality: "Paris",
        postalCode: "75000",
        addressCountry: "FR",
      },
    },
  };

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ color: "#176B87", fontSize: 40 }} />,
      title: "Email",
      content: "contact@votre-site.com",
      description: "Réponse sous 24h",
    },
    {
      icon: <PhoneIcon sx={{ color: "#176B87", fontSize: 40 }} />,
      title: "Téléphone",
      content: "+33 1 23 45 67 89",
      description: "Lun-Ven, 9h-18h",
    },
    {
      icon: <LocationIcon sx={{ color: "#176B87", fontSize: 40 }} />,
      title: "Adresse",
      content: "123 Rue des Magnets, 75000 Paris",
      description: "Boutique ouverte du lundi au samedi",
    },
    {
      icon: <AccessTimeIcon sx={{ color: "#176B87", fontSize: 40 }} />,
      title: "Horaires",
      content: "Lundi - Samedi",
      description: "9h00 - 19h00",
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simuler l'envoi du formulaire
    try {
      // Ici, vous ajouteriez votre logique d'envoi de formulaire
      setSnackbar({
        open: true,
        message: "Votre message a été envoyé avec succès !",
        severity: "success",
      });
      setFormData({
        nom: "",
        email: "",
        sujet: "",
        message: "",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Une erreur est survenue. Veuillez réessayer.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Helmet>
        <title>
          Contact - Magnets Photo Personnalisés | Service Client Réactif
        </title>
        <meta
          name="description"
          content="Contactez notre équipe pour toute question sur vos magnets photo personnalisés. Service client réactif, réponse sous 24h. Email, téléphone et boutique à Paris."
        />
        <meta
          name="keywords"
          content="contact magnets photo, service client magnets, support magnets, boutique magnets paris, horaires magnets"
        />
        <meta
          property="og:title"
          content="Contact - Magnets Photo Personnalisés"
        />
        <meta
          property="og:description"
          content="Contactez notre équipe pour toute question sur vos magnets photo personnalisés. Service client réactif et professionnel."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://votre-site.com/contact" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Contact - Magnets Photo Personnalisés"
        />
        <meta
          name="twitter:description"
          content="Contactez notre équipe pour toute question sur vos magnets photo personnalisés."
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Navbar />
      <Box
        component="main"
        sx={{
          bgcolor: "#f7f5f2",
          minHeight: "100vh",
          py: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          {/* En-tête */}
          <Box
            component="header"
            sx={{
              textAlign: "center",
              mb: { xs: 3, sm: 4, md: 6 },
            }}
          >
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                fontWeight: "bold",
                color: "#176B87",
                mb: 1,
              }}
            >
              Contactez-nous
            </Typography>
            <Typography
              component="p"
              sx={{
                color: "#666",
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              Notre équipe est à votre disposition pour répondre à toutes vos
              questions
            </Typography>
          </Box>

          {/* Informations de contact */}
          <Grid
            container
            spacing={3}
            component="section"
            aria-label="Informations de contact"
            sx={{ mb: { xs: 4, sm: 6, md: 8 } }}
          >
            {contactInfo.map((info, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: "center",
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    {info.icon}
                    <Typography
                      component="h2"
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                        color: "#176B87",
                      }}
                    >
                      {info.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#444",
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        fontWeight: 500,
                      }}
                    >
                      {info.content}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#666",
                        fontSize: { xs: "0.8rem", sm: "0.9rem" },
                      }}
                    >
                      {info.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Formulaire de contact */}
          <Box
            component="section"
            aria-label="Formulaire de contact"
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              p: { xs: 2, sm: 3, md: 4 },
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
                fontWeight: "bold",
                color: "#176B87",
                mb: 3,
                textAlign: "center",
              }}
            >
              Envoyez-nous un message
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#176B87",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#176B87",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Sujet"
                    name="sujet"
                    value={formData.sujet}
                    onChange={handleChange}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#176B87",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#176B87",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: "#176B87",
                      color: "#fff",
                      py: 1.5,
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      "&:hover": {
                        bgcolor: "#145C73",
                      },
                    }}
                  >
                    Envoyer le message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </Box>
      <Footer />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ContactUsPage;
