// import React from "react";
// import { Grid, Typography } from "@mui/material";
// import Footer from "../footer/footer";
// import Navbar from "../Navbar/navbar";
// import "./expedition.css";
// const Expedition = () => {
//   return (
//     <div>
//       <Navbar />
//       <Grid
//         container
//         justifyContent="center"
//         alignItems="center"
//         className="expedition-container"
//       >
//         <Grid item className="expedition-box">
//           <Typography variant="h4" className="expedition-title">
//             Expédition
//           </Typography>
//           <section className="expedition-content">
//             <Typography variant="h6" style={{ color: "#C6A969" }}>
//               Commande en cours de traitement
//             </Typography>
//             <Typography>
//               Traitement des commandes : 2-3 jours ouvrés.{" "}
//             </Typography>
//             <Typography>
//               Vous recevrez des notifications par e-mail ou par téléphone avec
//               les mises à jour de l'état des commandes.
//             </Typography>
//             <Typography>
//               Si vous devez mettre à jour vos informations d'expédition,
//               veuillez nous contacter dès que possible. Si votre commande n'est
//               pas encore emballée, nous pourrons la mettre à jour.
//             </Typography>
//             <Typography variant="h6" style={{ color: "#C6A969" }}>
//               Livrasion
//             </Typography>
//             <Typography>
//               nous facturons un forfait de 7 D quel que soit le nombre de colis
//               que vous commandez.
//               <br /> La livraison prend généralement 7 jours ouvrables pour les
//               destinations à travers le pays, avec une durée maximale de 6 jours
//               ouvrables.
//               <br /> Si vous souhaitez accélérer votre commande, n'hésitez pas à
//               nous contacter."
//             </Typography>
//           </section>
//         </Grid>
//       </Grid>
//       <div style={{ marginTop: "30px" }}>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Expedition;


import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";

const ExpeditionPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Données structurées pour le SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ShippingDeliveryTime",
    "name": "Livraison de Magnets Photo Personnalisés",
    "description": "Service de livraison rapide et sécurisé pour vos magnets photo personnalisés",
    "deliveryTime": {
      "@type": "QuantitativeValue",
      "minValue": "2",
      "maxValue": "5",
      "unitCode": "DAY"
    },
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "availableDeliveryMethod": "Colissimo",
    "hasDeliveryMethod": "Colissimo"
  };

  const avantagesLivraison = [
    {
      icon: <LocalShippingIcon sx={{ color: "#176B87", fontSize: 40 }} />,
      title: "Livraison Rapide",
      description: "Délai de livraison de 2 à 5 jours ouvrés en France métropolitaine",
    },
    {
      icon: <SecurityIcon sx={{ color: "#176B87", fontSize: 40 }} />,
      title: "Emballage Sécurisé",
      description: "Vos magnets sont soigneusement emballés pour garantir leur protection",
    },
    {
      icon: <AccessTimeIcon sx={{ color: "#176B87", fontSize: 40 }} />,
      title: "Suivi en Temps Réel",
      description: "Suivez votre commande à chaque étape de son parcours",
    },
    {
      icon: <LocationOnIcon sx={{ color: "#176B87", fontSize: 40 }} />,
      title: "Livraison Mondiale",
      description: "Expédition disponible dans le monde entier",
    },
  ];

  const etapesLivraison = [
    "Confirmation de votre commande",
    "Préparation de votre colis",
    "Expédition de votre commande",
    "Livraison à votre adresse",
    "Confirmation de réception",
  ];

  return (
    <>
      <Helmet>
        <title>Livraison - Magnets Photo Personnalisés | Expédition Rapide et Sécurisée</title>
        <meta
          name="description"
          content="Découvrez notre service de livraison rapide et sécurisé pour vos magnets photo personnalisés. Livraison en 2-5 jours ouvrés en France, suivi en temps réel et emballage soigné."
        />
        <meta
          name="keywords"
          content="livraison magnets, expédition magnets, délai livraison magnets, suivi commande magnets, frais de port magnets"
        />
        <meta property="og:title" content="Livraison - Magnets Photo Personnalisés" />
        <meta
          property="og:description"
          content="Service de livraison rapide et sécurisé pour vos magnets photo personnalisés. Suivi en temps réel et emballage soigné."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://votre-site.com/livraison" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Livraison - Magnets Photo Personnalisés" />
        <meta
          name="twitter:description"
          content="Service de livraison rapide et sécurisé pour vos magnets photo personnalisés."
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
              Livraison de vos Magnets
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
              Un service de livraison rapide et sécurisé pour vos magnets photo personnalisés
            </Typography>
          </Box>

          {/* Avantages de livraison */}
          <Grid
            container
            spacing={3}
            component="section"
            aria-label="Avantages de livraison"
            sx={{ mb: { xs: 4, sm: 6, md: 8 } }}
          >
            {avantagesLivraison.map((avantage, index) => (
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
                    {avantage.icon}
                    <Typography
                      component="h2"
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                        color: "#176B87",
                      }}
                    >
                      {avantage.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#666",
                        fontSize: { xs: "0.8rem", sm: "0.9rem" },
                      }}
                    >
                      {avantage.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Étapes de livraison */}
          <Box
            component="section"
            aria-label="Étapes de livraison"
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              p: { xs: 2, sm: 3, md: 4 },
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              mb: { xs: 4, sm: 6, md: 8 },
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
              Le parcours de votre commande
            </Typography>
            <List>
              {etapesLivraison.map((etape, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "#176B87" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={etape}
                      primaryTypographyProps={{
                        sx: {
                          fontSize: { xs: "0.9rem", sm: "1rem" },
                          color: "#444",
                        },
                      }}
                    />
                  </ListItem>
                  {index < etapesLivraison.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Box>

          {/* Informations supplémentaires */}
          <Box
            component="section"
            aria-label="Informations supplémentaires"
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
                mb: 2,
              }}
            >
              Informations importantes
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography
                  component="h3"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    fontWeight: "bold",
                    color: "#176B87",
                    mb: 1,
                  }}
                >
                  Délais de livraison
                </Typography>
                <Typography
                  sx={{
                    color: "#666",
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    mb: 2,
                  }}
                >
          
                  •  5-10 jours ouvrés
                  <br />
               
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  component="h3"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    fontWeight: "bold",
                    color: "#176B87",
                    mb: 1,
                  }}
                >
                  Frais de livraison
                </Typography>
                <Typography
                  sx={{
                    color: "#666",
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}
                >
                  •  sur toute la Tunisie : 7 DT
                  <br />
                 
               
                 
                
                 
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default ExpeditionPage;