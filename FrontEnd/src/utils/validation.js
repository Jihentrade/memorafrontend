import * as Yup from "yup";

export const validationUpdate = Yup.object({
  cin: Yup.number()
    .required("Le numéro de téléphone est requis")
    .test(
      "len",
      "Le numéro de téléphone doit être composé de 8 chiffres",
      (val) => val && val.toString().length === 8
    ),
  name: Yup.string()
    .required("Le nom est requis")
    .matches(/^[a-zA-Z]+$/, "Le nom n est pas valide"),

  lastname: Yup.string()
    .required("Le prenom est requis")
    .matches(/^[a-zA-Z]+$/, "Le prenomn n est pas valide"),
  phone: Yup.number()
    .integer("Le numéro de téléphone n'est pas valide")
    .required("Le numéro de téléphone est requis")
    .typeError("Le numéro de téléphone n'est pas valide")
    .test(
      "len",
      "Le numéro de téléphone doit être composé de 8 chiffres",
      (val) => val && val.toString().length === 8
    ),
  salaire: Yup.number().typeError("Le salaire doit être un entier"),
  avance: Yup.number().typeError("L'avance doit être un entier"),
});
/*************************************************************************** */
export const validationUpdateAdmin = Yup.object({
  cin: Yup.number()
    .required("Le numéro de téléphone est requis")
    .test(
      "len",
      "Le numéro de téléphone doit être composé de 8 chiffres",
      (val) => val && val.toString().length === 8
    ),

  name: Yup.string().required("Le nom est requis"),
  lastname: Yup.string().required("Le prenom est requis"),
  phone: Yup.number()
    .integer("Le numéro de téléphone n est pas valide")
    .required("Le numéro de téléphone est requis")
    .typeError("Le numéro de téléphone doit être un entier")
    .test(
      "len",
      "Le numéro de téléphone doit être composé de 8 chiffres",
      (val) => val && val.toString().length === 8
    ),
  email: Yup.string()
    .email("L'adresse email n'est pas valide")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
      "L'adresse email n'est pas valide"
    )
    .required("L'adresse email est obligatoire"),
  password: Yup.string().required("Le mot de passe est requis"),
  role: Yup.string().required("Le role est requis"),
});
/******************************************************************************* */
export const loginValidation = Yup.object({
  email: Yup.string()
    .email("L'adresse email n'est pas valide")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
      "L'adresse email n'est pas valide"
    )
    .required("L'adresse email est obligatoire"),
  password: Yup.string().required("Le mot de passe est requis"),
});
//******************************* Product *****************************/
export const AjoutProduitValidation = Yup.object({
  ref: Yup.string().required("La réferance est obligatoire"),
  name: Yup.string().required("Le nom est requis"),
  description: Yup.string().required("La description est requis"),
  // prixUnitaire: Yup.number().typeError("Le prix unitaire doit être un nombre"),
  quantite: Yup.number().typeError("Le prix unitaire doit être un nombre"),
  matiere: Yup.string().required("La matiere est requis"),
});
export const UpdateProduitValidation = Yup.object({
  ref: Yup.string().required("La réferance est obligatoire"),
  name: Yup.string().required("Le nom est requis"),
  description: Yup.string().required("La description est requis"),
  prixUnitaire: Yup.number().typeError("Le prix unitaire doit être un nombre"),
  quantite: Yup.number().typeError("Le prix unitaire doit être un nombre"),
  matiere: Yup.string().required("La matiere est requis"),
  type: Yup.string().required("Le type  est obligatoire"),
});
//************************************************************************** */
export const emailValidation = Yup.object({
  email: Yup.string()
    .email("L'adresse email n'est pas valide")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
      "L'adresse email n'est pas valide"
    )
    .required("L'adresse email est obligatoire"),
});
/**************************************************************************** */
export const AjoutUAdminValidation = Yup.object({
  cin: Yup.number()
    .integer("Le cin n est pas valide")
    .required("Le cin est requis")
    .typeError("Le cin doit être un entier")
    .test(
      "len",
      "Le cin doit être composé de 8 chiffres",
      (val) => val && val.toString().length === 8
    ),
  name: Yup.string().required("Le nom est requis"),
  lastname: Yup.string().required("Le prenom est requis"),
  phone: Yup.number()
    .integer("Le numéro de téléphone n est pas valide")
    .required("Le numéro de téléphone est requis")
    .typeError("Le numéro de téléphone doit être un entier")
    .test(
      "len",
      "Le numéro de téléphone doit être composé de 8 chiffres",
      (val) => val && val.toString().length === 8
    ),
  email: Yup.string()
    .email("L'adresse email n'est pas valide")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
      "L'adresse email n'est pas valide"
    )
    .required("L'adresse email est obligatoire"),
  password: Yup.string().required("Le mot de passe est requis"),
  role: Yup.string().required("Le role est requis"),
});
/********************************************************************** */
export const MdpsValidation = Yup.object({
  email: Yup.string()
    .email("L'adresse email n'est pas valide")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
      "L'adresse email n'est pas valide"
    )
    .required("L'adresse email est obligatoire"),
  password: Yup.string().required("Le mot de passe est obligatoire"),
  newPassword: Yup.string().required("Le mot de passe est obligatoire"),
});
/*********************************************************************** */
export const AjoutClientValidation = Yup.object({
  name: Yup.string().required("Le nom est requis"),
  lastname: Yup.string().required("Le prénom est requis"),
  phone: Yup.string()
    .matches(
      /^[0-9]{8}$/,
      "Le numéro de téléphone doit être composé de 8 chiffres"
    )
    .required("Le numéro de téléphone est requis"),
  address: Yup.string().required("Le champ adresse est obligatoire"),
  email: Yup.string()
    .email("L'adresse email n'est pas valide")
    .required("L'adresse email est obligatoire"),
  password: Yup.string().required("Le mot de passe est requis"),
});
/*************************************************************************** */
export const AjoutEmployeeValidation = Yup.object({
  cin: Yup.string()
    .required("Le CIN est requis")
    .matches(/^\d{8}$/, "Le CIN doit être composé de 8 chiffres"),

  name: Yup.string().required("Le nom est requis"),
  lastName: Yup.string().required("Le prenom est requis"),
  salaire: Yup.number().typeError("Le salaire doit être un entier"),
});
/************************************************************************* */
export const AjoutFournisseurValidation = Yup.object({
  nameSociete: Yup.string().required("La réferance est obligatoire"),
  fisc: Yup.number()
    .integer("L'Identifiant Fiscal  n est pas valide")
    .required("L'Identifiant Fiscal  est requis")
    .typeError("L'Identifiant Fiscal  doit être un entier")
    .test(
      "len",
      "L'Identifiant Fiscal  doit être composé de 7 chiffres",
      (val) => val && val.toString().length === 7
    ),
  rib: Yup.number()
    .integer("Le  Relevé d'Identité Bancaire  n est pas valide")
    .required("Le Relevé d'Identité Bancaire  est requis")
    .typeError("Le Relevé d'Identité Bancaire  doit être un entier")
    .test(
      "len",
      "Le Relevé d'Identité Bancaire  doit être composé de 20 chiffres",
      (val) => val && val.toString().length === 20
    ),
  phone: Yup.number()
    .integer("Le numéro de téléphone n est pas valide")
    .required("Le numéro de téléphone est requis")
    .typeError("Le numéro de téléphone doit être un entier")
    .test(
      "len",
      "Le numéro de téléphone doit être composé de 8 chiffres",
      (val) => val && val.toString().length === 8
    ),
  address: Yup.object().shape({
    rue: Yup.string().required("Le champ rue est obligatoire"),
    city: Yup.string().required("Le champ city est obligatoire"),
    postalCode: Yup.string()
      .matches(/^\d{4}$/, "Code postal invalide")
      .required("Le champ postalCode est obligatoire"),
  }),
});
/****************************************************************************** */
export const EnvoyerEmailValidation = Yup.object({
  name: Yup.string().required("Le nom est requis"),
  message: Yup.string().required("Le message est obligatoire"),

  email: Yup.string()
    .email("L'adresse email n'est pas valide")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
      "L'adresse email n'est pas valide"
    )
    .required("L'adresse email est obligatoire"),
  salaire: Yup.number().typeError("Le salaire doit être un entier"),
});
/*************************************************************** */
export const MdpsForget = Yup.object({
  newPassword: Yup.string().required("Le mot de passe est obligatoire"),
  confirmPassword: Yup.string().required("Le mot de passe est obligatoire"),
});
//***************************************************************************** */
export const validationUpdateUtilisateur = Yup.object({
  cin: Yup.number().test(
    "len",
    "Le Cin doit être composé de 8 chiffres",
    (val) => val && val.toString().length === 8
  ),
  name: Yup.string()
    .required("Le nom est requis")
    .matches(/^[a-zA-Z]+$/, "Le nom n est pas valide"),

  lastname: Yup.string()
    .required("Le prenom est requis")
    .matches(/^[a-zA-Z]+$/, "Le prenomn n est pas valide"),
  phone: Yup.number()
    .integer("Le numéro de téléphone n'est pas valide")
    .required("Le numéro de téléphone est requis")
    .typeError("Le numéro de téléphone n'est pas valide")
    .test(
      "len",
      "Le numéro de téléphone doit être composé de 8 chiffres",
      (val) => val && val.toString().length === 8
    ),
  email: Yup.string()
    .email("L'adresse email n'est pas valide")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
      "L'adresse email n'est pas valide"
    )
    .required("L'adresse email est obligatoire"),
});
