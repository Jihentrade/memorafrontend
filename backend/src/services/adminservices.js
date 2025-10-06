const adminModel = require("../models/adminmodel");
const bcrypt = require("bcryptjs");
const { sendPasswordResetEmail } = require("../utils/email");
const createAdmin = async ({
  name,
  lastname,
  email,
  password,
  phone,
  role,
}) => {
  try {
    const existingUser = await adminModel.findOne({ email });
    if (existingUser) {
      throw new Error("Cet email est déjà utilisé");
    }
    // Créer un nouvel utilisateur
    const length = 8;
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const saltRounds = 10; // Nombre de tours de salage
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new adminModel({
      name,
      lastname,
      email,
      password: hashedPassword,
      phone,
      role,
    });
    const savedUser = await user.save();
    await sendPasswordResetEmail("new_user", email, password);
    console.log("savedUser", savedUser);
    return savedUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

//****************************************************************** */
//find All admins
async function findAll() {
  const admins = await adminModel.find();
  return admins;
}
//*************************************************************************** */

const searchAdmins = async (id) => {
  const admins = await adminModel.findOne({ _id: id });
  return admins;
};
//*************************************************************************** */
// //Supprimer un utilisateur

async function removeAdmin(_id) {
  return adminModel.deleteOne({ _id: _id });
}
//*************************************************************************** */
const updateAdmin = async (id, admin) => {
  try {
    const updatedAdmin = await adminModel.findByIdAndUpdate(
      { _id: id },
      admin,
      {
        new: true,
      }
    );
    return updatedAdmin;
  } catch (err) {
    throw new Error(err.message);
  }
};
//************************************************************************* */
//Mise a jour Mot de passe
const updatePasswordByEmail = async (email, currentPassword, newPassword) => {
  const admin = await adminModel.findOne({ email });
  if (!admin) {
    throw new Error("Utilisateur non trouvé");
  }
  const isPasswordCorrect = await bcrypt.compare(
    currentPassword,
    admin.password
  );
  if (!isPasswordCorrect) {
    throw new Error("Mot de passe actuel incorrect");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await adminModel.updateOne({ password: hashedPassword });

  return admin;
};

//*************************************************************************** */

module.exports = {
  updatePasswordByEmail,
  searchAdmins,
  removeAdmin,
  createAdmin,
  updateAdmin,
  findAll,
};
