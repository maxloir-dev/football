import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ActionButton from "../components/ActionButton/ActionButton";
import "./TeamDetails.css";

interface Player {
  id: number;
  firstname: string;
  lastname: string;
  position: string;
  number: number;
}

interface Team {
  id: number;
  name: string;
  city: string;
  stadium: string;
}

function TeamDetails() {
  const { teamId } = useParams<{ teamId: string }>();

  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingPlayer, setEditingPlayer] = useState<Partial<Player>>({});

  const [adding, setAdding] = useState(false);
  const [newPlayer, setNewPlayer] = useState<Partial<Player>>({});

  //Fetch équipe et joueurs au chargement
  useEffect(() => {
    if (!teamId) return;

    const fetchPlayers = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/teams/${teamId}/players`,
        );
        const data = await res.json();
        setPlayers(data || []);
      } catch (err) {
        console.error(err);
      }
    };

    setLoading(true);
    setError(null);

    fetch(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}`)
      .then((res) => res.json())
      .then((data) => setTeam(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

    fetchPlayers();
  }, [teamId]);

  // Gestion édition
  const handleEdit = (player: Player) => {
    setEditingId(player.id);
    setEditingPlayer({ ...player });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingPlayer({});
    setAdding(false);
    setNewPlayer({});
  };

  const handleChange = (field: keyof Player, value: string | number) => {
    setEditingPlayer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (playerId: number) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/players/${playerId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingPlayer),
        },
      );
      if (!res.ok) throw new Error("Erreur lors de la mise à jour");

      // Re-fetch joueurs pour mise à jour auto
      const resPlayers = await fetch(
        `${import.meta.env.VITE_API_URL}/api/teams/${teamId}/players`,
      );
      const data = await resPlayers.json();
      setPlayers(data || []);

      handleCancel();
    } catch (err) {
      console.error(err);
      alert("Impossible de modifier le joueur");
    }
  };

  // Gestion suppression
  const handleDelete = async (playerId: number) => {
    if (!confirm("Voulez-vous vraiment supprimer ce joueur ?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/players/${playerId}`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) throw new Error("Erreur lors de la suppression");

      // Re-fetch joueurs pour mise à jour auto
      const resPlayers = await fetch(
        `${import.meta.env.VITE_API_URL}/api/teams/${teamId}/players`,
      );
      const data = await resPlayers.json();
      setPlayers(data || []);
    } catch (err) {
      console.error(err);
      alert("Impossible de supprimer le joueur");
    }
  };

  // Gestion ajout
  const handleNewChange = (field: keyof Player, value: string | number) => {
    setNewPlayer((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = async () => {
    if (!teamId) return;

    const payload = { ...newPlayer, team_id: Number(teamId) };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/players`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Erreur lors de l'ajout du joueur");

      // Re-fetch joueurs pour mise à jour auto
      const resPlayers = await fetch(
        `${import.meta.env.VITE_API_URL}/api/teams/${teamId}/players`,
      );
      const data = await resPlayers.json();
      setPlayers(data || []);

      handleCancel();
    } catch (err) {
      console.error(err);
      alert("Impossible d'ajouter le joueur");
    }
  };

  if (loading) return <div className="loading-container">Chargement...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!team) return <div className="error-message">Équipe introuvable</div>;

  return (
    <div className="team-details-container">
      <Link to="/" className="back-link">
        ← Retour
      </Link>

      <div className="team-header">
        <h1>{team.name}</h1>
        <p>
          {team.city} - {team.stadium}
        </p>
      </div>

      <h2>Effectif</h2>

      <table className="players-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Poste</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>
                {editingId === player.id ? (
                  <input
                    type="number"
                    value={editingPlayer.number || ""}
                    onChange={(e) =>
                      handleChange("number", Number(e.target.value))
                    }
                  />
                ) : (
                  player.number
                )}
              </td>
              <td>
                {editingId === player.id ? (
                  <input
                    type="text"
                    value={editingPlayer.firstname || ""}
                    onChange={(e) => handleChange("firstname", e.target.value)}
                  />
                ) : (
                  player.firstname
                )}
              </td>
              <td>
                {editingId === player.id ? (
                  <input
                    type="text"
                    value={editingPlayer.lastname || ""}
                    onChange={(e) => handleChange("lastname", e.target.value)}
                  />
                ) : (
                  player.lastname
                )}
              </td>
              <td>
                {editingId === player.id ? (
                  <input
                    type="text"
                    value={editingPlayer.position || ""}
                    onChange={(e) => handleChange("position", e.target.value)}
                  />
                ) : (
                  player.position
                )}
              </td>
              <td>
                {editingId === player.id ? (
                  <>
                    <ActionButton
                      label="Enregistrer"
                      variant="success"
                      onClick={() => handleSave(player.id)}
                    />
                    <ActionButton
                      label="Annuler"
                      variant="primary"
                      onClick={handleCancel}
                    />
                  </>
                ) : (
                  <>
                    <ActionButton
                      label="Modifier"
                      variant="warning"
                      onClick={() => handleEdit(player)}
                    />
                    <ActionButton
                      label="Supprimer"
                      variant="danger"
                      onClick={() => handleDelete(player.id)}
                    />
                  </>
                )}
              </td>
            </tr>
          ))}

          {/* Ligne ajout joueur */}
          {adding && (
            <tr className="adding-row">
              <td>
                <input
                  type="number"
                  placeholder="Numéro"
                  value={newPlayer.number || ""}
                  onChange={(e) =>
                    handleNewChange("number", Number(e.target.value))
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Prénom"
                  value={newPlayer.firstname || ""}
                  onChange={(e) => handleNewChange("firstname", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Nom"
                  value={newPlayer.lastname || ""}
                  onChange={(e) => handleNewChange("lastname", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Poste"
                  value={newPlayer.position || ""}
                  onChange={(e) => handleNewChange("position", e.target.value)}
                />
              </td>
              <td>
                <ActionButton
                  label="Enregistrer"
                  variant="success"
                  onClick={handleAdd}
                />
                <ActionButton
                  label="Annuler"
                  variant="primary"
                  onClick={handleCancel}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {!adding && (
        <ActionButton
          label="+ Ajouter un joueur"
          variant="success"
          onClick={() => setAdding(true)}
        />
      )}
    </div>
  );
}

export default TeamDetails;
