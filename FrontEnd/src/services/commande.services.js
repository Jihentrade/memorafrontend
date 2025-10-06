import { axiosPrivate } from "../utils/axios";

export const createCommandeWithImages = async (commandeData, images) => {
  const formData = new FormData();

  images.forEach((image, index) => {
    formData.append("images", image.file);
  });

  // Ne pas ajouter le client si c'est null ou undefined
  if (
    commandeData.client &&
    commandeData.client !== null &&
    commandeData.client !== "null"
  ) {
    formData.append("client", commandeData.client);
  }
  formData.append("montantTotal", commandeData.montantTotal);
  formData.append("modePayement", commandeData.modePayement);

  try {
    const response = await axiosPrivate.post(
      "/commande/createCommande",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCommandes = async () => {
  try {
    const response = await axiosPrivate.get("/commande/findAllCommande");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCommandeById = async (id) => {
  try {
    const response = await axiosPrivate.get(`/commande/searchCommande/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCommande = async (id) => {
  try {
    const response = await axiosPrivate.delete(
      `/commande/deleteCommande/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCommande = async (commandeData) => {
  const formData = new FormData();

  // Helper pour ajouter une image qu'elle soit File ou dataURL
  const appendImage = async (img) => {
    if (img?.file instanceof File) {
      formData.append("images", img.file);
      return;
    }
    if (img?.preview) {
      const response = await fetch(img.preview);
      const blob = await response.blob();
      const filename =
        img?.file?.name || img?.name || `image-${Date.now()}.jpg`;
      const file = new File([blob], filename, {
        type: blob.type || "image/jpeg",
      });
      formData.append("images", file);
    }
  };

  if (Array.isArray(commandeData.images) && commandeData.images.length > 0) {
    for (const image of commandeData.images) {
      // eslint-disable-next-line no-await-in-loop
      await appendImage(image);
    }
  }

  if (
    commandeData.client &&
    commandeData.client !== null &&
    commandeData.client !== "null"
  ) {
    formData.append("client", commandeData.client);
  }

  if (
    commandeData.montantTotal !== undefined &&
    commandeData.montantTotal !== null
  ) {
    formData.append("montantTotal", commandeData.montantTotal);
  }
  if (commandeData.modePayement) {
    formData.append("modePayement", commandeData.modePayement);
  }

  try {
    const response = await axiosPrivate.post(
      "/commande/createCommande",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
