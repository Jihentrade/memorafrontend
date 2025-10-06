const clientService = require("../services/clientservices");
const clientModel = require("../models/clientmodel");
//Creation d'un client
const createClient = async (req, res) => {
  const { name, lastname, phone, address } = req.body;

  const newClient = {
    name,
    lastname,
    phone,
    address,
  };

  const client = await clientService.createClient(newClient);

  res.json({
    message: "Client created successfully",
    status: 201,
    data: client,
  });
};
//************************************************* */
const getClient = async (req, res) => {
  try {
    const clientId = req.params.clientId; // Utilisez clientId au lieu de _id

    try {
      const client = await clientService.searchClients(clientId);
      if (!client) {
        return res.status(404).json({ message: "Client introuvable" });
      }

      res.status(200).json({ client });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération du client" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération du client " });
  }
};
//************************************************ */
//Recherche un client

const searchClient = async (req, res) => {
  const id = req.params._id;

  const client = await clientService.searchClients(id);
  if (client === 0) {
    return res.status(404).json({
      message: "Client not found",
      status: 404,
    });
  }

  res.json({
    message: "Client found!",
    status: 200,
    data: client,
  });
};
//*************************************************************** */
//supprimer un client

const deleteClient = async (req, res) => {
  const id = req.params.clientId;

  try {
    const result = await clientService.deleteClientById(id);
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Client not found",
        status: 404,
      });
    }
    9;
    res.json({
      message: "Client deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error(
      `Une erreur est survenue lors de la suppression du client avec l'email ${id}: ${error.message}`
    );
    return false;
  }
};
//*************************************************************** */
const findAllClients = async (req, res) => {
  try {
    const clients = await clientService.findAll();
    res.status(200).json({
      clients,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || " erreur .",
    });
  }
};
//********************************************************************** */
// Update CLient
const updateClient = async (req, res) => {
  const { _id } = req.params;
  const client = req.body;
  try {
    const updatedClient = await clientService.updateClient(_id, client);
    res.status(200).json(updatedClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
//*********************************************** */
const sendDevis = async (req, res) => {
  try {
    const { name, email, image, message } = req.body;
    const response = await clientService.sendDeviss(
      name,
      email,
      image,
      message
    );
    // await newsletter.save()

    res.status(200).json({ message: response });
  } catch (error) {
    console.error("Erreur lors de l'envoi de la devis", error);
    res.status(500).json({ message: "Erreur lors de l'envoi de la devis" });
  }
};
//*********************************************************************** */
module.exports = {
  createClient,
  searchClient,
  deleteClient,
  updateClient,
  findAllClients,
  getClient,
  sendDevis,
};
