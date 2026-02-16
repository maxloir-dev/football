import { useEffect, useState } from "react";
import "./MatchCarousel.css";

interface Match {
  id: number;
  home_team_name: string;
  away_team_name: string;
  home_score: number;
  away_score: number;
  match_date: string;
}

function MatchCarousel() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch les derniers matchs
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/matches`)
      .then((res) => res.json())
      .then((data: Match[]) => {
        // Trie par date décroissante et prend les 10 derniers
        const sortedMatches = data
          .sort(
            (a, b) =>
              new Date(b.match_date).getTime() -
              new Date(a.match_date).getTime(),
          )
          .slice(0, 10);
        setMatches(sortedMatches);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Auto-scroll toutes les 4 secondes
  useEffect(() => {
    if (matches.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % matches.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [matches.length]);

  // Navigation manuelle
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? matches.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % matches.length);
  };

  // Aller à un match spécifique
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="carousel-container">
        <div className="carousel-loading">Chargement des matchs...</div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="carousel-container">
        <div className="carousel-empty">Aucun match disponible</div>
      </div>
    );
  }

  const currentMatch = matches[currentIndex];

  return (
    <div className="carousel-container">
      {/* Bouton précédent */}
      <button
        type="button"
        className="carousel-button carousel-button-prev"
        onClick={goToPrevious}
        aria-label="Match précédent"
      >
        ‹
      </button>

      {/* Affichage du match */}
      <div className="carousel-content">
        <div className="match-card">
          {/* Équipe domicile */}
          <div className="team home-team">
            <span className="team-name">{currentMatch.home_team_name}</span>
            <span className="team-score">{currentMatch.home_score}</span>
          </div>

          {/* Séparateur */}
          <div className="match-separator">
            <span className="vs-text">VS</span>
            <span className="match-date">
              {new Date(currentMatch.match_date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>

          {/* Équipe extérieure */}
          <div className="team away-team">
            <span className="team-score">{currentMatch.away_score}</span>
            <span className="team-name">{currentMatch.away_team_name}</span>
          </div>
        </div>

        {/* Badge statut */}
        <div className="match-status">
          {currentMatch.home_score !== null && currentMatch.away_score !== null
            ? "TERMINÉ"
            : "À VENIR"}
        </div>
      </div>

      {/* Bouton suivant */}
      <button
        type="button"
        className="carousel-button carousel-button-next"
        onClick={goToNext}
        aria-label="Match suivant"
      >
        ›
      </button>

      {/* Indicateurs (dots) */}
      <div className="carousel-indicators">
        {matches.map((_, index) => (
          <button
            type="button"
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Aller au match ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default MatchCarousel;
