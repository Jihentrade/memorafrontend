import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";

const AvisClientsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Données fictives des avis clients
  const avisClients = [
    {
      id: 1,
      nom: "Ahmed Ben Ali",
      date: "15 Mars 2024",
      note: 5,
      commentaire:
        "Magnifique qualité d'impression ! Les magnets sont très résistants et les couleurs sont éclatantes. Je recommande vivement !",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      nom: "Fatima Zahra",
      date: "10 Mars 2024",
      note: 5,
      commentaire:
        "Service client exceptionnel et livraison rapide. Les magnets sont parfaits pour décorer mon frigo avec les photos de ma famille.",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      nom: "Karim El Fassi",
      date: "5 Mars 2024",
      note: 4,
      commentaire:
        "Très bon rapport qualité-prix. Les magnets sont de belle taille et l'impression est nette. Je suis satisfait de mon achat.",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      nom: "Leila Ben Salah",
      date: "1 Mars 2024",
      note: 5,
      commentaire:
        "Commande facile et rapide. Les magnets sont arrivés bien emballés et en parfait état. Je vais certainement recommander !",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 5,
      nom: "Youssef Alami",
      date: "28 Février 2024",
      note: 5,
      commentaire:
        "Excellent service ! Les magnets sont de très bonne qualité et les photos sont superbes. Je suis ravi de mon achat.",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 6,
      nom: "Amina Benjelloun",
      date: "25 Février 2024",
      note: 4,
      commentaire:
        "Livraison rapide et magnets de qualité. Les couleurs sont fidèles aux photos originales. Je recommande !",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
  ];

  // Calcul des statistiques pour les données structurées
  const totalAvis = avisClients.length;
  const moyenneNotes =
    avisClients.reduce((acc, avis) => acc + avis.note, 0) / totalAvis;
  const avisPositifs = avisClients.filter((avis) => avis.note >= 4).length;

  // Données structurées pour les avis
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Magnets Photo Personnalisés",
    description:
      "Magnets photo personnalisés de haute qualité, parfaits pour décorer votre frigo avec vos plus beaux souvenirs.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: moyenneNotes.toFixed(1),
      reviewCount: totalAvis,
      bestRating: "5",
      worstRating: "1",
    },
    review: avisClients.map((avis) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: avis.nom,
      },
      datePublished: avis.date,
      reviewRating: {
        "@type": "Rating",
        ratingValue: avis.note,
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: avis.commentaire,
    })),
  };

  return (
    <>
      <Helmet>
        <title>
          Avis Clients - Magnets Photo Personnalisés | Qualité Premium
        </title>
        <meta
          name="description"
          content="Découvrez les avis de nos clients sur nos magnets photo personnalisés. Qualité d'impression exceptionnelle, service client réactif et livraison rapide. Note moyenne de 4.9/5 basée sur plus de 1000 avis."
        />
        <meta
          name="keywords"
          content="avis magnets photo, magnets personnalisés, qualité impression, service client magnets, livraison magnets"
        />
        <meta
          property="og:title"
          content="Avis Clients - Magnets Photo Personnalisés"
        />
        <meta
          property="og:description"
          content="Découvrez pourquoi nos clients adorent nos magnets photo personnalisés. Qualité premium et service exceptionnel."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://votre-site.com/avis-clients" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Avis Clients - Magnets Photo Personnalisés"
        />
        <meta
          name="twitter:description"
          content="Découvrez les avis de nos clients sur nos magnets photo personnalisés. Qualité premium garantie."
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
              Avis de nos clients
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
              Découvrez ce que nos clients pensent de nos magnets personnalisés
            </Typography>
          </Box>

          {/* Grille des avis */}
          <Grid
            container
            spacing={3}
            component="section"
            aria-label="Avis clients"
          >
            {avisClients.map((avis) => (
              <Grid item xs={12} sm={6} md={4} key={avis.id}>
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
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    {/* En-tête de l'avis */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        gap: 2,
                      }}
                    >
                      <Avatar
                        src={avis.avatar}
                        alt={`Photo de profil de ${avis.nom}`}
                        sx={{
                          width: { xs: 40, sm: 50 },
                          height: { xs: 40, sm: 50 },
                        }}
                      />
                      <Box>
                        <Typography
                          component="h2"
                          sx={{
                            fontWeight: "bold",
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                            color: "#176B87",
                          }}
                        >
                          {avis.nom}
                        </Typography>
                        <Typography
                          component="time"
                          dateTime={avis.date}
                          sx={{
                            color: "#666",
                            fontSize: { xs: "0.7rem", sm: "0.8rem" },
                          }}
                        >
                          {avis.date}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Note */}
                    <Rating
                      value={avis.note}
                      readOnly
                      aria-label={`Note de ${avis.note} sur 5`}
                      sx={{
                        mb: 1,
                        "& .MuiRating-iconFilled": {
                          color: "#176B87",
                        },
                      }}
                    />

                    {/* Commentaire */}
                    <Typography
                      component="blockquote"
                      sx={{
                        color: "#444",
                        fontSize: { xs: "0.8rem", sm: "0.9rem" },
                        lineHeight: 1.6,
                      }}
                    >
                      {avis.commentaire}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Section statistiques */}
          <Box
            component="section"
            aria-label="Statistiques des avis"
            sx={{
              mt: { xs: 4, sm: 6, md: 8 },
              textAlign: "center",
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
              Nos clients nous font confiance
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={6} sm={4}>
                <Typography
                  component="p"
                  sx={{
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                    fontWeight: "bold",
                    color: "#176B87",
                  }}
                >
                  98%
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    color: "#666",
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  }}
                >
                  Clients satisfaits
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography
                  component="p"
                  sx={{
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                    fontWeight: "bold",
                    color: "#176B87",
                  }}
                >
                  {moyenneNotes.toFixed(1)}/5
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    color: "#666",
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  }}
                >
                  Note moyenne
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography
                  component="p"
                  sx={{
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                    fontWeight: "bold",
                    color: "#176B87",
                  }}
                >
                  {avisPositifs}+
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    color: "#666",
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  }}
                >
                  Avis positifs
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

export default AvisClientsPage;
