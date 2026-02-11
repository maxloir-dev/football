import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">⚽ Football Manager</h1>
        <p className="home-subtitle">Choisissez votre championnat</p>

        <div className="leagues-grid">
          {/* Ligue 1 */}
          <Link to="/standings/1" className="league-card league-card-blue">
            <div className="league-card-content">
              <h2 className="league-name">Ligue 1</h2>
              <p className="league-description">France - Division 1</p>
              <div className="league-link">
                <span>Voir le classement</span>
                <span className="arrow">→</span>
              </div>
            </div>
            <div className="league-icon">🏆</div>
          </Link>

          {/* Ligue 2 */}
          <Link to="/standings/2" className="league-card league-card-green">
            <div className="league-card-content">
              <h2 className="league-name">Ligue 2</h2>
              <p className="league-description">France - Division 2</p>
              <div className="league-link">
                <span>Voir le classement</span>
                <span className="arrow">→</span>
              </div>
            </div>
            <div className="league-icon">⭐</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Home;
