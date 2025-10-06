import { axiosPrivate } from "../utils/axios";

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
