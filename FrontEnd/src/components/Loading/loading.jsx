import React from "react";
import "./loading.css";
import image from "../../assets/logo.png"
const LoadingPage = () => {
  return (
    <div className="loader">
      <img
        src={image}
        alt="Logo de chargement"
      />
    </div>
  );
};

export default LoadingPage;
