const commandeModel = require("../models/commandemodel");
const clientModel = require("../models/clientmodel");
//*********************************************************** */
const createCommande = async (commandeData) => {
  const commande = new commandeModel(commandeData);
  const result = await commande.save();
  return result;
};
//*************************************************************************** */
//find All commande avec informations client
async function findAll() {
  const commandes = await commandeModel
    .find()
    .populate("client", "name lastname phone address");
  return commandes;
}
//*************************************************************************** */

const searchCommande = async (id) => {
  const commandes = await commandeModel
    .findOne({ _id: id })
    .populate("client", "name lastname phone address");

  return commandes;
};
//*************************************************************************** */
const deleteCommande = async (_id) => {
  return commandeModel.deleteOne({ _id: _id });
};
//*************************************************************************** */
const updateCommande = async (id, commande) => {
  try {
    const updatedCommande = await commandeModel.findByIdAndUpdate(
      { _id: id },
      commande,
      {
        new: true,
      }
    );
    return updatedCommande;
  } catch (err) {
    throw new Error(err.message);
  }
};
//**************************************************************************** */
module.exports = {
  createCommande,
  findAll,
  searchCommande,
  deleteCommande,
  updateCommande,
};
