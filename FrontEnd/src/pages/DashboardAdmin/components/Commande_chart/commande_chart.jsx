import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { axiosPrivate } from "../../../../utils/axios";
import TableauFacture from "../../../../components/TableauFacture";
import { Link } from "react-router-dom";

const CommandeChart = () => {
  const [commandeData, setCommandeData] = useState();
  const [factures, setFacture] = useState([]);

  useEffect(() => {
    const fetchFacture = async () => {
      try {
        const response = await axiosPrivate.get("/facture/getAllFacture");

        const factures = response.data;
        setFacture(factures);

        if (factures && factures.length > 0) {
          const dataByDay = factures.reduce((acc, facture) => {
            const date = new Date(facture.createAt).toLocaleDateString();
            acc[date] = (acc[date] || 0) + facture.envoi;
            return acc;
          }, {});

          const labels = Object.keys(dataByDay);
          const data = Object.values(dataByDay);

          setCommandeData({ labels, data });
        }
      } catch (error) {
        console.error("Error fetching newsletters:", error);
      }
    };

    fetchFacture();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          color="#176B87"
          style={{
            marginRight: "120px",
            marginLeft: "20px",
            marginTop: "-25px",
          }}
        >
          Nos factures
        </Typography>
        <Link
          to="/facture"
          style={{
            textDecoration: "none",
            color: "#176B87",
            display: "flex",
            alignItems: "center",
            marginLeft: "550px",
          }}
        >
          Voir Tous
        </Link>
      </div>
      <Box sx={{ height: "350px", width: "900px", mt: 2 }}>
        <TableauFacture
          factures={factures}
          setFactures={setFacture}
        ></TableauFacture>
      </Box>
    </div>
  );
};

export default CommandeChart;
