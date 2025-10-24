import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingPage from "../components/Loading/loading";

const Accueil = lazy(() => import("../pages/Accueil"));
const Dropzone = lazy(() => import("../pages/Dropzone"));
const ProductPreview = lazy(() => import("../pages/ProductPreview"));
const AccueilClient = lazy(() =>
  import("../components/AccueilClient/AccueilClient")
);
const Contactus = lazy(() => import("../components/ContactUs/Contactus"));
const Expedition = lazy(() => import("../components/expedition/expedition"));
const Dashboard = lazy(() => import("../pages/DashboardAdmin/Dashboard"));
const FridgePreview = lazy(() => import("../pages/FridgePreview"));
const Cart = lazy(() => import("../pages/Cart/PanierPage"));
const AvisClient = lazy(() => import("../pages/AvisClient/AvisClientsPage"));
const CommandesAdmin = lazy(() => import("../pages/CommandesAdmin"));
const ClientsAdmin = lazy(() => import("../pages/ClientsAdmin"));

const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/dashboardAdmin" element={<Dashboard />} />
          <Route path="/commandes" element={<CommandesAdmin />} />
          <Route path="/clients" element={<ClientsAdmin />} />
          <Route path="/fridge-preview" element={<FridgePreview />} />
          <Route path="/panier" element={<Cart />} />
          <Route path="/avis-clients" element={<AvisClient />} />
          <Route path="/aimants-photo-carrés" element={<Dropzone />} />
          <Route path="/accueil" element={<AccueilClient />} />
          <Route path="/productPreview" element={<ProductPreview />} />
          <Route path="/contactezNous" element={<Contactus />} />
          <Route path="/expedition" element={<Expedition />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default RouterConfig;
