const commandeService = require("../services/commandeservices");
const CommandeModel = require("../models/commandemodel");
const { uploadMultiple } = require("../middlewares/upload");
//Creation d'une commande avec upload d'images
const createCommande = async (req, res) => {
  uploadMultiple(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        message: "Erreur lors de l'upload des images",
        error: err.message,
      });
    }

    try {
      // Exiger un client existant fourni par le frontend
      const clientId = req.body.client;
      if (!clientId || clientId === "null") {
        return res.status(400).json({
          message: "Client requis pour créer la commande",
        });
      }

      // Images optionnelles
      const imagePaths = req.files ? req.files.map((file) => file.path) : [];

      const lastCommande = await CommandeModel.findOne(
        {},
        {},
        { sort: { number: -1 } }
      );

      let nextNumber = 1;
      const now = new Date();
      const year = now.getFullYear();
      let month = (now.getMonth() + 1).toString().padStart(2, "0");

      if (
        lastCommande &&
        lastCommande.dateCommande.getMonth() === now.getMonth() &&
        lastCommande.dateCommande.getFullYear() === year
      ) {
        nextNumber = lastCommande.number + 1;
      }

      const numeroCommande = `${year}-${month}${nextNumber
        .toString()
        .padStart(2, "0")}`;

      const newCommande = new CommandeModel({
        number: nextNumber,
        client: clientId,
        numeroCommande,
        dateCommande: now,
        images: imagePaths,
        // Champs optionnels
        montantTotal: req.body.montantTotal
          ? parseFloat(req.body.montantTotal)
          : 0,
        modePayement: req.body.modePayement || "en_attente",
      });

      const savedCommande = await newCommande.save();

      res.status(201).json({
        message: "Commande créée avec succès",
        data: savedCommande,
      });
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
      res.status(500).json({
        message: "Erreur lors de la création de la commande",
        error: error.message,
      });
    }
  });
};

//************************************************* */
//supprimer une commande
const deleteCommande = async (req, res) => {
  commandeService
    .deleteCommande(req.params._id)
    .then(() => {
      res.send({ message: "La commande a été supprimé avec succès." });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur est survenue lors de la suppression de la commande.",
      });
    });
};
//********************************************************************** */
// Update Commande
const updateCommande = async (req, res) => {
  const { _id } = req.params;
  const commande = req.body;
  try {
    const updateCommande = await commandeService.updateCommande(_id, commande);
    res.status(200).json(updateCommande);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
//************************************************ */
//Recherche une commande

const searchCommande = async (req, res) => {
  const id = req.params._id;
  const commande = await commandeService.searchCommande(id);
  if (commande === 0) {
    return res.status(404).json({
      message: "Commande not found",
      status: 404,
    });
  }

  res.json({
    message: "Commande found!",
    status: 200,
    data: commande,
  });
};
//*************************************************************** */
const findAllCommande = async (req, res) => {
  try {
    const commandes = await commandeService.findAll();
    res.status(200).json({
      commandes,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || " erreur .",
    });
  }
};

//*********************************************************************** */
module.exports = {
  searchCommande,
  updateCommande,
  deleteCommande,
  createCommande,
  findAllCommande,
};
