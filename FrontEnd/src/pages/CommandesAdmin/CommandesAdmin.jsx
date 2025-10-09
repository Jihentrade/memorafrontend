import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import { BASE_URL } from "../../constants/api";
import {
  Search as SearchIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import {
  getAllCommandes,
  deleteCommande,
} from "../../services/commande.services";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";

const CommandesAdmin = () => {
  const [commandes, setCommandes] = useState([]);
  const [filteredCommandes, setFilteredCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCommande, setSelectedCommande] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [commandeToDelete, setCommandeToDelete] = useState(null);

  useEffect(() => {
    console.log("=== Configuration CommandesAdmin ===");
    console.log("🌐 BASE_URL:", BASE_URL);
    console.log("🔧 NODE_ENV:", process.env.NODE_ENV);
    console.log("📦 VERCEL:", process.env.VERCEL);
    console.log("====================================");
    fetchCommandes();
  }, []);

  useEffect(() => {
    const filtered = commandes.filter((commande) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        commande.numeroCommande?.toLowerCase().includes(searchLower) ||
        commande.client?.nom?.toLowerCase().includes(searchLower) ||
        commande.client?.prenom?.toLowerCase().includes(searchLower) ||
        commande.montantTotal?.toString().includes(searchLower)
      );
    });
    setFilteredCommandes(filtered);
  }, [commandes, searchTerm]);

  const fetchCommandes = async () => {
    try {
      setLoading(true);
      const response = await getAllCommandes();
      console.log("📦 Commandes chargées:", response.commandes?.length || 0);
      if (response.commandes && response.commandes.length > 0) {
        console.log("🖼️ Exemple de commande avec images:", {
          numeroCommande: response.commandes[0].numeroCommande,
          images: response.commandes[0].images,
        });
      }
      setCommandes(response.commandes || []);
      setError(null);
    } catch (error) {
      console.error("Erreur lors du chargement des commandes:", error);
      setError("Erreur lors du chargement des commandes");
    } finally {
      setLoading(false);
    }
  };

  const handleViewCommande = (commande) => {
    setSelectedCommande(commande);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCommande(null);
  };

  const handleDeleteClick = (commande) => {
    setCommandeToDelete(commande);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!commandeToDelete) return;

    try {
      setLoading(true);
      await deleteCommande(commandeToDelete._id);

      // Mettre à jour la liste des commandes
      await fetchCommandes();

      setDeleteDialogOpen(false);
      setCommandeToDelete(null);

      // Message de succès
      alert("Commande supprimée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert(
        "Erreur lors de la suppression de la commande. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setCommandeToDelete(null);
  };

  const checkBackendServer = async () => {
    try {
      const BASE_URL =
        process.env.NODE_ENV === "production"
          ? "https://memoraa.onrender.com/"
          : "http://localhost:4001/";

      const response = await fetch(`${BASE_URL}commande/findAllCommande`);

      console.log("Backend server status:", response.status);
      return response.ok;
    } catch (error) {
      console.log("Backend server not accessible:", error.message);
      return false;
    }
  };

  // Helper pour construire l'URL correcte de l'image
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      console.log("❌ getImageUrl: imagePath vide");
      return "";
    }

    console.log("🖼️ getImageUrl - imagePath reçu:", imagePath);
    console.log("🌐 BASE_URL:", BASE_URL);

    let cleanPath = imagePath;
    if (cleanPath.startsWith("uploads/")) {
      cleanPath = cleanPath.substring(8);
    } else if (cleanPath.startsWith("/uploads/")) {
      cleanPath = cleanPath.substring(9);
    }

    const baseUrl = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
    const finalUrl = `${baseUrl}/uploads/${cleanPath}`;

    console.log("✅ URL finale construite:", finalUrl);
    return finalUrl;
  };

  const openImageInNewTab = (imagePath, index) => {
    try {
      console.log("Ouverture de l'image dans un nouvel onglet:", imagePath);

      // Construire l'URL complète
      const imageUrl = getImageUrl(imagePath);
      console.log("URL complète:", imageUrl);

      // Nom du fichier basé sur la commande et l'index
      const commandeNumber = selectedCommande?.numeroCommande || "commande";
      const fileExtension = imagePath.split(".").pop() || "jpg";
      const fileName = `${commandeNumber}_image_${index + 1}.${fileExtension}`;
      console.log("Nom de fichier suggéré:", fileName);

      // Ouvrir l'image dans un nouvel onglet
      const newTab = window.open(imageUrl, "_blank");

      if (!newTab) {
        // Si popup bloqué, essayer avec un lien direct
        const link = document.createElement("a");
        link.href = imageUrl;
        link.target = "_blank";
        link.download = fileName;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log("✅ Image ouverte via lien direct");
      } else {
        console.log("✅ Image ouverte dans un nouvel onglet");

        // Ajouter un message d'information
        setTimeout(() => {
          alert(
            `Image ouverte dans un nouvel onglet.\n\n` +
              `Pour télécharger :\n` +
              `1. Clic droit sur l'image\n` +
              `2. "Enregistrer l'image sous..."\n` +
              `3. Nom suggéré : ${fileName}`
          );
        }, 1000);
      }
    } catch (error) {
      console.error("❌ Erreur lors de l'ouverture:", error);
      alert(
        `Impossible d'ouvrir l'image ${index + 1}.\n\n` +
          `Erreur: ${error.message}\n\n` +
          `Vérifiez que le serveur backend est démarré sur le port 4001.`
      );
    }
  };

  const downloadAllImages = async () => {
    if (!selectedCommande?.images || selectedCommande.images.length === 0) {
      alert("Aucune image à télécharger");
      return;
    }

    try {
      console.log("Début du téléchargement de toutes les images");
      console.log("Images à télécharger:", selectedCommande.images);

      // Vérifier si le serveur backend est accessible
      const isBackendAccessible = await checkBackendServer();
      if (!isBackendAccessible) {
        alert(
          "Le serveur backend n'est pas accessible. Vérifiez qu'il est démarré sur le port 4001."
        );
        return;
      }

      // Télécharger les images une par une pour éviter les conflits
      console.log("Début du téléchargement séquentiel...");
      let successCount = 0;
      let errorCount = 0;

      for (let i = 0; i < selectedCommande.images.length; i++) {
        try {
          console.log(
            `\n--- Image ${i + 1}/${selectedCommande.images.length} ---`
          );
          openImageInNewTab(selectedCommande.images[i], i);
          successCount++;

          // Petite pause entre les téléchargements
          if (i < selectedCommande.images.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        } catch (error) {
          console.error(`❌ Erreur image ${i + 1}:`, error);
          errorCount++;
        }
      }

      console.log("\n=== RÉSULTAT ===");
      console.log(`✅ Succès: ${successCount}`);
      console.log(`❌ Erreurs: ${errorCount}`);

      if (errorCount > 0) {
        alert(
          `Téléchargement terminé avec des erreurs.\n\n` +
            `✅ Succès: ${successCount}\n` +
            `❌ Erreurs: ${errorCount}\n\n` +
            `Vérifiez la console pour plus de détails.`
        );
      } else {
        alert(`✅ Toutes les images ont été téléchargées avec succès !`);
      }

      console.log("Téléchargement de toutes les images terminé");
    } catch (error) {
      console.error(
        "Erreur lors du téléchargement de toutes les images:",
        error
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "en_attente":
        return "warning";
      case "confirme":
        return "success";
      case "annule":
        return "error";
      default:
        return "default";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Chargement des commandes...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Box sx={{ flex: 1, p: 3 }}>
        <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
          <Typography
            variant="h4"
            sx={{ mb: 3, color: "#176B87", fontWeight: "bold" }}
          >
            Gestion des Commandes
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Rechercher par numéro de commande, nom, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          <Grid container spacing={3}>
            {filteredCommandes.map((commande) => (
              <Grid item xs={12} md={6} lg={4} key={commande._id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    borderRadius: 2,
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#176B87" }}
                      >
                        {commande.numeroCommande}
                      </Typography>
                      <Chip
                        label={commande.modePayement || "En attente"}
                        color={getStatusColor(commande.modePayement)}
                        size="small"
                      />
                    </Box>

                    {commande.client && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Client:</strong> {commande.client.name}{" "}
                          {commande.client.lastname}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Adresse:</strong> {commande.client.address}
                        </Typography>
                        {commande.client.phone && (
                          <Typography variant="body2" color="text.secondary">
                            <strong>Téléphone:</strong> {commande.client.phone}
                          </Typography>
                        )}
                      </Box>
                    )}

                    <Typography
                      variant="h6"
                      sx={{ color: "#2e7d32", fontWeight: "bold", mb: 2 }}
                    >
                      {commande.montantTotal} Dt
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      <strong>Date:</strong> {formatDate(commande.dateCommande)}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      <strong>Images:</strong> {commande.images?.length || 0}{" "}
                      photo(s)
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
                      <Button
                        variant="outlined"
                        startIcon={<ViewIcon />}
                        onClick={() => handleViewCommande(commande)}
                        sx={{ flex: 1 }}
                      >
                        Voir
                      </Button>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(commande)}
                        title="Supprimer la commande"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {filteredCommandes.length === 0 && !loading && (
            <Box
              sx={{
                textAlign: "center",
                py: 8,
                color: "text.secondary",
              }}
            >
              <Typography variant="h6">
                {searchTerm ? "Aucune commande trouvée" : "Aucune commande"}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle sx={{ backgroundColor: "#176B87", color: "white" }}>
          Détails de la commande {selectedCommande?.numeroCommande}
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedCommande && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 2, color: "#176B87" }}>
                    Informations Client
                  </Typography>
                  {selectedCommande.client && (
                    <Box sx={{ mb: 3 }}>
                      <Typography>
                        <strong>Nom:</strong> {selectedCommande.client.lastname}
                      </Typography>
                      <Typography>
                        <strong>Prénom:</strong> {selectedCommande.client.name}
                      </Typography>
                      {selectedCommande.client.phone && (
                        <Typography>
                          <strong>Téléphone:</strong>{" "}
                          {selectedCommande.client.phone}
                        </Typography>
                      )}
                      {selectedCommande.client.address && (
                        <Typography>
                          <strong>Adresse:</strong>{" "}
                          {selectedCommande.client.address}
                        </Typography>
                      )}
                    </Box>
                  )}

                  <Typography variant="h6" sx={{ mb: 2, color: "#176B87" }}>
                    Informations Commande
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Typography>
                      <strong>Numéro:</strong> {selectedCommande.numeroCommande}
                    </Typography>
                    <Typography>
                      <strong>Montant:</strong> {selectedCommande.montantTotal}{" "}
                      €
                    </Typography>
                    <Typography>
                      <strong>Date:</strong>{" "}
                      {formatDate(selectedCommande.dateCommande)}
                    </Typography>
                    <Typography>
                      <strong>Statut:</strong>{" "}
                      {selectedCommande.modePayement || "En attente"}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "#176B87" }}>
                      Images ({selectedCommande.images?.length || 0})
                    </Typography>
                    {selectedCommande.images?.length > 0 && (
                      <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        onClick={downloadAllImages}
                        size="small"
                        sx={{
                          color: "#176B87",
                          borderColor: "#176B87",
                          "&:hover": {
                            backgroundColor: "#176B87",
                            color: "white",
                          },
                        }}
                      >
                        Ouvrir toutes les images
                      </Button>
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 1,
                      maxHeight: "400px",
                      overflowY: "auto",
                    }}
                  >
                    {selectedCommande.images?.length > 0 ? (
                      selectedCommande.images.map((imagePath, index) => (
                        <Box
                          key={index}
                          sx={{
                            position: "relative",
                            width: "100%",
                            height: "100px",
                            borderRadius: 1,
                            border: "1px solid #e0e0e0",
                            overflow: "hidden",
                            backgroundColor: "#f5f5f5",
                            "&:hover .download-btn": {
                              opacity: 1,
                            },
                          }}
                        >
                          <Box
                            component="img"
                            src={getImageUrl(imagePath)}
                            alt={`Image ${index + 1}`}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              const imageUrl = getImageUrl(imagePath);
                              console.error(
                                "❌ Erreur de chargement de l'image"
                              );
                              console.error("📁 Chemin original:", imagePath);
                              console.error("🔗 URL construite:", imageUrl);
                              console.error("🌐 BASE_URL actuelle:", BASE_URL);
                              console.error("🔧 Environnement:", {
                                NODE_ENV: process.env.NODE_ENV,
                                VERCEL: process.env.VERCEL,
                              });

                              e.target.style.display = "none";
                              const placeholder = e.target.parentElement;
                              placeholder.innerHTML = `
                                <div style="
                                  display: flex;
                                  flex-direction: column;
                                  align-items: center;
                                  justify-content: center;
                                  height: 100%;
                                  background-color: #ffebee;
                                  color: #c62828;
                                  font-size: 11px;
                                  text-align: center;
                                  padding: 5px;
                                ">
                                  <div style="font-weight: bold; margin-bottom: 4px;">Image ${
                                    index + 1
                                  }</div>
                                  <div style="font-size: 10px; color: #d32f2f;">Erreur de chargement</div>
                                  <div style="font-size: 9px; color: #999; margin-top: 4px; word-break: break-all;">${imagePath}</div>
                                </div>
                              `;
                            }}
                          />
                          {/* Bouton de téléchargement individuel */}
                          <IconButton
                            className="download-btn"
                            onClick={() => openImageInNewTab(imagePath, index)}
                            sx={{
                              position: "absolute",
                              top: 4,
                              right: 4,
                              backgroundColor: "rgba(0, 0, 0, 0.7)",
                              color: "white",
                              opacity: 0,
                              transition: "opacity 0.2s",
                              "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.9)",
                              },
                              width: 32,
                              height: 32,
                            }}
                            size="small"
                          >
                            <DownloadIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Box>
                      ))
                    ) : (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          gridColumn: "1 / -1",
                          textAlign: "center",
                          py: 2,
                        }}
                      >
                        Aucune image disponible
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de confirmation de suppression */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle sx={{ backgroundColor: "#d32f2f", color: "white" }}>
          Confirmer la suppression
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Êtes-vous sûr de vouloir supprimer cette commande ?
          </Typography>
          {commandeToDelete && (
            <Box sx={{ mb: 2 }}>
              <Typography>
                <strong>Commande:</strong> {commandeToDelete.numeroCommande}
              </Typography>
              <Typography>
                <strong>Client:</strong> {commandeToDelete.client?.prenom}{" "}
                {commandeToDelete.client?.nom}
              </Typography>
              <Typography>
                <strong>Montant:</strong> {commandeToDelete.montantTotal} Dt
              </Typography>
            </Box>
          )}
          <Typography color="error" sx={{ fontWeight: "bold" }}>
            ⚠️ Cette action est irréversible !
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleDeleteCancel}
            color="primary"
            variant="outlined"
          >
            Annuler
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </Box>
  );
};

export default CommandesAdmin;
