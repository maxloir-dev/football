import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Standings.css";

interface Standing {
  team_id: number;
  team_name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
}

function Standings() {
  const { leagueId } = useParams<{ leagueId: string }>();
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/standings?league_id=${leagueId}`)
      .then((res) => res.json())
      .then((data) => {
        setStandings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [leagueId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Chargement...</div>
      </div>
    );
  }

  const leagueName = leagueId === "1" ? "Ligue 1" : "Ligue 2";
  const leagueClass = leagueId === "1" ? "league-blue" : "league-green";

  return (
    <div className="standings-container">
      <div className="standings-content">
        {/* Header */}
        <div className="standings-header">
          <Link to="/" className="back-link">
            <span className="back-arrow">←</span>
            Retour
          </Link>
          <h1 className="standings-title">{leagueName}</h1>
          <p className="standings-subtitle">Classement général</p>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="standings-table">
            <thead className={`table-head ${leagueClass}`}>
              <tr>
                <th className="th-rank">#</th>
                <th className="th-team">Équipe</th>
                <th className="th-stat">J</th>
                <th className="th-stat">V</th>
                <th className="th-stat">N</th>
                <th className="th-stat">D</th>
                <th className="th-stat">BP</th>
                <th className="th-stat">BC</th>
                <th className="th-stat">+/-</th>
                <th className="th-points">Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => (
                <tr key={team.team_id} className="table-row">
                  <td className="td-rank">{index + 1}</td>
                  <td className="td-team">
                    <div className="team-name">{team.team_name}</div>
                  </td>
                  <td className="td-stat">{team.played}</td>
                  <td className="td-stat stat-won">{team.won}</td>
                  <td className="td-stat stat-drawn">{team.drawn}</td>
                  <td className="td-stat stat-lost">{team.lost}</td>
                  <td className="td-stat">{team.goals_for}</td>
                  <td className="td-stat">{team.goals_against}</td>
                  <td
                    className={`td-stat ${
                      team.goal_difference > 0
                        ? "stat-positive"
                        : team.goal_difference < 0
                          ? "stat-negative"
                          : "stat-neutral"
                    }`}
                  >
                    {team.goal_difference > 0 ? "+" : ""}
                    {team.goal_difference}
                  </td>
                  <td className="td-points">
                    <span className={`points-badge ${leagueClass}`}>
                      {team.points}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Standings;
