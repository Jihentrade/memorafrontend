const clientModel = require("..//models/clientmodel");
const CodeReduction = require("../models/codeReduction");
const { sendDevis } = require("../utils/email");
const createClient = async (clientData) => {
  const client = new clientModel(clientData);
  const result = await client.save();
  return result;
};
//*************************************************************************** */
//find All clients
async function findAll() {
  const clients = await clientModel.find();
  return clients;
}
//*************************************************************************** */

const searchClients = async (id) => {
  try {
    const clients = await clientModel.findOne({ _id: id });

    return clients;
  } catch (error) {
    throw { error: "Erreur lors de la récupération du client par ID." };
  }
};
//*************************************************************************** */
const deleteClientById = async (_id) => {
  return clientModel.deleteOne({ _id: _id });
};

//*************************************************************************** */
const updateClient = async (id, client) => {
  try {
    const updatedClient = await clientModel.findByIdAndUpdate(
      { _id: id },
      client,
      {
        new: true,
      }
    );
    return updatedClient;
  } catch (err) {
    throw new Error(err.message);
  }
};
//*************************************************************************** */

async function sendDeviss(name, photo, message) {
  await sendDevis(name, photo, message);
}

//*********************************************************************** */
// Vérifier le code promo
const verifyPromoCode = async (code) => {
  try {
    console.log("hnee", code);
    const promoCode = await CodeReduction.findOne({ code: code, actif: true });
    console.log("esaber", promoCode);
    return promoCode;
  } catch (error) {
    throw new Error("Erreur lors de la vérification du code promo");
  }
};

//*********************************************************************** */

module.exports = {
  searchClients,
  deleteClientById,
  createClient,
  updateClient,
  findAll,
  sendDeviss,
  verifyPromoCode,
};
