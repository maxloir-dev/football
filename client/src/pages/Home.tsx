import { useEffect, useState } from "react";
import "./Home.css";
import stadeImg from "../assets/stade.jpg";
import MatchCarousel from "../components/MatchCarousel/MatchCarousel";

function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`home-wrapper ${scrolled ? "scrolled" : ""}`}>
      {/* SECTION 1 : HERO avec image de fond */}
      <section className="hero">
        <img src={stadeImg} alt="Stade" className="hero-bg-image" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="home-title">KickOff</h1>
          <p className="home-subtitle">L'actualité du ballon rond en direct</p>
        </div>
        <div className="scroll-indicator">
          <span> </span>
          <span className="arrow-down">↓</span>
        </div>
      </section>

      <MatchCarousel />

      {/* SECTION 3 : ARTICLES (fond blanc) */}
      <section className="articles-section">
        <div className="section-container">
          <h2 className="section-title">Dernières Actualités</h2>

          <div className="articles-grid">
            {/* Article 1 */}
            <article className="article-card">
              <div className="article-img-empty">
                <span className="article-img-placeholder">📰</span>
              </div>
              <div className="article-body">
                <span className="article-tag tag-transfers">Transferts</span>
                <h3>Le mercato s'affole en Europe</h3>
                <p>
                  Découvrez les dernières rumeurs du marché des transferts et
                  les surprises de cette fenêtre hivernale...
                </p>
                <button type="button" className="read-more">
                  Lire la suite →
                </button>
              </div>
            </article>

            {/* Article 2 */}
            <article className="article-card">
              <div className="article-img-empty">
                <span className="article-img-placeholder">⚽</span>
              </div>
              <div className="article-body">
                <span className="article-tag tag-ligue1">Ligue 1</span>
                <h3>Analyse du choc de la veille</h3>
                <p>
                  Un match riche en rebondissements qui change tout au
                  classement. Retour sur les moments clés...
                </p>
                <button type="button" className="read-more">
                  Lire la suite →
                </button>
              </div>
            </article>

            {/* Article 3 */}
            <article className="article-card">
              <div className="article-img-empty">
                <span className="article-img-placeholder">🏆</span>
              </div>
              <div className="article-body">
                <span className="article-tag tag-champions">
                  Champions League
                </span>
                <h3>Les qualifiés pour les 8èmes</h3>
                <p>
                  Découvrez qui sont les équipes qualifiées pour la suite de la
                  compétition européenne...
                </p>
                <button type="button" className="read-more">
                  Lire la suite →
                </button>
              </div>
            </article>

            {/* Article 4 */}
            <article className="article-card">
              <div className="article-img-empty">
                <span className="article-img-placeholder">📊</span>
              </div>
              <div className="article-body">
                <span className="article-tag tag-stats">Statistiques</span>
                <h3>Top buteurs de la saison</h3>
                <p>
                  Le classement des meilleurs attaquants du championnat avec
                  leurs statistiques détaillées...
                </p>
                <button type="button" className="read-more">
                  Lire la suite →
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
