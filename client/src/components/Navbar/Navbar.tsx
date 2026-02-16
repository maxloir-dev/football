import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

interface League {
  id: number;
  name: string;
  country: string;
  level: number;
}
interface Team {
  id: number;
  name: string;
}

function Navbar() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLeagueMenuOpen, setIsLeagueMenuOpen] = useState(false);

  // Fetch les ligues
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/leagues`)
      .then((res) => res.json())
      .then((data) => setLeagues(data))
      .catch((err) => console.error(err));
  }, []);

  // Ferme le menu si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = () => setIsLeagueMenuOpen(false);
    if (isLeagueMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isLeagueMenuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon"> </span>
            <span className="logo-text">KickOff</span>
          </Link>

          <Link to="/standings/1" className="navbar-link">
            Classement
          </Link>

          <div className="navbar-dropdown">
            <button
              className="navbar-link dropdown-toggle"
              onClick={(e) => {
                e.stopPropagation();
                setIsLeagueMenuOpen(!isLeagueMenuOpen);
              }}
            >
              Ligues
              <span
                className={`dropdown-arrow ${isLeagueMenuOpen ? "open" : ""}`}
              >
                ▼
              </span>
            </button>

            {isLeagueMenuOpen && (
              <div className="dropdown-menu">
                {leagues.map((league) => (
                  <Link
                    key={league.id}
                    to={`/standings/${league.id}`}
                    className="dropdown-item"
                    onClick={() => setIsLeagueMenuOpen(false)}
                  >
                    <span className="league-flag">🇫🇷</span>
                    {league.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          className="navbar-button"
          onClick={() => alert("Fonctionnalité bientôt disponible !")}
        >
          <span className="button-icon">👤</span>
          Connexion
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
