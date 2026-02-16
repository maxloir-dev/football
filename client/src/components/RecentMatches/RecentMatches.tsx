import { useEffect, useState } from "react";
import "./RecentMatches.css";

interface Match {
  id: number;
  home_team_name: string;
  away_team_name: string;
  home_score: number;
  away_score: number;
  match_date: string;
}

interface RecentMatchesProps {
  teamId: number;
  teamName: string;
}

function RecentMatches({ teamId, teamName }: RecentMatchesProps) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch tous les matchs
    fetch(`${import.meta.env.VITE_API_URL}/api/matches`)
      .then((res) => res.json())
      .then((data: Match[]) => {
        // Filtre les matchs de cette équipe
        const teamMatches = data
          .filter(
            (match) =>
              match.home_team_name === teamName ||
              match.away_team_name === teamName,
          )
          .sort(
            (a, b) =>
              new Date(b.match_date).getTime() -
              new Date(a.match_date).getTime(),
          )
          .slice(0, 5); // 5 derniers matchs

        setMatches(teamMatches);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [teamId, teamName]);

  // Détermine le résultat (V, N, D)
  const getResult = (match: Match): "win" | "draw" | "loss" => {
    const isHome = match.home_team_name === teamName;
    const teamScore = isHome ? match.home_score : match.away_score;
    const opponentScore = isHome ? match.away_score : match.home_score;

    if (teamScore > opponentScore) return "win";
    if (teamScore === opponentScore) return "draw";
    return "loss";
  };

  // Icône du résultat
  const getResultIcon = (result: "win" | "draw" | "loss") => {
    if (result === "win") return "✅";
    if (result === "draw") return "🟰";
    return "❌";
  };

  // Classe CSS du résultat
  const getResultClass = (result: "win" | "draw" | "loss") => {
    if (result === "win") return "result-win";
    if (result === "draw") return "result-draw";
    return "result-loss";
  };

  if (loading) {
    return (
      <div className="recent-matches-container">
        <h3>Derniers matchs</h3>
        <p className="loading-text">Chargement...</p>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="recent-matches-container">
        <h3>Derniers matchs</h3>
        <p className="no-matches">Aucun match joué</p>
      </div>
    );
  }

  return (
    <div className="recent-matches-container">
      <h3>Derniers matchs</h3>

      <div className="matches-list">
        {matches.map((match) => {
          const result = getResult(match);
          const isHome = match.home_team_name === teamName;

          return (
            <div
              key={match.id}
              className={`match-item ${getResultClass(result)}`}
            >
              <span className="result-icon">{getResultIcon(result)}</span>

              <div className="match-info">
                <div className="match-teams">
                  <span className={isHome ? "team-highlight" : ""}>
                    {match.home_team_name}
                  </span>
                  <span className="match-score">
                    {match.home_score} - {match.away_score}
                  </span>
                  <span className={!isHome ? "team-highlight" : ""}>
                    {match.away_team_name}
                  </span>
                </div>

                <div className="match-date">
                  {new Date(match.match_date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentMatches;
