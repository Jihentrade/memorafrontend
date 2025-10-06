import React from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Logo from "../../assets/logo.png";
import "./footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-container">
            <img
              src={Logo}
              alt="Letshost Conciergerie Nice - Logo"
              className="footer-logo"
            />
          </div>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            Memora | L’art de transformer vos souvenirs en créations uniques
          </Typography>
        </div>

        {/* Navigation Section */}
        <div className="nav-section">
          <Typography variant="h6" className="footer-title">
            Navigation
          </Typography>
          <div className="footer-links-container">
            <Link to="/" className="footer-link">
              ✨ Accueil
            </Link>
            <Link to="/avis-clients" className="footer-link">
              🏠 Avis client
            </Link>
            <Link to="/contactezNous" className="footer-link">
              📞 Contact
            </Link>
          </div>
        </div>

        {/* Contact Section */}
        <div className="contact-section">
          <Typography variant="h6" className="footer-title">
            Contactez-nous
          </Typography>
          <div className="contact-info">
            <div className="contact-item">
              <LocationOnIcon />
              <Typography>Sousse, M'saken - Tunisie</Typography>
            </div>
            <div className="contact-item">
              <PhoneIcon />
              <MuiLink href="tel:+21699616660" className="contact-link">
                (+216) 99 616 660
              </MuiLink>
            </div>
            <div className="contact-item">
              <EmailIcon />
              <MuiLink
                href="mailto:letshost@laposte.net"
                className="contact-link"
              >
                Memora@gmail.com
              </MuiLink>
            </div>
          </div>
        </div>

        {/* Social Section */}
        <div className="social-section">
          <Typography variant="h6" className="footer-title">
            Rejoignez-nous
          </Typography>
          <div className="social-icons">
            <IconButton
              href="https://wa.me/0021699616660"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Contact WhatsApp"
            >
              <WhatsAppIcon />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright">
        <Typography variant="body2">
          © {new Date().getFullYear()}Memora | Référence de la création de
          souvenirs personnalisés en Tunisie
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
