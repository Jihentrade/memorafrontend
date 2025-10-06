// Configuration pour l'environnement
const isProduction = process.env.NODE_ENV === "production";
const isVercel = process.env.VERCEL === "1";

// Debug: Afficher les variables d'environnement
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("VERCEL:", process.env.VERCEL);
console.log("isProduction:", isProduction);
console.log("isVercel:", isVercel);

// URL du backend selon l'environnement
// REMPLACEZ par votre vraie URL Vercel
export const BASE_URL =
  isProduction || isVercel
    ? "https://memoraa.onrender.com/"
    : "http://localhost:4001/";

// Debug: Afficher l'URL utilisée
console.log("BASE_URL utilisée:", BASE_URL);

export const authAPI = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "auth/logout",
  VERIFY_EMAIL: "/auth/verify-email",
  SEND_VERIFICATION_EMAIL: "/auth/send-verification-email",
  REFRESH_TOKEN: "/auth/refresh-tokens",
  RESET_PASSWORD: "/auth/reset-password",
  FORGOT_PASSWORD: "/auth/forgot-password",
  ME: "/auth/me",
  UPDATE: "/auth/update",
};
