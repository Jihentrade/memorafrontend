import React, { useState, useEffect } from "react";
import "./styleAccueil.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/footer/footer";
import AboutUs from "../../components/AboutUs/aboutUs";
import Service from "../../components/Serviice/Services";
import HowToWork from "../../components/HowItWorks";
import ThreeByTwoGrid from "../../components/ThreeByTwoGrid/ThreeByTwoGrid";

// Import des images
import customerImage1 from "../../assets/1.jpg";
import customerImage2 from "../../assets/3.jpg";
import customerImage3 from "../../assets/4.jpg";
import customerImage4 from "../../assets/3b4e9e043cf72fe7b89c1d77459eaad3.jpg";
import customerImage5 from "../../assets/5.jpg";
import customerImage6 from "../../assets/8.jpg";
import customerImage7 from "../../assets/6.jpg";
import customerImage8 from "../../assets/de7162838daa7d4d0030c502aa0333e2.jpg";
import couverture from "../../assets/couverture.jpg";

const Accueil = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const customerImages = [
    customerImage1,
    customerImage2,
    customerImage3,
    customerImage4,
    customerImage5,
    customerImage6,
    customerImage7,
    customerImage8,
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleButtonClick = () => {
    window.scrollTo(0, 0);
    navigate("/aimants-photo-carrés");
  };

  return (
    <div className="container">
      <Navbar />

      {/* Nouvelle section Hero avec image entière et bouton */}
      <section className="hero-cover-section">
        <img
          src={couverture}
          alt="Couverture Memora"
          className="hero-cover-image"
        />
        <div className="hero-overlay">
          <div className={`hero-content ${isVisible ? "fade-in" : ""}`}></div>
        </div>
        <button className="hero-cover-btn" onClick={handleButtonClick}>
          JE CRÉE
        </button>
      </section>

      {/* Section Statistiques */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">50+</div>
            <div className="stat-label">Clients Satisfaits</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100+</div>
            <div className="stat-label">Aimants Créés</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">72h</div>
            <div className="stat-label">Livraison Rapide</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Qualité Garantie</div>
          </div>
        </div>
      </section>

      {/* Section Produits Clients */}
      <section className="products-section">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "700",
              color: "var(--dark-color)",
              marginBottom: "1rem",
            }}
          >
            Nos Réalisations
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#666",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Découvrez quelques-unes de nos créations d'aimants photo
            personnalisés
          </p>
        </div>

        <div className="realisations-grid">
          {customerImages.map((image, index) => (
            <div key={index} className="realisation-item">
              <img
                src={image}
                alt={`Aimant personnalisé ${index + 1}`}
                className="realisation-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Section Services */}
      <section className="services-section">
        <div className="services-container">
          <h2 className="services-title">Pourquoi Choisir Memora ?</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3 className="service-title">Qualité Premium</h3>
              <p className="service-description">
                Nous utilisons des matériaux de première qualité et des encres
                résistantes aux UV pour garantir la durabilité de vos aimants.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3 className="service-title">Livraison Rapide</h3>
              <p className="service-description">
                Recevez vos aimants personnalisés en 24-48h. Nous traitons
                chaque commande avec soin et rapidité.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">💎</div>
              <h3 className="service-title">Personnalisation Totale</h3>
              <p className="service-description">
                Choisissez la taille, la forme et le style de vos aimants.
                Chaque création est unique et adaptée à vos besoins.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">🛡️</div>
              <h3 className="service-title">Garantie Satisfaction</h3>
              <p className="service-description">
                Si vous n'êtes pas satisfait, nous refaisons vos aimants
                gratuitement. Votre satisfaction est notre priorité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Comment ça marche */}
      <section style={{ padding: "80px 20px", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: "700",
                color: "var(--dark-color)",
                marginBottom: "1rem",
              }}
            >
              Comment ça marche ?
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#666",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              En 3 étapes simples, transformez vos photos en aimants magnifiques
            </p>
          </div>
          <HowToWork />
        </div>
      </section>

      {/* Section À propos */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            <h2>À Propos de Memora</h2>
            <p>
              Depuis plus de 5 ans, Memora s'est spécialisée dans la création
              d'aimants photo personnalisés de haute qualité. Notre passion est
              de transformer vos précieux souvenirs en objets durables et
              esthétiques.
            </p>
            <p>
              Nous utilisons les dernières technologies d'impression et des
              matériaux premium pour garantir que vos aimants résistent au temps
              et conservent leurs couleurs éclatantes.
            </p>
            <button className="modern-button" onClick={handleButtonClick}>
              Commencer Maintenant →
            </button>
          </div>
          <div>
            <img
              src={customerImage1}
              alt="Aimants Memora"
              className="about-image"
            />
          </div>
        </div>
      </section>

      {/* Section Grille de produits */}
      <section
        style={{ padding: "80px 20px", background: "var(--light-color)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <ThreeByTwoGrid />
        </div>
      </section>

      {/* Composants existants */}
      <AboutUs />
      <Service />
      <Footer />
    </div>
  );
};

export default Accueil;
