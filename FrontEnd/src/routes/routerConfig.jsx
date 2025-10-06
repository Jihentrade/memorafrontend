import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "../pages/Accueil";
import Dropzone from "../pages/Dropzone";

import ProductPreview from "../pages/ProductPreview";
import AccueilClient from "../components/AccueilClient/AccueilClient";
import Contactus from "../components/ContactUs/Contactus";
import Expedition from "../components/expedition/expedition";
import Dashboard from "../pages/DashboardAdmin/Dashboard";
import FridgePreview from "../pages/FridgePreview";
import Cart from "../pages/Cart/PanierPage";
import AvisClient from "../pages/AvisClient/AvisClientsPage";
import CommandesAdmin from "../pages/CommandesAdmin";
const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/dashboardAdmin" element={<Dashboard />} />
        <Route path="/commandes" element={<CommandesAdmin />} />
        <Route path="/fridge-preview" element={<FridgePreview />} />
        <Route path="/panier" element={<Cart />} />
        <Route path="/avis-clients" element={<AvisClient />} />
        <Route path="/aimants-photo-carrés" element={<Dropzone />} />
        <Route path="/accueil" element={<AccueilClient />} />
        <Route path="/productPreview" element={<ProductPreview />} />
        <Route path="/contactezNous" element={<Contactus />} />
        <Route path="/expedition" element={<Expedition />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RouterConfig;
