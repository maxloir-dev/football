-- Supprimer les tables si elles existent (pour pouvoir réinitialiser)
DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS leagues;

-- Table des ligues
CREATE TABLE leagues (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  level INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des équipes
CREATE TABLE teams (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  city VARCHAR(100),
  stadium VARCHAR(100),
  league_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (league_id) REFERENCES leagues(id) ON DELETE CASCADE
);

-- Table des joueurs
CREATE TABLE players (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  position VARCHAR(50),
  number INT,
  team_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Table des matchs
CREATE TABLE matches (
  id INT PRIMARY KEY AUTO_INCREMENT,
  home_team_id INT NOT NULL,
  away_team_id INT NOT NULL,
  home_score INT DEFAULT 0,
  away_score INT DEFAULT 0,
  match_date DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (home_team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (away_team_id) REFERENCES teams(id) ON DELETE CASCADE,
  CHECK (home_team_id != away_team_id)
);

-- Index pour améliorer les performances
CREATE INDEX idx_teams_league ON teams(league_id);
CREATE INDEX idx_players_team ON players(team_id);
CREATE INDEX idx_matches_home_team ON matches(home_team_id);
CREATE INDEX idx_matches_away_team ON matches(away_team_id);
CREATE INDEX idx_matches_date ON matches(match_date);