const isProduction = process.env.NODE_ENV === "production";
const isVercel = process.env.VERCEL === "1";

if (process.env.NODE_ENV === "development") {
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("VERCEL:", process.env.VERCEL);
  console.log("isProduction:", isProduction);
  console.log("isVercel:", isVercel);
}

export const BASE_URL =
  isProduction || isVercel
    ? "https://memoraa.onrender.com/"
    : "http://localhost:4001/";

if (process.env.NODE_ENV === "development") {
  console.log("BASE_URL utilisée:", BASE_URL);
}

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
