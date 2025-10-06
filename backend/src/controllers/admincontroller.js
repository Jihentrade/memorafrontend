const adminService = require("../services/adminservices");
const adminModel = require("../models/adminmodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendPasswordResetEmail } = require("../../src/utils/email");
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
//Creation d'un client
const createAdmin = catchAsync(async (req, res) => {
  const { cin, name, lastname, phone, email, password, role } = req.body;
  try {
    const newAdmin = {
      cin,
      name,
      lastname,
      phone,
      email,
      password,
      role,
    };

    const admin = await adminService.createAdmin(newAdmin);
    res.send({ admin });
  } catch (error) {
    console.error(error);
    console.log("error fel adminController", error);
    res.status(500).send({ message: "Erreur lors de l'inscription" });
  }
});
//************************************************* */
//supprimer un admin
const deleteAdmin = async (req, res) => {
  adminService
    .removeAdmin(req.params._id)
    .then(() => {
      res.send({ message: "L'utilisateur a été supprimé avec succès." });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur est survenue lors de la suppression de l'utilisateur.",
      });
    });
};
//********************************************************************** */
// Update Admin
const updateAdmin = async (req, res) => {
  const { _id } = req.params;
  const admin = req.body;
  try {
    const updatedAdmin = await adminService.updateAdmin(_id, admin);
    res.status(200).json(updatedAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
//************************************************ */
//Recherche un admin

const searchAdmin = async (req, res) => {
  const id = req.params._id;

  const admin = await adminService.searchAdmins(id);
  if (admin === 0) {
    return res.status(404).json({
      message: "Admin not found",
      status: 404,
    });
  }

  res.json({
    message: "Admin found!",
    status: 200,
    data: admin,
  });
};
//*********************************************************************** */

const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;

    const decoded = jwt.verify(req.params.token, process.env.SECRET);
    const id = decoded.id;

    const admin = await adminModel.findById(id);
    if (!admin) {
      return res.status(404).json([{ msg: "Admin not found" }]);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await adminModel.findByIdAndUpdate(id, { password: hashedPassword });

    res.status(200).json({ email: admin.email });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//*************************************************************************** */
//Mot de passe obliee

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    let admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.status(400).json([{ msg: "admin not found" }]);
    }
    await sendPasswordResetEmail("resetPassword", admin.email, null);
    res.status(200).send("email sent sucessfully");
  } catch (error) {
    res.status(403).send(error);
  }
};
//*************************************************************** */
const findAllAdmin = async (req, res) => {
  try {
    const admins = await adminService.findAll();
    res.status(200).json({
      admins,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || " erreur .",
    });
  }
};

//********************************************************************* */
//Mise a jour le mot de passe
const updatePass = async (req, res) => {
  const { email, password, newPassword } = req.body;
  try {
    const updatedUser = await adminService.updatePasswordByEmail(
      email,
      password,
      newPassword
    );

    res.status(200).json({
      message: "Password updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
//*************************************************************************** */
module.exports = {
  forgotPassword,
  resetPassword,
  searchAdmin,
  createAdmin,
  deleteAdmin,
  updateAdmin,
  findAllAdmin,
  updatePass,
};
