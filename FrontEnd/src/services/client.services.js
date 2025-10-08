import { axiosPrivate, axiosPublic } from "../utils/axios";

export const createClient = async (clientData) => {
  try {
    const response = await axiosPrivate.post(
      "/client/createClient",
      clientData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllClients = async () => {
  try {
    const response = await axiosPrivate.get("/client/getAllClients");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getClientById = async (clientId) => {
  try {
    const response = await axiosPrivate.get(`/client/getClient/${clientId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateClient = async (clientId, clientData) => {
  try {
    const response = await axiosPrivate.put(
      `/client/updateClient/${clientId}`,
      clientData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteClient = async (clientId) => {
  try {
    const response = await axiosPrivate.delete(
      `/client/deleteClient/${clientId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyPromoCode = async (code) => {
  try {
    console.log("🔍 Vérification du code promo:", code);
    const response = await axiosPublic.post("/client/verifyPromoCode", {
      code: code,
    });
    console.log("✅ Réponse reçue:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Erreur lors de la vérification:",
      error.response?.data || error.message
    );
    throw error;
  }
};
