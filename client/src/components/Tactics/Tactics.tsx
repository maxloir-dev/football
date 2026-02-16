import { useCallback, useEffect, useState } from "react";
import "./Tactics.css";

interface Player {
  id: number;
  firstname: string;
  lastname: string;
  position: string;
  number: number;
}

interface TacticsProps {
  players: Player[];
}

type Formation = "4-4-2" | "4-3-3" | "3-5-2" | "4-5-1";
type LinePosition = "goalkeeper" | "defenders" | "midfielders" | "attackers";

interface FormationConfig {
  defenders: number;
  midfielders: number;
  attackers: number;
}

const formations: Record<Formation, FormationConfig> = {
  "4-4-2": { defenders: 4, midfielders: 4, attackers: 2 },
  "4-3-3": { defenders: 4, midfielders: 3, attackers: 3 },
  "3-5-2": { defenders: 3, midfielders: 5, attackers: 2 },
  "4-5-1": { defenders: 4, midfielders: 5, attackers: 1 },
};

function Tactics({ players }: TacticsProps) {
  const [formation, setFormation] = useState<Formation>("4-4-2");
  const [editMode, setEditMode] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState<{
    goalkeeper: Player | null;
    defenders: Player[];
    midfielders: Player[];
    attackers: Player[];
  }>({
    goalkeeper: null,
    defenders: [],
    midfielders: [],
    attackers: [],
  });

  const [replacementModal, setReplacementModal] = useState<{
    isOpen: boolean;
    position: LinePosition | null;
    index: number | null;
  }>({
    isOpen: false,
    position: null,
    index: null,
  });

  // Memorize lineup initialization
  const initializeLineup = useCallback(
    (currentFormation: Formation) => {
      const config = formations[currentFormation];
      const gk = players.find((p) => p.position === "Gardien") || null;
      const def = players
        .filter((p) => p.position === "Défenseur")
        .slice(0, config.defenders);
      const mid = players
        .filter((p) => p.position === "Milieu")
        .slice(0, config.midfielders);
      const att = players
        .filter((p) => p.position === "Attaquant")
        .slice(0, config.attackers);

      setSelectedPlayers({
        goalkeeper: gk,
        defenders: def,
        midfielders: mid,
        attackers: att,
      });
    },
    [players],
  );

  useEffect(() => {
    if (players.length > 0) {
      initializeLineup(formation);
    }
  }, [players, formation, initializeLineup]);

  const handleFormationChange = (newFormation: Formation) => {
    setFormation(newFormation);
    initializeLineup(newFormation);
  };

  const openReplacementModal = (position: LinePosition, index = 0) => {
    if (!editMode) return;
    setReplacementModal({ isOpen: true, position, index });
  };

  const replacePlayer = (newPlayer: Player) => {
    if (!replacementModal.position) return;
    const position = replacementModal.position;
    const index = replacementModal.index ?? 0;

    setSelectedPlayers((prev) => {
      if (position === "goalkeeper") {
        return { ...prev, goalkeeper: newPlayer };
      }
      const newLine = [...prev[position]];
      newLine[index] = newPlayer;
      return { ...prev, [position]: newLine };
    });

    closeReplacementModal();
  };

  const closeReplacementModal = () => {
    setReplacementModal({ isOpen: false, position: null, index: null });
  };

  const getAvailablePlayers = (): Player[] => {
    if (!replacementModal.position) return [];

    const positionMap: Record<LinePosition, string> = {
      goalkeeper: "Gardien",
      defenders: "Défenseur",
      midfielders: "Milieu",
      attackers: "Attaquant",
    };

    const requiredPosition = positionMap[replacementModal.position];
    return players.filter((p) => p.position === requiredPosition);
  };

  // Player card accessible
  const PlayerCard = ({
    player,
    onClick,
  }: {
    player: Player;
    onClick?: () => void;
  }) => (
    <button
      type="button"
      className={`player-card ${editMode ? "editable" : ""}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="player-number">{player.number}</div>
      <div className="player-name">
        {player.firstname.charAt(0)}. {player.lastname}
      </div>
    </button>
  );

  return (
    <div className="tactics-container">
      <div className="tactics-header">
        <h2 className="tactics-title">Composition ({formation})</h2>
        <div className="tactics-controls">
          <select
            className="formation-select"
            value={formation}
            onChange={(e) => handleFormationChange(e.target.value as Formation)}
            disabled={editMode}
          >
            <option value="4-4-2">4-4-2</option>
            <option value="4-3-3">4-3-3</option>
            <option value="3-5-2">3-5-2</option>
            <option value="4-5-1">4-5-1</option>
          </select>

          <button
            type="button"
            className={`edit-button ${editMode ? "active" : ""}`}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "✓ Valider" : " Modifier"}
          </button>
        </div>
      </div>

      {editMode && (
        <div className="edit-notice">
          Cliquez sur un joueur pour le remplacer
        </div>
      )}

      <div className="field">
        <div className="line line-attackers">
          {selectedPlayers.attackers.map((player, index) => (
            <PlayerCard
              key={`att-${player.id}`}
              player={player}
              onClick={() => openReplacementModal("attackers", index)}
            />
          ))}
        </div>

        <div className="line line-midfielders">
          {selectedPlayers.midfielders.map((player, index) => (
            <PlayerCard
              key={`mid-${player.id}`}
              player={player}
              onClick={() => openReplacementModal("midfielders", index)}
            />
          ))}
        </div>

        <div className="line line-defenders">
          {selectedPlayers.defenders.map((player, index) => (
            <PlayerCard
              key={`def-${player.id}`}
              player={player}
              onClick={() => openReplacementModal("defenders", index)}
            />
          ))}
        </div>

        <div className="line line-goalkeeper">
          {selectedPlayers.goalkeeper && (
            <PlayerCard
              player={selectedPlayers.goalkeeper}
              onClick={() => openReplacementModal("goalkeeper")}
            />
          )}
        </div>
      </div>

      {replacementModal.isOpen && (
        <div className="modal-overlay" onClick={closeReplacementModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Choisir un remplaçant</h3>
              <button className="modal-close" onClick={closeReplacementModal}>
                ×
              </button>
            </div>

            <div className="modal-body">
              {getAvailablePlayers().map((player) => (
                <div
                  key={player.id}
                  className="replacement-option"
                  onClick={() => replacePlayer(player)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      replacePlayer(player);
                    }
                  }}
                >
                  <span className="replacement-number">{player.number}</span>
                  <span className="replacement-name">
                    {player.firstname} {player.lastname}
                  </span>
                  <span className="replacement-position">
                    {player.position}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tactics;
