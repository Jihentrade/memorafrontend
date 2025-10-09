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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";
import {
  Search as SearchIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Email as EmailIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import {
  getAllClients,
  deleteClient,
  updateClient,
} from "../../services/client.services";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";

const ClientsAdmin = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    lastname: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    const filtered = clients.filter((client) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        client.name?.toLowerCase().includes(searchLower) ||
        client.lastname?.toLowerCase().includes(searchLower) ||
        client.phone?.toString().includes(searchLower) ||
        client.address?.toLowerCase().includes(searchLower)
      );
    });
    setFilteredClients(filtered);
  }, [clients, searchTerm]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await getAllClients();
      setClients(response.clients || []);
      setError(null);
    } catch (error) {
      console.error("Erreur lors du chargement des clients:", error);
      setError("Erreur lors du chargement des clients");
    } finally {
      setLoading(false);
    }
  };

  const handleViewClient = (client) => {
    setSelectedClient(client);
    setDialogOpen(true);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setEditFormData({
      name: client.name || "",
      lastname: client.lastname || "",
      phone: client.phone || "",
      address: client.address || "",
    });
    setEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedClient(null);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedClient(null);
    setEditFormData({ name: "", lastname: "", phone: "", address: "" });
  };

  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateClient = async () => {
    if (!selectedClient) return;

    try {
      setLoading(true);
      await updateClient(selectedClient._id, editFormData);
      setSuccess("Client mis à jour avec succès");
      await fetchClients();
      handleCloseEditDialog();
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      setError("Erreur lors de la mise à jour du client");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!clientToDelete) return;

    try {
      setLoading(true);
      await deleteClient(clientToDelete._id);
      setSuccess("Client supprimé avec succès");
      await fetchClients();
      setDeleteDialogOpen(false);
      setClientToDelete(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      setError("Erreur lors de la suppression du client");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name, lastname) => {
    return `${name?.charAt(0) || ""}${lastname?.charAt(0) || ""}`.toUpperCase();
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
          py: 4,
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#176B87",
              mb: 1,
            }}
          >
            Gestion des Clients
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {clients.length} client{clients.length > 1 ? "s" : ""} au total
          </Typography>
        </Box>

        {/* Messages */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert
            severity="success"
            sx={{ mb: 2 }}
            onClose={() => setSuccess(null)}
          >
            {success}
          </Alert>
        )}

        {/* Barre de recherche */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <TextField
              fullWidth
              placeholder="Rechercher un client (nom, prénom, téléphone, adresse...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </CardContent>
        </Card>

        {/* Loading */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Liste des clients */}
        {!loading && (
          <TableContainer component={Paper} elevation={2}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#176B87" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Client
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Téléphone
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Adresse
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredClients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">
                        Aucun client trouvé
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClients.map((client) => (
                    <TableRow
                      key={client._id}
                      hover
                      sx={{
                        "&:hover": { bgcolor: "#f8f9fa" },
                      }}
                    >
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: "#176B87",
                              width: 40,
                              height: 40,
                            }}
                          >
                            {getInitials(client.name, client.lastname)}
                          </Avatar>
                          <Box>
                            <Typography fontWeight="bold">
                              {client.name} {client.lastname}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <PhoneIcon sx={{ color: "#176B87", fontSize: 18 }} />
                          {client.phone || "Non renseigné"}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <HomeIcon sx={{ color: "#176B87", fontSize: 18 }} />
                          {client.address || "Non renseigné"}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={() => handleViewClient(client)}
                          sx={{ color: "#176B87" }}
                        >
                          <ViewIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleEditClient(client)}
                          sx={{ color: "#2196f3" }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteClick(client)}
                          sx={{ color: "#f44336" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Dialog Voir Client */}
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ bgcolor: "#176B87", color: "white" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PersonIcon />
              Détails du Client
            </Box>
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            {selectedClient && (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 3,
                    pb: 2,
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#176B87",
                      width: 60,
                      height: 60,
                      fontSize: "1.5rem",
                    }}
                  >
                    {getInitials(selectedClient.name, selectedClient.lastname)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {selectedClient.name} {selectedClient.lastname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ID: {selectedClient._id}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mb: 0.5 }}
                    >
                      Nom
                    </Typography>
                    <Typography fontWeight="500">
                      {selectedClient.name || "Non renseigné"}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mb: 0.5 }}
                    >
                      Prénom
                    </Typography>
                    <Typography fontWeight="500">
                      {selectedClient.lastname || "Non renseigné"}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mb: 0.5 }}
                    >
                      Téléphone
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PhoneIcon sx={{ color: "#176B87", fontSize: 18 }} />
                      <Typography fontWeight="500">
                        {selectedClient.phone || "Non renseigné"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mb: 0.5 }}
                    >
                      Adresse
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <HomeIcon sx={{ color: "#176B87", fontSize: 18 }} />
                      <Typography fontWeight="500">
                        {selectedClient.address || "Non renseigné"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} variant="outlined">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog Modifier Client */}
        <Dialog
          open={editDialogOpen}
          onClose={handleCloseEditDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ bgcolor: "#2196f3", color: "white" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EditIcon />
              Modifier le Client
            </Box>
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Nom"
                name="name"
                value={editFormData.name}
                onChange={handleEditFormChange}
                fullWidth
              />
              <TextField
                label="Prénom"
                name="lastname"
                value={editFormData.lastname}
                onChange={handleEditFormChange}
                fullWidth
              />
              <TextField
                label="Téléphone"
                name="phone"
                value={editFormData.phone}
                onChange={handleEditFormChange}
                fullWidth
                type="tel"
              />
              <TextField
                label="Adresse"
                name="address"
                value={editFormData.address}
                onChange={handleEditFormChange}
                fullWidth
                multiline
                rows={3}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} variant="outlined">
              Annuler
            </Button>
            <Button
              onClick={handleUpdateClient}
              variant="contained"
              sx={{
                bgcolor: "#2196f3",
                "&:hover": { bgcolor: "#1976d2" },
              }}
            >
              Mettre à jour
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog Confirmation Suppression */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>
            <Typography>
              Êtes-vous sûr de vouloir supprimer le client{" "}
              <strong>
                {clientToDelete?.name} {clientToDelete?.lastname}
              </strong>{" "}
              ?
            </Typography>
            <Typography color="error" sx={{ mt: 1, fontSize: "0.875rem" }}>
              Cette action est irréversible.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              variant="outlined"
            >
              Annuler
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              color="error"
            >
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Footer />
    </>
  );
};

export default ClientsAdmin;
