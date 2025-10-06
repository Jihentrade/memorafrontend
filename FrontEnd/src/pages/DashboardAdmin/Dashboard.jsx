import React from "react";
import "./styleDash.css";
import { axiosPrivate } from "../../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
// import Chart from "./components/Commande_chart";
import { Box } from "@mui/material";
import clientIcon from "../../assets/clienticon.png";
import icondevis from "../../assets/411709.png";
import produit from "../../assets/produit.png";
import commande from "../../assets/commande.png";

const Dashboard = () => {
  const [totalProduit, setTotalProduit] = useState(0);
  const [totalCommandes, setTotalCommande] = useState(0);
  const [Bonlivraison, setBonlivraison] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  //*************************************************Partie Commande ****************************/
  const [query, setQuery] = useState("");
  const [commandes, setCommandes] = React.useState([]);
  const filteredCommande = commandes.filter((commande) => {
    return Object.values(commande).some((value) => {
      return value.toString().toLowerCase().includes(query.toLowerCase());
    });
  });
  useEffect(() => {
    axiosPrivate
      .get("/commande/findAllCommande")
      .then((response) => {
        const commandeWithId = response.data.commandes.map((commande) => {
          return { ...commande, id: commande._id };
        });

        setCommandes(commandeWithId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //******************************************************************************************* */
  const navigate = useNavigate();
  //vers la page Clients
  const handleClientClick = () => {
    navigate("/client");
  };
  //vers la page Produit
  const handleProduitClick = () => {
    navigate("/produit");
  };
  //vers la page commande
  const handleCommandeClick = () => {
    navigate("/commandes");
  };
  const handleLivraisonClick = () => {
    navigate("/livraison");
  };
  //***************************************************************************************** */
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axiosPrivate.get("/produit/findAllProduit");

        const produits = response.data.produits;
        const total = produits.length;
        setTotalProduit(total);
      } catch (error) {
        console.error("Error fetching produit:", error);
      }
    };

    fetchProduits();
  }, []);
  //*************************************************************************************** */
  //***************************************************************************************** */
  useEffect(() => {
    const fetchCommande = async () => {
      try {
        const response = await axiosPrivate.get("/commande/findAllCommande");

        const commandes = response.data.commandes;
        const total = commandes.length;
        setTotalCommande(total);
      } catch (error) {
        console.error("Error fetching commande:", error);
      }
    };

    fetchCommande();
  }, []);

  //*************************************************************************************** */
  useEffect(() => {
    const fetchDevis = async () => {
      try {
        const response = await axiosPrivate.get("/recu/getAllRecu");

        const bonLivraison = response.data;
        const total = bonLivraison.length;
        setBonlivraison(total);
      } catch (error) {
        console.error("Error fetching bonLivraison:", error);
      }
    };

    fetchDevis();
  }, []);

  //***************************************************************************************** */
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosPrivate.get("/client/findAll");
        const clients = response.data.clients;
        const total = clients.length;
        setTotalClients(total);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);
  return (
    <>
      <Navbar />
      <div className="g-container">
        <h1 className="dashboard-title">Tableau de Bord Admin</h1>
        <p className="dashboard-subtitle">
          Gérez vos produits, commandes et clients en un coup d'œil
        </p>

        <div className="containerDash">
          <div className="card-stat">
            <div className="card-title-card-stat">
              <img src={produit} alt="Produits" />
              <label className="title-nl-style">Produits</label>
            </div>
            <div className="nbr-nl-style">{totalProduit}</div>
            <button className="btn-card-stat" onClick={handleProduitClick}>
              Accéder aux Produits
            </button>
          </div>

          <div className="card-stat">
            <div className="card-title-card-stat">
              <img src={icondevis} alt="Livraisons" />
              <label className="title-nl-style">Bons de Livraison</label>
            </div>
            <div className="nbr-nl-style">{Bonlivraison}</div>
            <button className="btn-card-stat" onClick={handleLivraisonClick}>
              Accéder aux Livraisons
            </button>
          </div>

          <div className="card-stat">
            <div className="card-title-card-stat">
              <img src={commande} alt="Commandes" />
              <label className="title-nl-style">Commandes</label>
            </div>
            <div className="nbr-nl-style">{totalCommandes}</div>
            <button className="btn-card-stat" onClick={handleCommandeClick}>
              Accéder aux Commandes
            </button>
          </div>

          <div className="card-stat">
            <div className="card-title-card-stat">
              <img src={clientIcon} alt="Clients" />
              <label className="title-nl-style">Clients</label>
            </div>
            <div className="nbr-nl-style">{totalClients}</div>
            <button className="btn-card-stat" onClick={handleClientClick}>
              Accéder aux Clients
            </button>
          </div>
        </div>

        {/* Zone pour les graphiques futurs */}
        <div className="chart-container" style={{ display: "none" }}>
          {/* <Chart /> */}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Dashboard;
