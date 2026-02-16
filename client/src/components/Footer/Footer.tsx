import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <Link to="/" className="footer-logo">
            <span className="logo-icon"> </span>
            <span className="logo-text">KickOff</span>
          </Link>
          <p className="footer-description">
            Votre plateforme de gestion et de suivi du football français.
            Classements, statistiques et actualités en temps réel.
          </p>
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Facebook">
              🔧
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              🔧
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              🔧
            </a>
            <a href="#" className="social-link" aria-label="YouTube">
              🔧
            </a>
          </div>
        </div>

        {/* Colonne 2 : Navigation */}
        <div className="footer-column">
          <h3 className="footer-title">Navigation</h3>
          <ul className="footer-links">
            <li>
              <Link to="/" className="footer-link">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/standings/1" className="footer-link">
                Classement Ligue 1
              </Link>
            </li>
            <li>
              <Link to="/standings/2" className="footer-link">
                Classement Ligue 2
              </Link>
            </li>
            <li>
              <a href="#" className="footer-link">
                Actualités
              </a>
            </li>
          </ul>
        </div>

        {/* Colonne 3 : Compétitions */}
        <div className="footer-column">
          <h3 className="footer-title">Compétitions</h3>
          <ul className="footer-links">
            <li>
              <a href="#" className="footer-link">
                🇫🇷 Ligue 1
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                🇫🇷 Ligue 2
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                🏆 Coupe de France
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                ⭐ Champions League
              </a>
            </li>
          </ul>
        </div>

        {/* Colonne 4 : Informations */}
        <div className="footer-column">
          <h3 className="footer-title">Informations</h3>
          <ul className="footer-links">
            <li>
              <a href="#" className="footer-link">
                À propos
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Mentions légales
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Politique de confidentialité
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Barre de copyright */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="footer-copyright">
            © {currentYear} KickOff. Tous droits réservés.
          </p>
          <p className="footer-credits">Créé par Maxime</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
